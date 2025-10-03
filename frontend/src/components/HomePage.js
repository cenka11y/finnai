import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const HomePage = () => {
  const [backendStatus, setBackendStatus] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError('Backend bağlantı hatası: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">Platform verileri yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      {/* Hero Section */}
      <section className="hero">
        <h1>🎓 SUOAI'ye Hoş Geldiniz</h1>
        <p>Suomen kielen öğrenme ve kariyer geliştirme platformunuz</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#" className="btn btn-primary">🚀 Kurslara Başla</a>
          <a href="#" className="btn btn-secondary">📄 CV Oluştur</a>
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <div className="error">
          <strong>⚠️ Hata:</strong> {error}
          <button 
            onClick={loadData} 
            style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', background: 'none', border: '1px solid currentColor', borderRadius: '4px', cursor: 'pointer' }}
          >
            🔄 Yeniden Dene
          </button>
        </div>
      )}

      {/* Backend Status */}
      {backendStatus && (
        <div className="card">
          <h3>📊 Platform Durumu</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span className="status-badge status-active">
              🟢 {backendStatus.message || 'Sistem Çalışıyor'}
            </span>
            <span style={{ fontSize: '0.875rem', color: '#4a5568' }}>
              Versiyon: {backendStatus.version}
            </span>
          </div>
          
          <div className="grid grid-2">
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#2d3748' }}>🎯 Aktif Özellikler</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {backendStatus.features?.map((feature, index) => (
                  <li key={index} style={{ padding: '0.25rem 0', color: '#4a5568' }}>
                    ✅ {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#2d3748' }}>🌐 API Endpoints</h4>
              <div style={{ fontSize: '0.875rem', color: '#4a5568' }}>
                <div>🔐 Auth: {backendStatus.endpoints?.auth?.length || 0} endpoint</div>
                <div>👤 Users: {backendStatus.endpoints?.users?.length || 0} endpoint</div>
                <div>📚 Courses: {backendStatus.endpoints?.courses?.length || 0} endpoint</div>
                <div>📄 CV: {backendStatus.endpoints?.cv?.length || 0} endpoint</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile */}
      {userProfile && (
        <div className="card">
          <h3>👥 Kullanıcı Profili (Demo)</h3>
          <div className="grid grid-2">
            <div>
              <p><strong>Ad Soyad:</strong> {userProfile.profile?.firstName} {userProfile.profile?.lastName}</p>
              <p><strong>E-posta:</strong> {userProfile.email}</p>
              <p><strong>Şehir:</strong> {userProfile.profile?.city}</p>
            </div>
            <div>
              <p><strong>Dil Seviyesi:</strong> {userProfile.profile?.currentCEFRLevel}</p>
              <p><strong>Tercih Edilen Dil:</strong> {userProfile.profile?.preferredLanguage}</p>
              <p><strong>Durum:</strong> <span className="status-badge status-active">Aktif</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-3">
        <div className="card">
          <h3>📚 Dil Öğrenme</h3>
          <p>Seviyenize uygun Suomi kursları ile öğrenme yolculuğunuza başlayın.</p>
          <a href="#" className="btn btn-primary">Kurslara Git</a>
        </div>
        
        <div className="card">
          <h3>📄 CV Oluşturucu</h3>
          <p>Profesyonel CV'nizi Fince ve İngilizce olarak oluşturun.</p>
          <a href="#" className="btn btn-primary">CV Oluştur</a>
        </div>
        
        <div className="card">
          <h3>🏢 Belediye Hizmetleri</h3>
          <p>Finlandiya'daki resmi işlemler ve belediye hizmetleri hakkında bilgi alın.</p>
          <a href="#" className="btn btn-primary">Hizmetleri Gör</a>
        </div>
      </div>

      {/* Statistics */}
      <div className="card">
        <h3>📈 Platform İstatistikleri</h3>
        <div className="grid grid-3">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>150+</div>
            <div style={{ color: '#4a5568' }}>Dil Dersi</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#764ba2' }}>500+</div>
            <div style={{ color: '#4a5568' }}>Aktif Kullanıcı</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f093fb' }}>50+</div>
            <div style={{ color: '#4a5568' }}>Belediye Hizmeti</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;