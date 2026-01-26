import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      // Landing Page
      landing: {
        title: 'Bienvenidos al stand de Telefónica MWC 2026',
        description:
          'Aquí te ayudaremos a descubrir las principales novedades que presentamos este año. Podrás elegir el idioma de la narración y transcripción en la parte superior.',
        cta: '¡Empezamos!',
      },
      // Demos Page
      demos: {
        back: 'Volver',
        pageTitle: 'Audioguía Interactiva',
        pageSubtitle:
          'Selecciona cualquier sección para escuchar la audioguía correspondiente',
        footerInfo: 'Toca cualquier tarjeta para reproducir el audio',
        cards: {
          intro: {
            title: 'Intro',
            subtitle: 'El MWC para Telefónica',
          },
          demo1: {
            title: 'Demo 1',
            subtitle: 'Descubre el futuro de las comunicaciones críticas',
          },
          demo2: {
            title: 'Demo 2',
            subtitle: 'Descubre el futuro de las comunicaciones críticas',
          },
          demo3: {
            title: 'Demo 3',
            subtitle: 'Descubre el futuro de las comunicaciones críticas',
          },
        },
      },
      // Audio Card
      audio: {
        play: 'Reproducir audio',
        pause: 'Pausar audio',
        progressLabel: 'Posición de reproducción',
      },
      // Accesibilidad
      accessibility: {
        skipToContent: 'Saltar al contenido',
      },
    },
  },
  en: {
    translation: {
      // Navbar
      navbar: {
        mwc: 'MWC 2026',
      },
      // Landing Page
      landing: {
        title: 'Welcome to the Telefónica stand at MWC 2026',
        description:
          'Here we will help you discover the main innovations we are presenting this year. You can choose the language for narration and transcription at the top.',
        cta: "Let's get started!",
      },
      // Demos Page
      demos: {
        back: 'Back',
        pageTitle: 'Interactive Audio Guide',
        pageSubtitle:
          'Select any section to listen to the corresponding audio guide',
        footerInfo: 'Tap any card to play the audio',
        cards: {
          intro: {
            title: 'Intro',
            subtitle: 'MWC for Telefónica',
          },
          demo1: {
            title: 'Demo 1',
            subtitle: 'Discover the future of critical communications',
          },
          demo2: {
            title: 'Demo 2',
            subtitle: 'Discover the future of critical communications',
          },
          demo3: {
            title: 'Demo 3',
            subtitle: 'Discover the future of critical communications',
          },
        },
      },
      // Audio Card
      audio: {
        play: 'Play audio',
        pause: 'Pause audio',
        progressLabel: 'Playback position',
      },
      // Accessibility
      accessibility: {
        skipToContent: 'Skip to main content',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es', // idioma por defecto
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false, // React ya escapa los valores
  },
});

// Sincronizar atributo lang del documento con el idioma activo (accesibilidad)
function setDocumentLang(lng: string) {
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.lang = lng === 'en' ? 'en' : 'es';
  }
}
setDocumentLang(i18n.language);
i18n.on('languageChanged', setDocumentLang);

export default i18n;



