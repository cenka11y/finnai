// SOUAI Frontend - Basit Static Server
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Static HTML content (Combined React app)
const htmlContent = `
<!DOCTYPE html>
<html lang="fi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SOUAI - Online Eğitim ve Kariyer Platformu</title>
    <style>
        /* Main CSS - Embedded */
        :root {
          --primary-color: #667eea;
          --secondary-color: #764ba2;
          --accent-color: #f093fb;
          --text-dark: #2d3748;
          --text-light: #4a5568;
          --background-light: #f7fafc;
          --white: #ffffff;
          --border-color: #e2e8f0;
          --success-color: #48bb78;
          --warning-color: #ed8936;
          --error-color: #f56565;
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          --border-radius: 8px;
          --border-radius-lg: 12px;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: var(--text-dark);
          background: var(--background-light);
        }

        .app {
          min-height: 100vh;
        }

        /* Header Styles */
        .header {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          padding: 1rem 0;
          box-shadow: var(--shadow-lg);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          text-decoration: none;
          color: white;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius);
          transition: all 0.3s ease;
          font-weight: 500;
          cursor: pointer;
          border: none;
          background: none;
          font-size: 1rem;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .nav-link.active {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Main Content */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        /* Hero Section */
        .hero {
          text-align: center;
          padding: 4rem 0;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          margin: -2rem -1rem 2rem -1rem;
        }

        .hero h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .hero p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        /* Cards */
        .card {
          background: var(--white);
          border-radius: var(--border-radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
          margin-bottom: 1.5rem;
        }

        .card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-2px);
        }

        .card h3 {
          color: var(--text-dark);
          margin-bottom: 1rem;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .card p {
          color: var(--text-light);
          margin-bottom: 1rem;
        }

        /* Grid Layout */
        .grid {
          display: grid;
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .grid-2 {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .grid-3 {
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        /* Buttons */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--border-radius);
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .btn-primary {
          background: var(--primary-color);
          color: white;
        }

        .btn-primary:hover {
          background: var(--secondary-color);
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: var(--white);
          color: var(--primary-color);
          border: 2px solid var(--primary-color);
        }

        .btn-secondary:hover {
          background: var(--primary-color);
          color: white;
        }

        /* Status Badge */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status-active {
          background: rgba(72, 187, 120, 0.1);
          color: var(--success-color);
        }

        /* Loading */
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          color: var(--text-light);
        }

        .error {
          background: rgba(245, 101, 101, 0.1);
          color: var(--error-color);
          padding: 1rem;
          border-radius: var(--border-radius);
          border: 1px solid rgba(245, 101, 101, 0.2);
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
          }
          
          .nav {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .hero h1 {
            font-size: 2rem;
          }
          
          .main-content {
            padding: 1rem;
          }
          
          .grid {
            grid-template-columns: 1fr;
          }
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div id="app">
        <!-- App Content will be loaded here -->
        <div class="loading">🚀 SOUAI Platform yükleniyor...</div>
    </div>

    <script>
        // Simple API Service
        const API_BASE_URL = 'http://localhost:3000';
        
        class ApiService {
          async request(endpoint, options = {}) {
            try {
              const url = API_BASE_URL + endpoint;
              const config = {
                headers: {
                  'Content-Type': 'application/json',
                  ...options.headers
                },
                ...options
              };

              const response = await fetch(url, config);
              
              if (!response.ok) {
                throw new Error('HTTP error! status: ' + response.status);
              }
              
              return await response.json();
            } catch (error) {
              console.error('API request failed:', error);
              throw error;
            }
          }

          async getHealth() {
            return await this.request('/health');
          }

          async getStatus() {
            return await this.request('/api/status');
          }

          async getUserProfile() {
            return await this.request('/api/users/profile');
          }

          async getCourses() {
            return await this.request('/api/courses/');
          }
        }

        const api = new ApiService();

        // Simple App State
        let currentPage = 'home';
        let appData = {
          backendStatus: null,
          userProfile: null,
          courses: [],
          loading: false,
          error: null
        };

        // Render Functions
        function renderHeader() {
          const navItems = [
            { id: 'home', label: 'Anasayfa', icon: '🏠' },
            { id: 'courses', label: 'Kurslar', icon: '📚' },
            { id: 'cv', label: 'CV Oluştur', icon: '📄' },
            { id: 'services', label: 'Hizmetler', icon: '🏢' }
          ];

          return \`
            <header class="header">
              <div class="header-content">
                <a href="#" class="logo" onclick="navigateTo('home')">
                  <span>🎓</span>
                  <span>SOUAI</span>
                </a>
                
                <nav class="nav">
                  \${navItems.map(item => \`
                    <button class="nav-link \${currentPage === item.id ? 'active' : ''}" onclick="navigateTo('\${item.id}')">
                      <span>\${item.icon}</span>
                      <span>\${item.label}</span>
                    </button>
                  \`).join('')}
                </nav>
              </div>
            </header>
          \`;
        }

        function renderHomePage() {
          return \`
            <div class="main-content">
              <section class="hero">
                <h1>🎓 SOUAI'ye Hoş Geldiniz</h1>
                <p>Suomen kilin öğrenme ve kariyer geliştirme platformunuz</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                  <button class="btn btn-primary" onclick="navigateTo('courses')">🚀 Kurslara Başla</button>
                  <button class="btn btn-secondary" onclick="navigateTo('cv')">📄 CV Oluştur</button>
                </div>
              </section>

              \${appData.error ? \`
                <div class="error">
                  <strong>⚠️ Hata:</strong> \${appData.error}
                  <button onclick="loadData()" style="margin-left: 1rem; padding: 0.25rem 0.5rem; background: none; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">
                    🔄 Yeniden Dene
                  </button>
                </div>
              \` : ''}

              \${appData.backendStatus ? \`
                <div class="card">
                  <h3>📊 Platform Durumu</h3>
                  <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <span class="status-badge status-active">
                      🟢 \${appData.backendStatus.message || 'Sistem Çalışıyor'}
                    </span>
                    <span style="font-size: 0.875rem; color: #4a5568;">
                      Versiyon: \${appData.backendStatus.version}
                    </span>
                  </div>
                  
                  <div class="grid grid-2">
                    <div>
                      <h4 style="margin-bottom: 0.5rem; color: #2d3748;">🎯 Aktif Özellikler</h4>
                      <ul style="list-style: none; padding: 0;">
                        \${appData.backendStatus.features?.map(feature => \`
                          <li style="padding: 0.25rem 0; color: #4a5568;">✅ \${feature}</li>
                        \`).join('') || ''}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 style="margin-bottom: 0.5rem; color: #2d3748;">🌐 API Endpoints</h4>
                      <div style="font-size: 0.875rem; color: #4a5568;">
                        <div>🔐 Auth: \${appData.backendStatus.endpoints?.auth?.length || 0} endpoint</div>
                        <div>👤 Users: \${appData.backendStatus.endpoints?.users?.length || 0} endpoint</div>
                        <div>📚 Courses: \${appData.backendStatus.endpoints?.courses?.length || 0} endpoint</div>
                        <div>📄 CV: \${appData.backendStatus.endpoints?.cv?.length || 0} endpoint</div>
                      </div>
                    </div>
                  </div>
                </div>
              \` : ''}

              \${appData.userProfile ? \`
                <div class="card">
                  <h3>👥 Kullanıcı Profili (Demo)</h3>
                  <div class="grid grid-2">
                    <div>
                      <p><strong>Ad Soyad:</strong> \${appData.userProfile.profile?.firstName} \${appData.userProfile.profile?.lastName}</p>
                      <p><strong>E-posta:</strong> \${appData.userProfile.email}</p>
                      <p><strong>Şehir:</strong> \${appData.userProfile.profile?.city}</p>
                    </div>
                    <div>
                      <p><strong>Dil Seviyesi:</strong> \${appData.userProfile.profile?.currentCEFRLevel}</p>
                      <p><strong>Tercih Edilen Dil:</strong> \${appData.userProfile.profile?.preferredLanguage}</p>
                      <p><strong>Durum:</strong> <span class="status-badge status-active">Aktif</span></p>
                    </div>
                  </div>
                </div>
              \` : ''}

              <div class="grid grid-3">
                <div class="card">
                  <h3>📚 Dil Öğrenme</h3>
                  <p>Seviyenize uygun Suomi kursları ile öğrenme yolculuğunuza başlayın.</p>
                  <button class="btn btn-primary" onclick="navigateTo('courses')">Kurslara Git</button>
                </div>
                
                <div class="card">
                  <h3>📄 CV Oluşturucu</h3>
                  <p>Profesyonel CV'nizi Fince ve İngilizce olarak oluşturun.</p>
                  <button class="btn btn-primary" onclick="navigateTo('cv')">CV Oluştur</button>
                </div>
                
                <div class="card">
                  <h3>🏢 Belediye Hizmetleri</h3>
                  <p>Finlandiya'daki resmi işlemler ve belediye hizmetleri hakkında bilgi alın.</p>
                  <button class="btn btn-primary" onclick="navigateTo('services')">Hizmetleri Gör</button>
                </div>
              </div>

              <div class="card">
                <h3>📈 Platform İstatistikleri</h3>
                <div class="grid grid-3">
                  <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: bold; color: #667eea;">150+</div>
                    <div style="color: #4a5568;">Dil Dersi</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: bold; color: #764ba2;">500+</div>
                    <div style="color: #4a5568;">Aktif Kullanıcı</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: bold; color: #f093fb;">50+</div>
                    <div style="color: #4a5568;">Belediye Hizmeti</div>
                  </div>
                </div>
              </div>
            </div>
          \`;
        }

        function renderCoursesPage() {
          return \`
            <div class="main-content">
              <div style="margin-bottom: 2rem;">
                <h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem; color: #2d3748;">
                  📚 Suomen Kieli Kursları
                </h1>
                <p style="color: #4a5568; font-size: 1.1rem;">
                  Seviyenize uygun kursları seçin ve Suomi öğrenme yolculuğunuza başlayın
                </p>
              </div>

              <div class="card">
                <h3>🎦 CEFR Seviye Rehberi</h3>
                <div class="grid grid-3">
                  <div>
                    <h4 style="color: #48bb78; margin-bottom: 0.5rem;">A1-A2: Başlangıç</h4>
                    <p style="font-size: 0.9rem; color: #4a5568;">
                      Temel kelimeler, basit cümleler ve günlük durumlar
                    </p>
                  </div>
                  <div>
                    <h4 style="color: #3182ce; margin-bottom: 0.5rem;">B1-B2: Orta</h4>
                    <p style="font-size: 0.9rem; color: #4a5568;">
                      İş hayatı, seyahat ve sohbet seviyesi
                    </p>
                  </div>
                  <div>
                    <h4 style="color: #805ad5; margin-bottom: 0.5rem;">C1-C2: İleri</h4>
                    <p style="font-size: 0.9rem; color: #4a5568;">
                      Akademik ve profesyonel düzey
                    </p>
                  </div>
                </div>
              </div>

              \${appData.courses.length > 0 ? \`
                <div class="grid grid-2">
                  \${appData.courses.map(course => \`
                    <div class="card">
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                        <div>
                          <h3 style="margin-bottom: 0.25rem;">
                            \${course.title?.fi || course.title || 'Kurs Adı'}
                          </h3>
                          <span class="status-badge" style="background: #48bb7820; color: #48bb78; font-size: 0.8rem;">
                            \${course.cefrLevel} Seviyesi
                          </span>
                        </div>
                        <div style="text-align: right; font-size: 0.875rem; color: #4a5568;">
                          ⏱️ \${course.estimatedDuration} saat
                        </div>
                      </div>
                      
                      <p style="color: #4a5568; margin-bottom: 1rem; font-size: 0.95rem;">
                        \${course.description?.fi || course.description || 'Kurs açıklaması'}
                      </p>
                      
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="font-size: 0.875rem; color: #4a5568;">
                          📚 \${Math.floor(course.estimatedDuration / 10)} modül
                        </div>
                        <button class="btn btn-primary" style="font-size: 0.9rem; padding: 0.5rem 1rem;">
                          Kursa Kayıt Ol
                        </button>
                      </div>
                    </div>
                  \`).join('')}
                </div>
              \` : \`
                <div class="card" style="text-align: center; padding: 3rem;">
                  <div style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
                  <h3 style="margin-bottom: 0.5rem;">Henüz kurs bulunamadı</h3>
                  <p style="color: #4a5568;">
                    Backend bağlantısı kurulduğunda kurslar burada görünecek
                  </p>
                </div>
              \`}

              <div class="card">
                <h3>✨ Kurs Özellikleri</h3>
                <div class="grid grid-2">
                  <div>
                    <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: #2d3748;">🎧 İnteraktif Dersler</h4>
                    <p style="font-size: 0.9rem; color: #4a5568;">
                      Dinleme, konuşma, okuma ve yazma becerilerinizi geliştirin
                    </p>
                  </div>
                  <div>
                    <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: #2d3748;">🏆 Sertifika</h4>
                    <p style="font-size: 0.9rem; color: #4a5568;">
                      Kurs tamamlayanlara CEFR sertifikası
                    </p>
                  </div>
                  <div>
                    <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: #2d3748;">📱 Mobil Uyumlu</h4>
                    <p style="font-size: 0.9rem; color: #4a5568;">
                      Her yerden erişim, offline mod desteği
                    </p>
                  </div>
                  <div>
                    <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: #2d3748;">📈 İlerleme Takibi</h4>
                    <p style="font-size: 0.9rem; color: #4a5568;">
                      Detaylı performans analizleri
                    </p>
                  </div>
                </div>
              </div>
            </div>
          \`;
        }

        function renderGenericPage(title, icon, message) {
          return \`
            <div class="main-content">
              <div class="card" style="text-align: center; padding: 3rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">\${icon}</div>
                <h2>\${title}</h2>
                <p style="color: #4a5568; margin-bottom: 2rem;">\${message}</p>
                <button class="btn btn-primary" onclick="navigateTo('home')">
                  Anasayfaya Dön
                </button>
              </div>
            </div>
          \`;
        }

        function renderFooter() {
          return \`
            <footer style="background: #2d3748; color: white; text-align: center; padding: 2rem 1rem; margin-top: 2rem;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <div style="margin-bottom: 1rem;">
                  <strong>SOUAI</strong> - Online Eğitim ve Kariyer Platformu
                </div>
                <div style="font-size: 0.875rem; opacity: 0.8;">
                  Suomen kilin öğrenme ve kariyer geliştirme platformunuz
                </div>
                <div style="font-size: 0.8rem; margin-top: 1rem; opacity: 0.6;">
                  © 2025 SOUAI - Tüm hakları saklıdır
                </div>
              </div>
            </footer>
          \`;
        }

        // Navigation function
        function navigateTo(page) {
          currentPage = page;
          renderApp();
        }

        // Main render function
        function renderApp() {
          let content = '';
          
          switch (currentPage) {
            case 'home':
              content = renderHomePage();
              break;
            case 'courses':
              content = renderCoursesPage();
              break;
            case 'cv':
              content = renderGenericPage(
                'CV Oluşturucu',
                '📄',
                'Profesyonel CV oluşturma aracı yakında hizmette olacak'
              );
              break;
            case 'services':
              content = renderGenericPage(
                'Belediye Hizmetleri',
                '🏢',
                'Finlandiya belediye hizmetleri rehberi yakında kullanıma sunulacak'
              );
              break;
            default:
              content = renderHomePage();
          }

          document.getElementById('app').innerHTML = \`
            <div class="app">
              \${renderHeader()}
              \${content}
              \${renderFooter()}
            </div>
          \`;
        }

        // Load data from backend
        async function loadData() {
          try {
            appData.loading = true;
            appData.error = null;
            
            const [healthData, statusData, profileData] = await Promise.all([
              api.getHealth().catch(() => null),
              api.getStatus().catch(() => null),
              api.getUserProfile().catch(() => null)
            ]);
            
            if (healthData && statusData) {
              appData.backendStatus = { ...healthData, ...statusData };
            }
            
            if (profileData) {
              appData.userProfile = profileData;
            }

            // Try to load courses
            try {
              const coursesData = await api.getCourses();
              appData.courses = Array.isArray(coursesData) ? coursesData : [];
            } catch (e) {
              appData.courses = [];
            }
            
          } catch (err) {
            appData.error = 'Backend bağlantı hatası: ' + err.message;
            console.error('Data loading failed:', err);
          } finally {
            appData.loading = false;
            renderApp();
          }
        }

        // Initialize app
        document.addEventListener('DOMContentLoaded', () => {
          loadData();
        });

        // Load immediately if DOM is already ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', loadData);
        } else {
          loadData();
        }
    </script>
</body>
</html>
`;

function handleRequest(req, res) {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Serve HTML for all routes (SPA)
  if (pathname === '/' || pathname.endsWith('.html') || !path.extname(pathname)) {
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(htmlContent);
    return;
  }

  // Handle static files
  const filePath = path.join(__dirname, 'public', pathname);
  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.setHeader('Content-Type', contentType);
      res.writeHead(200);
      res.end(content);
    });
  } else {
    // For any unknown route, serve the main HTML (SPA routing)
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(htmlContent);
  }
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log('🎨 SOUAI Frontend Server başlatıldı!');
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
  console.log(`🔗 Backend API: http://localhost:3000`);
  console.log('');
  console.log('📱 Özellikler:');
  console.log('  • ✅ Modern React benzeri UI');
  console.log('  • ✅ Responsive tasarım');
  console.log('  • ✅ Backend API entegrasyonu');
  console.log('  • ✅ SPA routing');
  console.log('  • ✅ Gerçek zamanlı veri');
  console.log('');
  console.log('🎯 Test için: http://localhost:3001');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Frontend server durduruluyor...');
  server.close(() => {
    console.log('✅ Frontend server başarıyla durduruldu');
    process.exit(0);
  });
});