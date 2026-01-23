import { motion } from 'motion/react';
import { AudioCard } from './AudioCard';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDemos, getAudioUrl } from '../hooks/useContent';

/**
 * Página de Demos - Muestra todas las tarjetas de audio disponibles
 * 
 * NOTA PARA EDITORES: Para cambiar los títulos, subtítulos, imágenes o audios,
 * edita el archivo content.json en la raíz del proyecto.
 * No necesitas tocar este archivo de código.
 */
export function DemosPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'es' | 'en';
  
  // Obtiene las demos desde el archivo content.json
  const demos = useDemos();

  // Usa i18n para los textos de la página (no de las demos)
  const pageTitle = t('demos.pageTitle');
  const pageSubtitle = t('demos.pageSubtitle');
  const footerInfo = t('demos.footerInfo');
  const backText = t('demos.back');

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-white to-[#F7F7FF]">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#0B2739] hover:text-[#0066FF] 
                   transition-colors mb-6 md:mb-8 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>{backText}</span>
        </motion.button>

        {/* Page Title */}
        <motion.div
          className="mb-8 md:mb-12"
          style={{ marginBottom: `calc(2rem * var(--increased-spacing, 1))` }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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

        {/* Demo Cards List - Una columna con espaciado */}
        <div 
          className="flex flex-col"
          style={{ 
            gap: '30px'
          }}
        >
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              style={{ marginBottom: index < demos.length - 1 ? '30px' : '0' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: 'easeOut'
              }}
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
        </div>

        {/* Footer Info */}
        <motion.div
          className="mt-12 text-center text-[#0B2739]/60 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>{footerInfo}</p>
        </motion.div>
      </div>
    </div>
  );
}