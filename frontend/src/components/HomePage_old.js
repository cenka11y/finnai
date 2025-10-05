import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';
import { useTranslation } from '../i18n/useTranslation';

const HomePage = () => {
  const [backendStatus, setBackendStatus] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Backend durumunu kontrol et
      const [healthData, statusData, profileData] = await Promise.all([
        ApiService.getHealth(),
        ApiService.getStatus(),
        ApiService.getUserProfile()
      ]);
      
      setBackendStatus({ ...healthData, ...statusData });
      setUserProfile(profileData);
      setError(null);
    } catch (err) {
      setError(t('home.error.backendConnection') + ': ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div>⏳ {t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            🇫🇮 {t('landing.hero.badge')}
          </div>
          <h1>{t('landing.hero.title')}</h1>
          <p>{t('landing.hero.subtitle')}</p>
          <div className="hero-cta">
            <a href="#" className="btn btn-primary">
              🚀 {t('landing.hero.startCourses')}
            </a>
            <a href="#" className="btn btn-secondary">
              📄 {t('landing.hero.createCV')}
            </a>
          </div>
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <div className="error">
          <strong>⚠️ {t('common.error')}:</strong> {error}
          <button 
            onClick={loadData} 
            className="btn btn-secondary"
            style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
          >
            🔄 {t('common.retry')}
          </button>
        </div>
      )}

      <div className="page-section">
        <h2 className="section-title">{t('home.services.title')}</h2>
        <p className="section-subtitle">{t('home.services.subtitle')}</p>
        
        <div className="grid grid-3">
          {/* Language Learning Card */}
          <div className="card">
            <div className="card-icon">🎓</div>
            <h3>{t('pages.courses.title')}</h3>
            <p>{t('pages.courses.description')}</p>
            <a href="#" className="btn btn-primary">{t('pages.courses.start')}</a>
          </div>

          {/* CV Builder Card */}
          <div className="card">
            <div className="card-icon">📄</div>
            <h3>{t('pages.cv.title')}</h3>
            <p>{t('pages.cv.description')}</p>
            <a href="#" className="btn btn-primary">{t('pages.cv.create')}</a>
          </div>

          {/* Services Card */}
          <div className="card">
            <div className="card-icon">🏢</div>
            <h3>{t('pages.services.title')}</h3>
            <p>{t('pages.services.description')}</p>
            <a href="#" className="btn btn-primary">{t('pages.services.explore')}</a>
          </div>
        </div>
      </div>

      {/* Backend Status - Minimal Design */}
      {backendStatus && (
        <div className="page-section">
          <div className="card">
            <h3>{t('home.status.title')}</h3>
            <div className="status-info">
              <span className="status-badge">
                🟢 {backendStatus.message || t('home.status.systemRunning')}
              </span>
              <span className="version-info">
                {t('home.status.version')}: {backendStatus.version}
              </span>
            </div>
          </div>
        </div>
      )}
                <div>📄 {t('home.status.cv')}: {backendStatus.endpoints?.cv?.length || 0} {t('home.status.endpoint')}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile */}
      {userProfile && (
        <div className="card">
          <h3>{t('home.profile.title')}</h3>
          <div className="grid grid-2">
            <div>
              <p><strong>{t('home.profile.firstName')} {t('home.profile.lastName')}:</strong> {userProfile.profile?.firstName} {userProfile.profile?.lastName}</p>
              <p><strong>{t('home.profile.email')}:</strong> {userProfile.email}</p>
              <p><strong>{t('home.profile.city')}:</strong> {userProfile.profile?.city}</p>
            </div>
            <div>
              <p><strong>{t('home.profile.languageLevel')}:</strong> {userProfile.profile?.currentCEFRLevel}</p>
              <p><strong>{t('home.profile.preferredLanguage')}:</strong> {userProfile.profile?.preferredLanguage}</p>
              <p><strong>{t('home.profile.status')}:</strong> <span className="status-badge status-active">{t('home.profile.active')}</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-3">
        <div className="card">
          <h3>{t('home.quickActions.learn.title')}</h3>
          <p>{t('home.quickActions.learn.description')}</p>
          <a href="#" className="btn btn-primary">{t('home.quickActions.learn.action')}</a>
        </div>
        
        <div className="card">
          <h3>{t('home.quickActions.cv.title')}</h3>
          <p>{t('home.quickActions.cv.description')}</p>
          <a href="#" className="btn btn-primary">{t('home.quickActions.cv.action')}</a>
        </div>
        
        <div className="card">
          <h3>{t('home.quickActions.services.title')}</h3>
          <p>{t('home.quickActions.services.description')}</p>
          <a href="#" className="btn btn-primary">{t('home.quickActions.services.action')}</a>
        </div>
      </div>

      {/* Statistics */}
      <div className="card">
        <h3>{t('home.statistics.title')}</h3>
        <div className="grid grid-3">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>150+</div>
            <div style={{ color: '#4a5568' }}>{t('home.statistics.lessons')}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#764ba2' }}>500+</div>
            <div style={{ color: '#4a5568' }}>{t('home.statistics.users')}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f093fb' }}>50+</div>
            <div style={{ color: '#4a5568' }}>{t('home.statistics.services')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;