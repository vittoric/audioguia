import { useState } from 'react';
import { 
  Type, 
  Contrast, 
  Zap, 
  Maximize2, 
  X, 
  RotateCcw,
  Plus,
  Minus
} from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useTranslation } from 'react-i18next';

// Icono de accesibilidad desde el SVG proporcionado
function AccessibilityIcon({ className, style, color = 'currentColor' }: { className?: string; style?: React.CSSProperties; color?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height="24px" 
      viewBox="0 -960 960 960" 
      width="24px" 
      className={className}
      style={style}
      fill={color}
      aria-hidden="true"
    >
      <path d="M480-720q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720ZM360-80v-520H120v-80h720v80H600v520h-80v-240h-80v240h-80Z"/>
    </svg>
  );
}

function AccessibilityPanelContent() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Los hooks deben llamarse siempre en el mismo orden
  const { settings, setFontSize, setHighContrast, setReduceMotion, setIncreasedSpacing, resetSettings } = useAccessibility();
  const { i18n } = useTranslation();
  const lang = (i18n?.language as 'es' | 'en') || 'es';

  console.log('AccessibilityPanelContent rendered, isOpen:', isOpen); // Debug temporal

  const increaseFontSize = () => {
    setFontSize(settings.fontSize + 0.1);
  };

  const decreaseFontSize = () => {
    setFontSize(settings.fontSize - 0.1);
  };

  const resetFontSize = () => {
    setFontSize(1.0);
  };

  return (
    <>
      {/* Botón flotante para abrir el panel */}
      <button
        onClick={() => {
          console.log('Button clicked, current isOpen:', isOpen);
          setIsOpen(!isOpen);
        }}
        style={{ 
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          width: '56px',
          height: '56px',
          backgroundColor: '#031A34',
          color: 'white',
          borderRadius: '50%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#052a50'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#031A34'}
        aria-label={lang === 'es' ? 'Panel de accesibilidad' : 'Accessibility panel'}
        aria-expanded={isOpen}
      >
        <AccessibilityIcon style={{ width: '24px', height: '24px' }} color="white" />
      </button>

      {/* Panel de accesibilidad */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              zIndex: 9998
            }}
            onClick={() => {
              console.log('Overlay clicked, closing panel');
              setIsOpen(false);
            }}
          />

          {/* Panel */}
          <div
            style={{
              position: 'fixed',
              bottom: '96px',
              right: '24px',
              zIndex: 9999,
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: '24px',
              width: '320px',
              maxWidth: 'calc(100vw - 3rem)',
              maxHeight: 'calc(100vh - 12rem)',
              overflowY: 'auto',
              border: '1px solid #e5e7eb'
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-panel-title"
          >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <AccessibilityIcon className="w-5 h-5" color="#0066FF" />
                  <h2 id="accessibility-panel-title" className="text-lg font-semibold text-[#0B2739]">
                    {lang === 'es' ? 'Accesibilidad' : 'Accessibility'}
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={lang === 'es' ? 'Cerrar panel' : 'Close panel'}
                >
                  <X className="w-5 h-5 text-[#58617A]" />
                </button>
              </div>

              {/* Controles */}
              <div className="space-y-4">
                {/* Tamaño de texto */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Type className="w-4 h-4 text-[#0066FF]" />
                    <label className="text-sm font-medium text-[#0B2739]">
                      {lang === 'es' ? 'Tamaño de texto' : 'Text size'}
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decreaseFontSize}
                      className="p-2 bg-[#F7F7FF] hover:bg-[#0066FF]/10 rounded-lg transition-colors 
                               focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      aria-label={lang === 'es' ? 'Disminuir tamaño' : 'Decrease size'}
                    >
                      <Minus className="w-4 h-4 text-[#0066FF]" />
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-sm font-medium text-[#0B2739]">
                        {Math.round(settings.fontSize * 100)}%
                      </span>
                    </div>
                    <button
                      onClick={increaseFontSize}
                      className="p-2 bg-[#F7F7FF] hover:bg-[#0066FF]/10 rounded-lg transition-colors 
                               focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      aria-label={lang === 'es' ? 'Aumentar tamaño' : 'Increase size'}
                    >
                      <Plus className="w-4 h-4 text-[#0066FF]" />
                    </button>
                    <button
                      onClick={resetFontSize}
                      className="px-3 py-2 bg-[#F7F7FF] hover:bg-[#0066FF]/10 rounded-lg transition-colors 
                               text-xs font-medium text-[#0066FF] focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      aria-label={lang === 'es' ? 'Restablecer tamaño' : 'Reset size'}
                    >
                      A=
                    </button>
                  </div>
                </div>

                {/* Alto contraste */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Contrast className="w-4 h-4 text-[#0066FF]" />
                      <label className="text-sm font-medium text-[#0B2739]">
                        {lang === 'es' ? 'Alto contraste' : 'High contrast'}
                      </label>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('High contrast clicked, current:', settings.highContrast);
                        setHighContrast(!settings.highContrast);
                      }}
                      style={{
                        position: 'relative',
                        width: '48px',
                        height: '24px',
                        borderRadius: '9999px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: settings.highContrast ? '#0066FF' : '#d1d5db',
                        transition: 'background-color 0.3s'
                      }}
                      aria-label={
                        lang === 'es' 
                          ? settings.highContrast ? 'Desactivar alto contraste' : 'Activar alto contraste'
                          : settings.highContrast ? 'Disable high contrast' : 'Enable high contrast'
                      }
                    >
                      <span
                        style={{
                          position: 'absolute',
                          top: '2px',
                          left: settings.highContrast ? '26px' : '2px',
                          width: '20px',
                          height: '20px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: 'left 0.3s',
                          pointerEvents: 'none'
                        }}
                      />
                    </button>
                  </div>
                </div>

                {/* Reducir animaciones */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#0066FF]" />
                      <label className="text-sm font-medium text-[#0B2739]">
                        {lang === 'es' ? 'Reducir animaciones' : 'Reduce motion'}
                      </label>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Reduce motion clicked, current:', settings.reduceMotion);
                        setReduceMotion(!settings.reduceMotion);
                      }}
                      style={{
                        position: 'relative',
                        width: '48px',
                        height: '24px',
                        borderRadius: '9999px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: settings.reduceMotion ? '#0066FF' : '#d1d5db',
                        transition: 'background-color 0.3s'
                      }}
                      aria-label={
                        lang === 'es'
                          ? settings.reduceMotion ? 'Activar animaciones' : 'Desactivar animaciones'
                          : settings.reduceMotion ? 'Enable animations' : 'Disable animations'
                      }
                    >
                      <span
                        style={{
                          position: 'absolute',
                          top: '2px',
                          left: settings.reduceMotion ? '26px' : '2px',
                          width: '20px',
                          height: '20px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: 'left 0.3s',
                          pointerEvents: 'none'
                        }}
                      />
                    </button>
                  </div>
                </div>

                {/* Aumentar espaciado */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-4 h-4 text-[#0066FF]" />
                      <label className="text-sm font-medium text-[#0B2739]">
                        {lang === 'es' ? 'Más espaciado' : 'Increased spacing'}
                      </label>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Increased spacing clicked, current:', settings.increasedSpacing);
                        setIncreasedSpacing(!settings.increasedSpacing);
                      }}
                      style={{
                        position: 'relative',
                        width: '48px',
                        height: '24px',
                        borderRadius: '9999px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: settings.increasedSpacing ? '#0066FF' : '#d1d5db',
                        transition: 'background-color 0.3s'
                      }}
                      aria-label={
                        lang === 'es'
                          ? settings.increasedSpacing ? 'Reducir espaciado' : 'Aumentar espaciado'
                          : settings.increasedSpacing ? 'Decrease spacing' : 'Increase spacing'
                      }
                    >
                      <span
                        style={{
                          position: 'absolute',
                          top: '2px',
                          left: settings.increasedSpacing ? '26px' : '2px',
                          width: '20px',
                          height: '20px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: 'left 0.3s',
                          pointerEvents: 'none'
                        }}
                      />
                    </button>
                  </div>
                </div>

                {/* Botón reset */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={resetSettings}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 
                             bg-[#F7F7FF] hover:bg-[#0066FF]/10 text-[#0066FF] rounded-lg 
                             transition-colors text-sm font-medium focus:outline-none 
                             focus:ring-2 focus:ring-[#0066FF]"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {lang === 'es' ? 'Restablecer todo' : 'Reset all'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
}

export function AccessibilityPanel() {
  return <AccessibilityPanelContent />;
}
