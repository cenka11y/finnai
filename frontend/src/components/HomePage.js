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
        <h1>{t('landing.hero.title')}</h1>
        <p>{t('landing.hero.subtitle')}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#" className="btn btn-primary">{t('landing.hero.startCourses')}</a>
          <a href="#" className="btn btn-secondary">{t('landing.hero.createCV')}</a>
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <div className="error">
          <strong>⚠️ {t('common.error')}:</strong> {error}
          <button 
            onClick={loadData} 
            style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', background: 'none', border: '1px solid currentColor', borderRadius: '4px', cursor: 'pointer' }}
          >
            🔄 {t('common.retry')}
          </button>
        </div>
      )}

      {/* Backend Status */}
      {backendStatus && (
        <div className="card">
          <h3>{t('home.status.title')}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span className="status-badge status-active">
              🟢 {backendStatus.message || t('home.status.systemRunning')}
            </span>
            <span style={{ fontSize: '0.875rem', color: '#4a5568' }}>
              {t('home.status.version')}: {backendStatus.version}
            </span>
          </div>
          
          <div className="grid grid-2">
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#2d3748' }}>{t('home.status.activeFeatures')}</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {backendStatus.features?.map((feature, index) => (
                  <li key={index} style={{ padding: '0.25rem 0', color: '#4a5568' }}>
                    ✅ {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#2d3748' }}>{t('home.status.apiEndpoints')}</h4>
              <div style={{ fontSize: '0.875rem', color: '#4a5568' }}>
                <div>🔐 {t('home.status.auth')}: {backendStatus.endpoints?.auth?.length || 0} {t('home.status.endpoint')}</div>
                <div>👤 {t('home.status.users')}: {backendStatus.endpoints?.users?.length || 0} {t('home.status.endpoint')}</div>
                <div>📚 {t('home.status.courses')}: {backendStatus.endpoints?.courses?.length || 0} {t('home.status.endpoint')}</div>
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