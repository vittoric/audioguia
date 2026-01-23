// Importar el JSON directamente - Vite lo maneja automáticamente
import contentData from '../../content.json';

// Tipos para el contenido
export interface DemoContent {
  id: string;
  order: number;
  title: {
    es: string;
    en: string;
  };
  subtitle: {
    es: string;
    en: string;
  };
  backgroundImage: string;
  audio: {
    es: string; // Nombre del archivo MP3 (ej: "demo1-es.mp3")
    en: string; // Nombre del archivo MP3 (ej: "demo1-en.mp3")
  };
}

export interface LandingContent {
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  cta: {
    es: string;
    en: string;
  };
}

interface ContentData {
  demos: DemoContent[];
  landing: LandingContent;
}

/**
 * Función para obtener la URL del audio desde el nombre del archivo
 * 
 * IMPORTANTE: Los archivos MP3 deben estar en la carpeta public/audios/
 * 
 * Ejemplo:
 * - Archivo: public/audios/demo1-es.mp3
 * - En content.json: "es": "demo1-es.mp3"
 * - Resultado: /audios/demo1-es.mp3
 */
export function getAudioUrl(filename: string): string | undefined {
  if (!filename || filename.trim() === '') {
    return undefined;
  }
  
  // Si es una URL completa (http:// o https://), devolverla tal cual
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }
  
  // Los archivos MP3 deben estar en public/audios/
  // Vite sirve automáticamente los archivos de public/ en la raíz
  return `/audios/${filename}`;
}

// Hook para obtener el contenido desde el archivo JSON
// IMPORTANTE: Este hook lee directamente de content.json
// Los cambios en content.json se reflejarán automáticamente al guardar (Vite HMR)
export function useContent() {
  // Usar el contenido directamente del import estático
  // Vite recargará automáticamente el módulo cuando cambie content.json
  const content = contentData as ContentData;
  
  return { content, loading: false };
}

// Hook específico para obtener las demos ordenadas
export function useDemos() {
  const { content } = useContent();
  const demos = content.demos.sort((a, b) => a.order - b.order);
  return demos;
}

// Hook específico para obtener el contenido de landing
export function useLanding() {
  const { content } = useContent();
  return content.landing;
}
