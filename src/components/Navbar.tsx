import { Volume2, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import telefonicaLogo from '../assets/b35e861fd1f400987d871965724f2141f95ebe60.png';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'es' | 'en';

  const changeLanguage = (lng: 'es' | 'en') => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-lg" style={{ background: 'linear-gradient(to right, #06f, #031A34)' }}>
      <div className="container mx-auto px-2 py-2 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Telefónica Logo - enlace a página principal */}
          <Link to="/" aria-label="Ir a la página principal">
            <img 
              src={telefonicaLogo} 
              alt="Telefónica" 
              style={{ height: '40px', margin: '20px',marginLeft: '0px', width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1.5">
            <button
              onClick={() => changeLanguage('es')}
              className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${
                currentLanguage === 'es'
                  ? 'bg-[#0066FF] text-white shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Español"
            >
              <span className="text-lg" role="img" aria-hidden="true">🇪🇸</span>
              <span className="text-xs hidden sm:inline">ES</span>
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${
                currentLanguage === 'en'
                  ? 'bg-[#0066FF] text-white shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              aria-label="English"
            >
              <span className="text-lg" role="img" aria-hidden="true">🇬🇧</span>
              <span className="text-xs hidden sm:inline">EN</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}