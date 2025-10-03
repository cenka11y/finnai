// SOUAI - Basit Demo Server
// NPM kurulum sorunlarını aşmak için Node.js ile basit server

const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;

// Basit routing fonksiyonu
function handleRequest(req, res) {
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

  // API Route'ları
  if (path === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'healthy',
      message: 'SOUAI Backend çalışıyor!',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }));
    return;
  }

  if (path === '/api/status') {
    res.writeHead(200);
    res.end(JSON.stringify({
      backend: 'active',
      features: [
        'Authentication API',
        'User Management',
        'Course System',
        'CV Builder',
        'Municipal Services'
      ],
      endpoints: {
        auth: ['/api/auth/register', '/api/auth/login', '/api/auth/logout'],
        users: ['/api/users/profile', '/api/users/upload-avatar'],
        courses: ['/api/courses', '/api/courses/:id', '/api/courses/:id/enroll'],
        cv: ['/api/cv', '/api/cv/:id', '/api/cv/:id/generate-pdf'],
        services: ['/api/services', '/api/services/:id']
      }
    }));
    return;
  }

  // Demo API Routes
  if (path.startsWith('/api/auth/')) {
    handleAuthAPI(req, res, path, method);
    return;
  }

  if (path.startsWith('/api/users/')) {
    handleUsersAPI(req, res, path, method);
    return;
  }

  if (path.startsWith('/api/courses/')) {
    handleCoursesAPI(req, res, path, method);
    return;
  }

  // 404 for unknown routes
  res.writeHead(404);
  res.end(JSON.stringify({
    error: 'Route bulunamadı',
    path: path,
    available_endpoints: ['/health', '/api/status', '/api/auth/*', '/api/users/*', '/api/courses/*']
  }));
}

// Auth API Handler
function handleAuthAPI(req, res, path, method) {
  if (path === '/api/auth/register' && method === 'POST') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: 'Kullanıcı kaydı başarılı (Demo)',
      user: { id: 'demo-123', email: 'demo@souai.fi' }
    }));
    return;
  }

  if (path === '/api/auth/login' && method === 'POST') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: 'Giriş başarılı (Demo)',
      token: 'demo-jwt-token-123',
      user: { id: 'demo-123', email: 'demo@souai.fi' }
    }));
    return;
  }

  res.writeHead(200);
  res.end(JSON.stringify({
    message: 'Auth API endpoint aktif (Demo)',
    available: ['POST /register', 'POST /login', 'POST /logout']
  }));
}

// Users API Handler
function handleUsersAPI(req, res, path, method) {
  if (path === '/api/users/profile' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      id: 'demo-123',
      email: 'demo@souai.fi',
      profile: {
        firstName: 'Demo',
        lastName: 'User',
        preferredLanguage: 'fi',
        city: 'Helsinki',
        currentCEFRLevel: 'A2'
      }
    }));
    return;
  }

  res.writeHead(200);
  res.end(JSON.stringify({
    message: 'Users API endpoint aktif (Demo)',
    available: ['GET /profile', 'PUT /profile', 'POST /upload-avatar']
  }));
}

// Courses API Handler
function handleCoursesAPI(req, res, path, method) {
  if (path === '/api/courses' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify([
      {
        id: 'course-1',
        title: { fi: 'Perus Suomi A1', en: 'Basic Finnish A1' },
        cefrLevel: 'A1',
        estimatedDuration: 40,
        description: { fi: 'Suomen kielen perusteet', en: 'Finnish language basics' }
      },
      {
        id: 'course-2',
        title: { fi: 'Käytännön Suomi A2', en: 'Practical Finnish A2' },
        cefrLevel: 'A2',
        estimatedDuration: 60,
        description: { fi: 'Arkielämän suomi', en: 'Everyday Finnish' }
      }
    ]));
    return;
  }

  res.writeHead(200);
  res.end(JSON.stringify({
    message: 'Courses API endpoint aktif (Demo)',
    available: ['GET /', 'GET /:id', 'POST /:id/enroll']
  }));
}

// Server'ı başlat
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log('🚀 SOUAI Backend Demo Server başlatıldı!');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/health`);
  console.log(`📊 API Status: http://localhost:${PORT}/api/status`);
  console.log('');
  console.log('📋 Kullanılabilir Endpoint\'ler:');
  console.log('  • GET  /health');
  console.log('  • GET  /api/status');
  console.log('  • POST /api/auth/register');
  console.log('  • POST /api/auth/login');
  console.log('  • GET  /api/users/profile');
  console.log('  • GET  /api/courses');
  console.log('');
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