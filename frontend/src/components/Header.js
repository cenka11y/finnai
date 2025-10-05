import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

const Header = ({ currentPage, onNavigate }) => {
  const { t, changeLanguage, availableLanguages, language } = useTranslation();
  
  const navItems = [
    { id: 'home', label: t('navigation.dashboard') },
    { id: 'courses', label: t('navigation.learn') },
    { id: 'cv', label: t('navigation.cv') },
    { id: 'services', label: t('navigation.services') }
  ];

  return (
    <header className="header">
      <div className="header-content">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          {t('common.appName')}
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
              {item.label}
            </a>
          ))}
        </nav>
        
        {/* Modern Language Selector */}
        <div className="language-selector">
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            aria-label={t('common.selectLanguage')}
          >
            {availableLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;