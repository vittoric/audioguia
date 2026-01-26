import { motion } from 'motion/react';
import { Play, Pause } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface AudioCardProps {
  title: string;
  subtitle: string;
  id: string;
  backgroundImage?: string;
  audioUrl?: string; // URL del audio
}

export function AudioCard({ title, subtitle, id, backgroundImage, audioUrl }: AudioCardProps) {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { t } = useTranslation();
  const { playAudio, stopAudio, isPlaying: isPlayingGlobal } = useAudioPlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  
  const isPlaying = isPlayingGlobal(id);
  const { settings } = useAccessibility();
  const shouldAnimate = !settings.reduceMotion;

  // Función para formatear el tiempo en mm:ss
  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Actualizar el estado cuando otro audio empiece a reproducirse
  useEffect(() => {
    if (!isPlaying) {
      // Si este audio no está reproduciéndose, detenerlo y limpiar
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      // Detener la simulación si está activa
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setProgress(0);
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    // Si hay URL de audio real, usar HTMLAudioElement
    if (audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        
        audioRef.current.addEventListener('loadedmetadata', () => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        });
        
        audioRef.current.addEventListener('ended', () => {
          setProgress(0);
          setCurrentTime(0);
        });
        
        audioRef.current.addEventListener('timeupdate', () => {
          if (audioRef.current && !isDragging) {
            const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(percent);
            setCurrentTime(audioRef.current.currentTime);
          }
        });
      }

      if (isPlaying) {
        // Pausar este audio
        stopAudio(id);
        setProgress(0);
      } else {
        // Reproducir este audio (esto detendrá automáticamente cualquier otro)
        playAudio(id, audioRef.current);
      }
    } else {
      // Simulación de audio si no hay URL real
      if (isPlaying) {
        // Detener simulación
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setProgress(0);
        stopAudio(id);
      } else {
        // Iniciar simulación
        // El contexto ya detendrá cualquier otro audio automáticamente
        
        // Para simulación, usamos un audio dummy para el contexto
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        playAudio(id, audioRef.current);
        
        // Iniciar la simulación de progreso
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              setProgress(0);
              stopAudio(id);
              return 0;
            }
            return prev + 1;
          });
        }, 100);
      }
    }
  };

  // Handler para hacer clic en la barra de progreso
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioUrl || !audioRef.current || !progressBarRef.current || !duration) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    const newTime = (percent / 100) * duration;
    
    if (!isNaN(newTime) && duration > 0) {
      audioRef.current.currentTime = newTime;
      setProgress(percent);
      setCurrentTime(newTime);
    }
  };

  // Handler para arrastrar el slider
  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioUrl || !audioRef.current || !progressBarRef.current || !duration) return;
    
    e.preventDefault();
    setIsDragging(true);
    const rect = progressBarRef.current.getBoundingClientRect();
    
    const updateProgress = (clientX: number) => {
      const clickX = clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
      const newTime = (percent / 100) * duration;
      
      if (!isNaN(newTime) && duration > 0) {
        audioRef.current!.currentTime = newTime;
        setProgress(percent);
      }
    };
    
    updateProgress(e.clientX);
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      updateProgress(moveEvent.clientX);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Llevar la reproducción a un porcentaje (0-100). Usado por teclado y por clic/arrastre.
  const seekToPercent = (percent: number) => {
    if (!audioUrl || !audioRef.current || !duration) return;
    const p = Math.max(0, Math.min(100, percent));
    const newTime = (p / 100) * duration;
    if (!isNaN(newTime)) {
      audioRef.current.currentTime = newTime;
      setProgress(p);
      setCurrentTime(newTime);
    }
  };

  // Teclado accesible para la barra de progreso (slider)
  const handleProgressKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!audioUrl || !duration) return;
    const step = 1;
    const bigStep = 10;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        seekToPercent(progress - step);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        seekToPercent(progress + step);
        break;
      case 'Home':
        e.preventDefault();
        seekToPercent(0);
        break;
      case 'End':
        e.preventDefault();
        seekToPercent(100);
        break;
      case 'PageDown':
        e.preventDefault();
        seekToPercent(progress - bigStep);
        break;
      case 'PageUp':
        e.preventDefault();
        seekToPercent(progress + bigStep);
        break;
      default:
        break;
    }
  };

  return (
    <motion.div
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
                 overflow-hidden border border-[#0066FF]/20 group cursor-pointer"
      whileHover={shouldAnimate ? { y: -4, boxShadow: '0 20px 40px rgba(0, 102, 255, 0.2)' } : undefined}
      initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldAnimate ? { duration: 0.4 } : { duration: 0 }}
    >
      {/* Background Image with Dark Overlay */}
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />
        </>
      )}
      
      <div className="relative p-5 md:p-6 flex items-center gap-4">
        {/* Left Section - Text Content */}
        <div className="flex-1 min-w-0">
          <h3 
            className={`mb-1 group-hover:text-[#0066FF] transition-colors break-words ${
              backgroundImage ? 'text-white' : 'text-[#0B2739]'
            }`}
            style={{ fontSize: `calc(1.25rem * var(--font-size-multiplier, 1))` }}
          >
            {title}
          </h3>
          <p 
            className={`text-sm md:text-base break-words ${
              backgroundImage ? 'text-white/90' : 'text-[#58617A]'
            }`}
            style={{ fontSize: `calc(1rem * var(--font-size-multiplier, 1))` }}
          >
            {subtitle}
          </p>
          
          {/* Progress Bar / Slider (accesible por teclado y lectores de pantalla) */}
          {(isPlaying || audioUrl) && (
            <div className="mt-3">
              <motion.div
                ref={progressBarRef}
                role="slider"
                tabIndex={0}
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t('audio.progressLabel')}
                aria-valuetext={
                  audioUrl && duration > 0
                    ? `${formatTime((progress / 100) * duration)} / ${formatTime(duration)}`
                    : undefined
                }
                className="h-2 bg-[#0066FF]/20 rounded-full overflow-hidden cursor-pointer relative group outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2"
                initial={shouldAnimate ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={shouldAnimate ? { duration: 0.3 } : { duration: 0 }}
                onClick={handleProgressClick}
                onMouseDown={handleProgressMouseDown}
                onKeyDown={handleProgressKeyDown}
              >
                <motion.div
                  className="h-full bg-[#0066FF] relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Slider Thumb */}
                  <div 
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 
                             w-3 h-3 bg-[#0066FF] rounded-full opacity-0 group-hover:opacity-100 
                             transition-opacity cursor-grab active:cursor-grabbing"
                    style={{ display: isPlaying || isDragging ? 'block' : 'none' }}
                  />
                </motion.div>
              </motion.div>
              {/* Duración del audio */}
              {audioUrl && duration > 0 && (
                <div className={`mt-1.5 text-xs flex justify-between items-center ${
                  backgroundImage ? 'text-white/70' : 'text-[#58617A]'
                }`}>
                  <span>{formatTime(isPlaying ? currentTime : 0)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Section - Audio Visualizer & Play Button */}
        <div className="flex items-center gap-3">
          {/* Audio Wave Visualization */}
          <div className="hidden sm:flex items-end gap-1 h-12">
            {[3, 7, 4, 8, 5, 9, 4, 6].map((height, index) => (
              <motion.div
                key={index}
                className="w-1 rounded-full bg-[#0066FF]/40 group-hover:bg-[#0066FF]"
                style={{ height: `${height * 4}px` }}
                animate={shouldAnimate && isPlaying ? {
                  height: [`${height * 4}px`, `${height * 6}px`, `${height * 4}px`],
                } : {}}
                transition={
                  shouldAnimate && isPlaying
                    ? { duration: 0.6, repeat: Infinity, delay: index * 0.1, ease: 'easeInOut' }
                    : { duration: 0 }
                }
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <motion.button
            onClick={handlePlayPause}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0066FF] 
                     flex items-center justify-center text-white shadow-lg hover:shadow-xl
                     transition-all duration-300 group-hover:scale-110"
            whileHover={shouldAnimate ? { scale: 1.15 } : undefined}
            whileTap={shouldAnimate ? { scale: 0.95 } : undefined}
            aria-label={isPlaying ? t('audio.pause') : t('audio.play')}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 md:w-7 md:h-7" fill="white" />
            ) : (
              <Play className="w-6 h-6 md:w-7 md:h-7 ml-1" fill="white" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}