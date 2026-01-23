import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AccessibilitySettings {
  fontSize: number; // Multiplicador de tamaño (1.0 = 100%, 1.5 = 150%, etc.)
  highContrast: boolean;
  reduceMotion: boolean;
  increasedSpacing: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  setFontSize: (size: number) => void;
  setHighContrast: (enabled: boolean) => void;
  setReduceMotion: (enabled: boolean) => void;
  setIncreasedSpacing: (enabled: boolean) => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 1.0,
  highContrast: false,
  reduceMotion: false,
  increasedSpacing: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Cargar desde localStorage si existe y está disponible
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = localStorage.getItem('accessibility-settings');
        if (saved) {
          return { ...defaultSettings, ...JSON.parse(saved) };
        }
      } catch (error) {
        console.warn('Error loading accessibility settings from localStorage:', error);
      }
    }
    return defaultSettings;
  });

  // Guardar en localStorage cuando cambien los settings
  useEffect(() => {
    // Solo guardar si localStorage está disponible
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('accessibility-settings', JSON.stringify(settings));
      } catch (error) {
        console.warn('Error saving accessibility settings to localStorage:', error);
      }
    }
    
    // Aplicar estilos al documento
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--font-size-multiplier', settings.fontSize.toString());
      root.style.setProperty('--high-contrast', settings.highContrast ? '1' : '0');
      root.style.setProperty('--reduce-motion', settings.reduceMotion ? '1' : '0');
      root.style.setProperty('--increased-spacing', settings.increasedSpacing ? '1.5' : '1');
      
      console.log('Accessibility settings applied:', {
        fontSize: settings.fontSize,
        highContrast: settings.highContrast,
        reduceMotion: settings.reduceMotion,
        increasedSpacing: settings.increasedSpacing
      });
      
      // Aplicar atributos de datos para CSS
      if (settings.highContrast) {
        root.setAttribute('data-high-contrast', 'true');
      } else {
        root.removeAttribute('data-high-contrast');
      }
      
      if (settings.increasedSpacing) {
        root.setAttribute('data-increased-spacing', 'true');
      } else {
        root.removeAttribute('data-increased-spacing');
      }
      
      // Aplicar clase para reducir animaciones
      if (settings.reduceMotion) {
        root.classList.add('reduce-motion');
      } else {
        root.classList.remove('reduce-motion');
      }
    }
  }, [settings]);

  const setFontSize = (size: number) => {
    setSettings(prev => ({ ...prev, fontSize: Math.max(0.8, Math.min(2.0, size)) }));
  };

  const setHighContrast = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, highContrast: enabled }));
  };

  const setReduceMotion = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, reduceMotion: enabled }));
  };

  const setIncreasedSpacing = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, increasedSpacing: enabled }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        setFontSize,
        setHighContrast,
        setReduceMotion,
        setIncreasedSpacing,
        resetSettings,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
