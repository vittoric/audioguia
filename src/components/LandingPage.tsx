import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NetworkLines } from './NetworkLines';
import { useLanding } from '../hooks/useContent';
import { useAccessibility } from '../contexts/AccessibilityContext';

/**
 * Página de Inicio (Landing Page)
 * 
 * NOTA PARA EDITORES: Para cambiar el título, descripción o botón de esta página,
 * edita el archivo content.json en la raíz del proyecto, sección "landing".
 * No necesitas tocar este archivo de código.
 */
export function LandingPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language as 'es' | 'en';
  const { settings } = useAccessibility();
  
  // Obtiene el contenido desde content.json
  const landing = useLanding();

  const title = landing.title[lang];
  const description = landing.description[lang];
  const cta = landing.cta[lang];
  
  // Desactivar animaciones si reduceMotion está activado
  const shouldAnimate = !settings.reduceMotion;

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B2739] via-[#0066FF] to-[#0066FF]">
        {/* Animated mesh gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 40% 20%, rgba(0, 102, 255, 0.3) 0%, transparent 50%)`,
          }}
          animate={shouldAnimate ? {
            backgroundPosition: ['0% 0%', '100% 100%'],
          } : {}}
          transition={shouldAnimate ? {
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          } : { duration: 0 }}
        />
        
        {/* Abstract dot pattern */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />

        {/* Network Lines Effect */}
        <NetworkLines />
      </div>

      {/* Bottom Network Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none">
        <NetworkLines />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-24 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldAnimate ? { duration: 0.8, ease: 'easeOut' } : { duration: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Hero Title */}
          <motion.h1
            className="text-white mb-4 md:mb-6 px-4 font-bold leading-tight"
            style={{ 
              fontSize: `calc(clamp(2rem, 5vw, 3.5rem) * var(--font-size-multiplier, 1))`,
              lineHeight: '1.2'
            }}
            initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldAnimate ? { duration: 0.8, delay: 0.2 } : { duration: 0 }}
          >
            {title}
          </motion.h1>

          {/* Subtítulo destacado */}
          <motion.p
            className="text-white mt-8 mb-6 md:mb-8 max-w-3xl mx-auto px-4 font-medium"
            style={{ 
              fontSize: `calc(clamp(1rem, 2vw, 1.25rem) * var(--font-size-multiplier, 1))`,
              lineHeight: '1.6'
            }}
            initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldAnimate ? { duration: 0.8, delay: 0.3 } : { duration: 0 }}
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={() => navigate('/demos')}
            className="group bg-white text-[#0B2739] px-8 py-4 rounded-full shadow-2xl 
                     hover:shadow-3xl transition-all duration-300 flex items-center gap-2 mx-auto
                     focus:outline-none focus:ring-4 focus:ring-white/50"
            style={{ 
              fontSize: `calc(1rem * var(--font-size-multiplier, 1))`,
              padding: `calc(1rem * var(--increased-spacing, 1)) calc(2rem * var(--increased-spacing, 1))`
            }}
            initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={shouldAnimate ? { duration: 0.8, delay: 0.6 } : { duration: 0 }}
            whileHover={shouldAnimate ? { scale: 1.05 } : {}}
            whileTap={shouldAnimate ? { scale: 0.98 } : {}}
            aria-label={cta}
          >
            <span className="font-semibold">{cta}</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
          </motion.button>

          {/* Decorative elements */}
         
  
   
        </motion.div>
      </div>
    </div>
  );
}