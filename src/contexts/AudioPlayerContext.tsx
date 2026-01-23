import { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface AudioPlayerContextType {
  currentPlayingId: string | null;
  playAudio: (id: string, audioElement: HTMLAudioElement) => void;
  stopAudio: (id: string) => void;
  isPlaying: (id: string) => boolean;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (id: string, audioElement: HTMLAudioElement) => {
    // Si hay otro audio reproduciéndose, detenerlo primero
    if (currentAudioRef.current && currentAudioRef.current !== audioElement) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }

    // Reproducir el nuevo audio
    audioElement.play();
    currentAudioRef.current = audioElement;
    setCurrentPlayingId(id);

    // Cuando el audio termine, limpiar el estado
    audioElement.addEventListener('ended', () => {
      setCurrentPlayingId(null);
      currentAudioRef.current = null;
    }, { once: true });
  };

  const stopAudio = (id: string) => {
    if (currentAudioRef.current && currentPlayingId === id) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      setCurrentPlayingId(null);
      currentAudioRef.current = null;
    }
  };

  const isPlaying = (id: string) => {
    return currentPlayingId === id;
  };

  return (
    <AudioPlayerContext.Provider value={{ currentPlayingId, playAudio, stopAudio, isPlaying }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
}
