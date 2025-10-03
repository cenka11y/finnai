import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import './styles/main.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'courses':
        return <CoursesPage />;
      case 'cv':
        return (
          <div className="main-content">
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
              <h2>CV Oluşturucu</h2>
              <p style={{ color: '#4a5568', marginBottom: '2rem' }}>
                Profesyonel CV oluşturma aracı yakında hizmette olacak
              </p>
              <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}>
                Anasayfaya Dön
              </a>
            </div>
          </div>
        );
      case 'services':
        return (
          <div className="main-content">
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏢</div>
              <h2>Belediye Hizmetleri</h2>
              <p style={{ color: '#4a5568', marginBottom: '2rem' }}>
                Finlandiya belediye hizmetleri rehberi yakında kullanıma sunulacak
              </p>
              <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}>
                Anasayfaya Dön
              </a>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="main-content">
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h2>Kullanıcı Profili</h2>
              <p style={{ color: '#4a5568', marginBottom: '2rem' }}>
                Profil yönetimi ve ayarlar yakında eklenecek
              </p>
              <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}>
                Anasayfaya Dön
              </a>
            </div>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} onNavigate={handleNavigation} />
      {renderCurrentPage()}
      
      {/* Footer */}
      <footer style={{ 
        background: '#2d3748', 
        color: 'white', 
        textAlign: 'center', 
        padding: '2rem 1rem',
        marginTop: '2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong>SUOAI</strong> - Online Eğitim ve Kariyer Platformu
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
            Suomen kielen öğrenme ve kariyer geliştirme platformunuz
          </div>
          <div style={{ fontSize: '0.8rem', marginTop: '1rem', opacity: 0.6 }}>
            © 2025 SUOAI - Tüm hakları saklıdır
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;