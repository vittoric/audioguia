import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DemosPage } from './components/DemosPage';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { AccessibilityPanelWrapper } from './components/AccessibilityPanelWrapper';

export default function App() {
  return (
    <AccessibilityProvider>
      <AudioPlayerProvider>
        <Router>
          <div className="min-h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/demos" element={<DemosPage />} />
            </Routes>
            <AccessibilityPanelWrapper />
          </div>
        </Router>
      </AudioPlayerProvider>
    </AccessibilityProvider>
  );
}
