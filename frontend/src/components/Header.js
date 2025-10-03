import React from 'react';

const Header = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Anasayfa', icon: '🏠' },
    { id: 'courses', label: 'Kurslar', icon: '📚' },
    { id: 'cv', label: 'CV Oluştur', icon: '📄' },
    { id: 'services', label: 'Hizmetler', icon: '🏢' },
    { id: 'profile', label: 'Profil', icon: '👥' }
  ];

  return (
    <header className="header">
      <div className="header-content">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          <span>🎓</span>
          <span>SOUAI</span>
        </a>
        
        <nav className="nav">
          {navItems.map(item => (
            <a
              key={item.id}
              href="#"
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;