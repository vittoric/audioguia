import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DemosPage } from './components/DemosPage';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { AccessibilityPanelWrapper } from './components/AccessibilityPanelWrapper';

function AppContent() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Enlace "Saltar al contenido" para teclado y lectores de pantalla */}
      <a
        href="#main-content"
        className="skip-link"
      >
        {t('accessibility.skipToContent')}
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demos" element={<DemosPage />} />
        </Routes>
      </main>
      <AccessibilityPanelWrapper />
    </div>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <AudioPlayerProvider>
        <Router>
          <AppContent />
        </Router>
      </AudioPlayerProvider>
    </AccessibilityProvider>
  );
}
