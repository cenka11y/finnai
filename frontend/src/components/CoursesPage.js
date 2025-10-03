import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const coursesData = await ApiService.getCourses();
      setCourses(Array.isArray(coursesData) ? coursesData : []);
      setError(null);
    } catch (err) {
      setError('Kurslar yüklenirken hata oluştu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCEFRColor = (level) => {
    const colors = {
      'A1': '#48bb78',
      'A2': '#38a169',
      'B1': '#3182ce',
      'B2': '#2c5aa0',
      'C1': '#805ad5',
      'C2': '#553c9a'
    };
    return colors[level] || '#667eea';
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">Kurslar yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#2d3748' }}>
          📚 Suomen Kieli Kursları
        </h1>
        <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>
          Seviyenize uygun kursları seçin ve Suomi öğrenme yolculuğunuza başlayın
        </p>
      </div>

      {error && (
        <div className="error">
          <strong>⚠️ Hata:</strong> {error}
          <button 
            onClick={loadCourses} 
            style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', background: 'none', border: '1px solid currentColor', borderRadius: '4px', cursor: 'pointer' }}
          >
            🔄 Yeniden Dene
          </button>
        </div>
      )}

      {/* CEFR Level Guide */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>🎦 CEFR Seviye Rehberi</h3>
        <div className="grid grid-3">
          <div>
            <h4 style={{ color: getCEFRColor('A1'), marginBottom: '0.5rem' }}>A1-A2: Başlangıç</h4>
            <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>
              Temel kelimeler, basit cümleler ve günlük durumlar
            </p>
          </div>
          <div>
            <h4 style={{ color: getCEFRColor('B1'), marginBottom: '0.5rem' }}>B1-B2: Orta</h4>
            <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>
              İş hayatı, seyahat ve sohbet seviyesi
            </p>
          </div>
          <div>
            <h4 style={{ color: getCEFRColor('C1'), marginBottom: '0.5rem' }}>C1-C2: İleri</h4>
            <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>
              Akademik ve profesyonel düzey
            </p>
          </div>
        </div>
      </div>

      {/* Courses List */}
      {courses.length > 0 ? (
        <div className="grid grid-2">
          {courses.map((course) => (
            <div key={course.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>
                    {course.title?.fi || course.title || 'Kurs Adı'}
                  </h3>
                  <span 
                    className="status-badge"
                    style={{ 
                      background: getCEFRColor(course.cefrLevel) + '20',
                      color: getCEFRColor(course.cefrLevel),
                      fontSize: '0.8rem'
                    }}
                  >
                    {course.cefrLevel} Seviyesi
                  </span>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.875rem', color: '#4a5568' }}>
                  ⏱️ {course.estimatedDuration} saat
                </div>
              </div>
              
              <p style={{ color: '#4a5568', marginBottom: '1rem', fontSize: '0.95rem' }}>
                {course.description?.fi || course.description || 'Kurs açıklaması'}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: '#4a5568' }}>
                  📚 {Math.floor(course.estimatedDuration / 10)} modül
                </div>
                <a href="#" className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                  Kursa Kayıt Ol
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Henüz kurs bulunamadı</h3>
            <p style={{ color: '#4a5568' }}>
              Backend bağlantısı kurulduğunda kurslar burada görünecek
            </p>
          </div>
        )
      )}

      {/* Course Features */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>✨ Kurs Özellikleri</h3>
        <div className="grid grid-2">
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#2d3748' }}>🎧 İnteraktif Dersler</h4>
            <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>
              Dinleme, konuşma, okuma ve yazma becerilerinizi geliştirin
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#2d3748' }}>🏆 Sertifika</h4>
            <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>
              Kurs tamamlayanlara CEFR sertifikası
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#2d3748' }}>📱 Mobil Uyumlu</h4>
            <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>
              Her yerden erişim, offline mod desteği
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#2d3748' }}>📈 İlerleme Takibi</h4>
            <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>
              Detaylı performans analizleri
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;