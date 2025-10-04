import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import { useTranslation } from './i18n/useTranslation';
import './styles/main.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const { t } = useTranslation();

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
              <h2>{t('pages.cv.title')}</h2>
              <p style={{ color: '#4a5568', marginBottom: '2rem' }}>
                {t('pages.cv.description')}
              </p>
              <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}>
                {t('pages.cv.backHome')}
              </a>
            </div>
          </div>
        );
      case 'services':
        return (
          <div className="main-content">
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏢</div>
              <h2>{t('pages.services.title')}</h2>
              <p style={{ color: '#4a5568', marginBottom: '2rem' }}>
                {t('pages.services.description')}
              </p>
              <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}>
                {t('pages.services.backHome')}
              </a>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="main-content">
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h2>{t('pages.profile.title')}</h2>
              <p style={{ color: '#4a5568', marginBottom: '2rem' }}>
                {t('pages.profile.description')}
              </p>
              <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}>
                {t('pages.profile.backHome')}
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
            <strong>{t('footer.title')}</strong>
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
            {t('footer.subtitle')}
          </div>
          <div style={{ fontSize: '0.8rem', marginTop: '1rem', opacity: 0.6 }}>
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;