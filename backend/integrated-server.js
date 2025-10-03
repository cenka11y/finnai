// SOUAI - Database Entegre Backend Server
// Gerçek SQLite veritabanı ile çalışan API server

const http = require('http');
const url = require('url');
const crypto = require('crypto');
const bcrypt = require('crypto').createHash; // Basit hash için
const { User, Course, Service, Session } = require('./database');
const { processChatMessage, searchFAQ, FAQ_DATA } = require('./chatbot');
const { detectLanguage, getTranslations, getAllLanguages } = require('./languages');

const PORT = process.env.PORT || 3000;

// Basit JWT benzeri token oluşturma
function generateToken(payload) {
    const data = JSON.stringify(payload);
    const signature = crypto.createHash('sha256').update(data + 'secret-key').digest('hex');
    return Buffer.from(data).toString('base64') + '.' + signature;
}

function verifyToken(token) {
    try {
        const [data, signature] = token.split('.');
        const payload = JSON.parse(Buffer.from(data, 'base64').toString());
        const expectedSignature = crypto.createHash('sha256').update(JSON.stringify(payload) + 'secret-key').digest('hex');
        
        if (signature === expectedSignature) {
            return payload;
        }
        return null;
    } catch {
        return null;
    }
}

// Request body parser
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (err) {
                reject(err);
            }
        });
        req.on('error', reject);
    });
}

// Password hashing (basit versiyon)
function hashPassword(password) {
    return crypto.createHash('sha256').update(password + 'salt').digest('hex');
}

// Ana request handler
async function handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');

    // OPTIONS isteği için
    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    try {
        // Health check
        if (path === '/health') {
            res.writeHead(200);
            res.end(JSON.stringify({
                status: 'healthy',
                message: 'SOUAI Backend Database Integrated!',
                timestamp: new Date().toISOString(),
                version: '2.0.0',
                database: 'SQLite connected'
            }));
            return;
        }

        // API Status
        if (path === '/api/status') {
            const courseCount = (await Course.findAll()).length;
            const serviceCount = (await Service.findAll()).length;
            
            res.writeHead(200);
            res.end(JSON.stringify({
                backend: 'active',
                database: 'connected',
                statistics: {
                    courses: courseCount,
                    services: serviceCount
                },
                features: [
                    'Authentication API ✅',
                    'User Management ✅',
                    'Course System ✅',
                    'CV Builder (Coming Soon)',
                    'Municipal Services ✅',
                    'AI Chatbot ✅'
                ],
                endpoints: {
                    auth: ['/api/auth/register', '/api/auth/login', '/api/auth/logout'],
                    users: ['/api/users/profile', '/api/users/upload-avatar'],
                    courses: ['/api/courses', '/api/courses/:id', '/api/courses/:id/enroll'],
                    cv: ['/api/cv', '/api/cv/:id', '/api/cv/:id/generate-pdf'],
                    services: ['/api/services', '/api/services/:id'],
                    chatbot: ['/api/chatbot/message', '/api/chatbot/faq', '/api/chatbot/actions']
                }
            }));
            return;
        }

        // Auth endpoints
        if (path.startsWith('/api/auth/')) {
            await handleAuthAPI(req, res, path, method);
            return;
        }

        // User endpoints
        if (path.startsWith('/api/users/')) {
            await handleUsersAPI(req, res, path, method);
            return;
        }

        // Course endpoints
        if (path === '/api/courses' || path.startsWith('/api/courses/')) {
            await handleCoursesAPI(req, res, path, method);
            return;
        }

        // Service endpoints
        if (path === '/api/services' || path.startsWith('/api/services/')) {
            await handleServicesAPI(req, res, path, method);
            return;
        }

        // Chatbot endpoints
        if (path === '/api/chatbot' || path.startsWith('/api/chatbot/')) {
            await handleChatbotAPI(req, res, path, method);
            return;
        }

        // 404 for unknown routes
        res.writeHead(404);
        res.end(JSON.stringify({
            error: 'Route bulunamadı',
            path: path,
            available_endpoints: ['/health', '/api/status', '/api/auth/*', '/api/users/*', '/api/courses/*', '/api/services/*', '/api/chatbot/*']
        }));

    } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500);
        res.end(JSON.stringify({
            error: 'Internal server error',
            message: error.message
        }));
    }
}

// Auth API Handler
async function handleAuthAPI(req, res, path, method) {
    if (path === '/api/auth/register' && method === 'POST') {
        const body = await parseBody(req);
        const { email, password, firstName, lastName } = body;

        if (!email || !password) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Email ve şifre gerekli' }));
            return;
        }

        // Kullanıcının zaten var olup olmadığını kontrol et
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            res.writeHead(409);
            res.end(JSON.stringify({ error: 'Bu email adresi zaten kullanılıyor' }));
            return;
        }

        // Yeni kullanıcı oluştur
        const hashedPassword = hashPassword(password);
        const user = await User.create({ email, hashedPassword });
        
        // Kullanıcı profili oluştur
        if (firstName || lastName) {
            await User.createProfile(user.id, { firstName, lastName });
        }

        const token = generateToken({ userId: user.id, email: user.email });

        res.writeHead(201);
        res.end(JSON.stringify({
            success: true,
            message: 'Kullanıcı başarıyla oluşturuldu',
            token: token,
            user: { id: user.id, email: user.email }
        }));
        return;
    }

    if (path === '/api/auth/login' && method === 'POST') {
        const body = await parseBody(req);
        const { email, password } = body;

        if (!email || !password) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Email ve şifre gerekli' }));
            return;
        }

        // Kullanıcıyı bul ve şifreyi kontrol et
        const user = await User.findByEmail(email);
        if (!user || user.hashedPassword !== hashPassword(password)) {
            res.writeHead(401);
            res.end(JSON.stringify({ error: 'Geçersiz email veya şifre' }));
            return;
        }

        const token = generateToken({ userId: user.id, email: user.email });

        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            message: 'Giriş başarılı',
            token: token,
            user: { id: user.id, email: user.email }
        }));
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({
        error: 'Auth endpoint bulunamadı',
        available: ['POST /api/auth/register', 'POST /api/auth/login']
    }));
}

// Users API Handler
async function handleUsersAPI(req, res, path, method) {
    // Authorization kontrolü
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.writeHead(401);
        res.end(JSON.stringify({ error: 'Authorization token gerekli' }));
        return;
    }

    const token = authHeader.substring(7);
    const tokenData = verifyToken(token);
    if (!tokenData) {
        res.writeHead(401);
        res.end(JSON.stringify({ error: 'Geçersiz token' }));
        return;
    }

    if (path === '/api/users/profile' && method === 'GET') {
        const user = await User.findById(tokenData.userId);
        const profile = await User.getProfile(tokenData.userId);

        res.writeHead(200);
        res.end(JSON.stringify({
            id: user.id,
            email: user.email,
            profile: profile || null,
            createdAt: user.createdAt
        }));
        return;
    }

    if (path === '/api/users/profile' && method === 'PUT') {
        const body = await parseBody(req);
        
        let profile = await User.getProfile(tokenData.userId);
        
        if (profile) {
            // Profil güncelle
            profile = await User.updateProfile(tokenData.userId, body);
        } else {
            // Yeni profil oluştur
            profile = await User.createProfile(tokenData.userId, body);
        }

        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            message: 'Profil güncellendi',
            profile: profile
        }));
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({
        error: 'Users endpoint bulunamadı',
        available: ['GET /api/users/profile', 'PUT /api/users/profile']
    }));
}

// Courses API Handler
async function handleCoursesAPI(req, res, path, method) {
    if (path === '/api/courses' && method === 'GET') {
        const courses = await Course.findAll();
        res.writeHead(200);
        res.end(JSON.stringify(courses));
        return;
    }

    if (path.match(/^\/api\/courses\/[^\/]+$/) && method === 'GET') {
        const courseId = path.split('/')[3];
        const course = await Course.findById(courseId);
        
        if (!course) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Kurs bulunamadı' }));
            return;
        }

        res.writeHead(200);
        res.end(JSON.stringify(course));
        return;
    }

    if (path.match(/^\/api\/courses\/[^\/]+\/enroll$/) && method === 'POST') {
        // Authorization kontrolü
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.writeHead(401);
            res.end(JSON.stringify({ error: 'Authorization token gerekli' }));
            return;
        }

        const token = authHeader.substring(7);
        const tokenData = verifyToken(token);
        if (!tokenData) {
            res.writeHead(401);
            res.end(JSON.stringify({ error: 'Geçersiz token' }));
            return;
        }

        const courseId = path.split('/')[3];
        
        try {
            const enrollment = await Course.enroll(tokenData.userId, courseId);
            res.writeHead(201);
            res.end(JSON.stringify({
                success: true,
                message: 'Kursa başarıyla kaydolundu',
                enrollment: enrollment
            }));
        } catch (error) {
            res.writeHead(409);
            res.end(JSON.stringify({ error: error.message }));
        }
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({
        error: 'Courses endpoint bulunamadı',
        available: ['GET /api/courses', 'GET /api/courses/:id', 'POST /api/courses/:id/enroll']
    }));
}

// Services API Handler
async function handleServicesAPI(req, res, path, method) {
    if (path === '/api/services' && method === 'GET') {
        const query = url.parse(req.url, true).query;
        const services = await Service.findAll({
            city: query.city,
            category: query.category
        });
        
        res.writeHead(200);
        res.end(JSON.stringify(services));
        return;
    }

    if (path.match(/^\/api\/services\/[^\/]+$/) && method === 'GET') {
        const serviceId = path.split('/')[3];
        const service = await Service.findById(serviceId);
        
        if (!service) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Servis bulunamadı' }));
            return;
        }

        res.writeHead(200);
        res.end(JSON.stringify(service));
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({
        error: 'Services endpoint bulunamadı',
        available: ['GET /api/services', 'GET /api/services/:id']
    }));
}

// Chatbot API Handler - Multilingual Support
async function handleChatbotAPI(req, res, path, method) {
    if (path === '/api/chatbot/message' && method === 'POST') {
        const body = await parseBody(req);
        const { message, sessionId, language } = body;

        if (!message || !message.trim()) {
            const lang = language || detectLanguage(req);
            const translations = getTranslations(lang);
            res.writeHead(400);
            res.end(JSON.stringify({ error: translations.errorGeneral || 'Message cannot be empty' }));
            return;
        }

        // Dil tespiti 
        const detectedLang = language || detectLanguage(req);
        
        // Authorization kontrolü (opsiyonel - giriş yapmamış kullanıcılar da chatbot kullanabilir)
        let userId = null;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const tokenData = verifyToken(token);
            if (tokenData) {
                userId = tokenData.userId;
            }
        }

        const chatResponse = await processChatMessage(message, detectedLang, userId);

        res.writeHead(200);
        res.end(JSON.stringify(chatResponse));
        return;
    }

    if (path === '/api/chatbot/faq' && method === 'GET') {
        const query = url.parse(req.url, true).query;
        const language = query.lang || detectLanguage(req);
        const translations = getTranslations(language);
        
        // FAQ'ları dile göre filtrele
        const languageSpecificFAQs = [
            {
                question: language === 'fi' ? "Mikä on SOUAI-alusta?" : 
                         language === 'tr' ? "SOUAI platformu nedir?" :
                         language === 'ar' ? "ما هي منصة SOUAI؟" :
                         "What is SOUAI platform?",
                answer: language === 'fi' ? "SOUAI on kattava digitaalinen alusta Suomessa asuville maahanmuuttajille." :
                       language === 'tr' ? "SOUAI, Finlandiya'da yaşayan göçmenler için kapsamlı bir dijital platform." :
                       language === 'ar' ? "SOUAI منصة رقمية شاملة للمهاجرين المقيمين في فنلندا." :
                       "SOUAI is a comprehensive digital platform for immigrants living in Finland."
            },
            {
                question: language === 'fi' ? "Ovatko kurssit ilmaisia?" :
                         language === 'tr' ? "Kurslar ücretsiz mi?" :
                         language === 'ar' ? "هل الدورات مجانية؟" :
                         "Are courses free?",
                answer: language === 'fi' ? "Kyllä! Kaikki suomen kielen kurssimme ovat ilmaisia EU/ETA-kansalaisille." :
                       language === 'tr' ? "Evet! Tüm Fince dil kurslarımız AB/AEA vatandaşları için ücretsizdir." :
                       language === 'ar' ? "نعم! جميع دورات اللغة الفنلندية مجانية لمواطني الاتحاد الأوروبي." :
                       "Yes! All our Finnish language courses are free for EU/EEA citizens."
            }
        ];
        
        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            language: language,
            faqs: languageSpecificFAQs,
            totalCount: languageSpecificFAQs.length
        }));
        return;
    }

    if (path === '/api/chatbot/search' && method === 'GET') {
        const query = url.parse(req.url, true).query;
        const searchQuery = query.q || '';
        const language = query.lang || detectLanguage(req);
        const translations = getTranslations(language);
        
        if (!searchQuery.trim()) {
            res.writeHead(400);
            res.end(JSON.stringify({ 
                error: language === 'fi' ? 'Hakukysely vaaditaan' :
                      language === 'tr' ? 'Arama sorgusu gerekli' :
                      language === 'ar' ? 'مطلوب استعلام البحث' :
                      'Search query required'
            }));
            return;
        }

        // Dil bazlı arama yapılabilir
        const results = []; // Burada dil bazlı arama sonuçları olacak
        
        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            language: language,
            query: searchQuery,
            results: results,
            count: results.length
        }));
        return;
    }

    if (path === '/api/chatbot/languages' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            availableLanguages: getAllLanguages(),
            default: 'en',
            supported: ['fi', 'en', 'tr', 'ar']
        }));
        return;
    }

    if (path === '/api/chatbot/status' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            chatbot: 'active',
            features: [
                'Multilingual Support (fi, en, tr, ar)',
                'Finland Immigration Assistance',
                'Intent Recognition',
                'Personalized Responses',
                'FAQ Search',
                'Course Recommendations',
                'Service Information'
            ],
            supportedLanguages: getAllLanguages(),
            defaultLanguage: 'en',
            availableIntents: [
                'greeting',
                'course', 
                'work',
                'services',
                'housing',
                'health',
                'general'
            ]
        }));
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({
        error: 'Chatbot endpoint not found',
        available: [
            'POST /api/chatbot/message',
            'GET /api/chatbot/faq',
            'GET /api/chatbot/search?q=query&lang=xx',
            'GET /api/chatbot/languages',
            'GET /api/chatbot/status'
        ]
    }));
}

// Server'ı başlat
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log('🚀 SOUAI Database-Integrated Backend başlatıldı!');
    console.log(`📡 Server: http://localhost:${PORT}`);
    console.log(`🔍 Health Check: http://localhost:${PORT}/health`);
    console.log(`📊 API Status: http://localhost:${PORT}/api/status`);
    console.log('');
    console.log('📋 Kullanılabilir Endpoint\'ler:');
    console.log('  🏥 GET  /health');
    console.log('  📊 GET  /api/status');
    console.log('  🔐 POST /api/auth/register');
    console.log('  🔐 POST /api/auth/login');
    console.log('  👤 GET  /api/users/profile (Auth required)');
    console.log('  👤 PUT  /api/users/profile (Auth required)');
    console.log('  📚 GET  /api/courses');
    console.log('  📚 GET  /api/courses/:id');
    console.log('  📚 POST /api/courses/:id/enroll (Auth required)');
    console.log('  🏢 GET  /api/services');
    console.log('  🏢 GET  /api/services/:id');
    console.log('  🤖 POST /api/chatbot/message');
    console.log('  🤖 GET  /api/chatbot/faq');
    console.log('  🤖 GET  /api/chatbot/status');
    console.log('');
    console.log('🗄️  Database: SQLite (dev.db)');
    console.log('💡 Test için: curl http://localhost:3000/health');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Server durduruluyor...');
    server.close(() => {
        console.log('✅ Server başarıyla durduruldu');
        process.exit(0);
    });
});