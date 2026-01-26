import { motion } from 'motion/react';
import { AudioCard } from './AudioCard';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDemos, useDemosPageContent, getAudioUrl } from '../hooks/useContent';
import { useAccessibility } from '../contexts/AccessibilityContext';

/**
 * Página de Demos - Muestra todas las tarjetas de audio disponibles
 * 
 * NOTA PARA EDITORES: Para cambiar los títulos, subtítulos, imágenes o audios,
 * edita el archivo content.json en la raíz del proyecto.
 * No necesitas tocar este archivo de código.
 */
export function DemosPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language as 'es' | 'en';
  const { settings } = useAccessibility();
  const shouldAnimate = !settings.reduceMotion;

  // Obtiene las demos y los textos de la página desde content.json
  const demos = useDemos();
  const demosPageContent = useDemosPageContent();
  const pageTitle = demosPageContent.pageTitle[lang];
  const pageSubtitle = demosPageContent.pageSubtitle[lang];
  const footerInfo = demosPageContent.footerInfo[lang];
  const backText = demosPageContent.back[lang];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-white to-[#F7F7FF]">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#0B2739] hover:text-[#0066FF] 
                   transition-colors mb-6 md:mb-8 group"
          initial={shouldAnimate ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={shouldAnimate ? { duration: 0.4 } : { duration: 0 }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" aria-hidden />
          <span>{backText}</span>
        </motion.button>

        {/* Page Title */}
        <motion.div
          className="mb-8 md:mb-12"
          style={{ marginBottom: `calc(2rem * var(--increased-spacing, 1))` }}
          initial={shouldAnimate ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldAnimate ? { duration: 0.5 } : { duration: 0 }}
        >
          <h1 
            className="text-[#0B2739] mb-3 font-bold"
            style={{ 
              fontSize: `calc(clamp(1.75rem, 4vw, 2.5rem) * var(--font-size-multiplier, 1))`,
              lineHeight: '1.2'
            }}
          >
            {pageTitle}
          </h1>
          <p 
            className="text-[#58617A]"
            style={{ 
              fontSize: `calc(clamp(1rem, 2vw, 1.125rem) * var(--font-size-multiplier, 1))`,
              lineHeight: '1.6'
            }}
          >
            {pageSubtitle}
          </p>
        </motion.div>

        {/* Demo Cards List - región con nombre para navegación por bloques */}
        <section
          className="flex flex-col"
          style={{ gap: '30px' }}
          aria-label={lang === 'es' ? 'Lista de pistas de la audioguía' : 'Audio guide tracks list'}
        >
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              style={{ marginBottom: index < demos.length - 1 ? '30px' : '0' }}
              initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldAnimate
                  ? { duration: 0.5, delay: index * 0.1, ease: 'easeOut' }
                  : { duration: 0 }
              }
            >
              <AudioCard
                title={demo.title[lang]}
                subtitle={demo.subtitle[lang]}
                id={demo.id}
                backgroundImage={demo.backgroundImage}
                audioUrl={demo.audio[lang] ? getAudioUrl(demo.audio[lang]) : undefined}
              />
            </motion.div>
          ))}
        </section>

        {/* Footer Info */}
        <motion.div
          className="mt-12 text-center text-[#0B2739]/60 text-sm"
          initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={shouldAnimate ? { duration: 0.5, delay: 0.6 } : { duration: 0 }}
        >
          <p>{footerInfo}</p>
        </motion.div>
      </div>
    </div>
  );
}