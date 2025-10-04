import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

const Header = ({ currentPage, onNavigate }) => {
  const { t, changeLanguage, availableLanguages, language } = useTranslation();
  
  const navItems = [
    { id: 'home', label: t('navigation.dashboard'), icon: '🏠' },
    { id: 'courses', label: t('navigation.learn'), icon: '📚' },
    { id: 'cv', label: t('navigation.cv'), icon: '📄' },
    { id: 'services', label: t('navigation.services'), icon: '🏢' },
    { id: 'profile', label: t('navigation.profile'), icon: '👥' }
  ];

  return (
    <header className="header">
      <div className="header-content">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          <span>🎓</span>
          <span>{t('common.appName')}</span>
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
          
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="language-selector"
            style={{
              background: '#4a5568',
              color: 'white',
              border: '1px solid #4299e1',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              marginLeft: '1rem'
            }}
          >
            {availableLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </nav>
      </div>
    </header>
  );
};

export default Header;