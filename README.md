# Audioguía La Cabina 2026 - Guía de Edición de Contenido

## 📋 Introducción

Este proyecto es una audioguía interactiva para el stand de Telefónica en el MWC 2026. Esta guía está diseñada para que personas **sin conocimientos técnicos** puedan editar fácilmente los títulos, subtítulos, imágenes y audios de las demos.

---

## 🎯 ¿Qué puedo editar sin tocar código?

Puedes editar **TODO** el contenido visible en la web editando un solo archivo: **`content.json`**

Este archivo contiene:
- ✅ Títulos y subtítulos de las demos (en español e inglés)
- ✅ URLs de las imágenes de fondo
- ✅ Nombres de archivos de audio MP3 (en español e inglés)
- ✅ Textos de la página de inicio (en español e inglés)

**IMPORTANTE:** Los archivos MP3 deben estar en la carpeta `public/audios/`

---

## 📝 Cómo editar el contenido

### Paso 1: Abre el archivo `content.json`

Este archivo está en la **raíz del proyecto** (mismo nivel que `package.json`).

### Paso 2: Edita el contenido

El archivo tiene esta estructura:

```json
{
  "demos": [
    {
      "id": "intro",
      "order": 1,
      "title": {
        "es": "Título en español",
        "en": "Title in English"
      },
      "subtitle": {
        "es": "Subtítulo en español",
        "en": "Subtitle in English"
      },
      "backgroundImage": "URL_de_la_imagen",
      "audio": {
        "es": "nombre-del-archivo-es.mp3",
        "en": "nombre-del-archivo-en.mp3"
      }
    }
  ]
}
```

### Paso 3: Guarda el archivo

Después de guardar, el servidor de desarrollo se actualizará automáticamente y verás los cambios en el navegador.

---

## 🎨 Ejemplos de edición

### Cambiar el título de una demo

**Antes:**
```json
"title": {
  "es": "Demo 1",
  "en": "Demo 1"
}
```

**Después:**
```json
"title": {
  "es": "5G y Redes Inteligentes",
  "en": "5G and Smart Networks"
}
```

### Añadir un archivo de audio

Los archivos de audio deben estar en la carpeta `public/audios/` del proyecto.

**Paso 1:** Coloca tus archivos MP3 en `public/audios/`
- Ejemplo: `public/audios/demo1-es.mp3`
- Ejemplo: `public/audios/demo1-en.mp3`

**Paso 2:** Edita `content.json`:

**Antes:**
```json
"audio": {
  "es": "",
  "en": ""
}
```

**Después:**
```json
"audio": {
  "es": "demo1-es.mp3",
  "en": "demo1-en.mp3"
}
```

**Nota:** Solo escribe el nombre del archivo (ej: `"demo1-es.mp3"`), NO la ruta completa.

### Cambiar la imagen de fondo

**Antes:**
```json
"backgroundImage": "https://images.unsplash.com/..."
```

**Después:**
```json
"backgroundImage": "https://tu-servidor.com/imagenes/demo1.jpg"
```

---

## 📂 Estructura del archivo `content.json`

### Sección `demos`

Cada demo tiene:
- **`id`**: Identificador único (no cambiar)
- **`order`**: Orden de aparición (1, 2, 3, 4...)
- **`title`**: Título en español e inglés
- **`subtitle`**: Subtítulo en español e inglés
- **`backgroundImage`**: URL de la imagen de fondo
- **`audio`**: Nombres de archivos MP3 en español e inglés (deben estar en `public/audios/`)

### Sección `landing`

Contiene los textos de la página de inicio:
- **`title`**: Título principal
- **`description`**: Descripción
- **`cta`**: Texto del botón "Empezar"

---

## ⚠️ Reglas importantes

1. **No elimines las comas** entre elementos
2. **Mantén las comillas dobles** `"` alrededor de los textos
3. **No cambies los nombres** de las propiedades (`id`, `order`, `title`, etc.)
4. **Las URLs de audio pueden estar vacías** `""` si aún no tienes los archivos
5. **Siempre incluye ambas traducciones** (español e inglés)

---

## 🔧 ¿Qué hacer si algo no funciona?

### El navegador muestra un error

1. Verifica que no hayas eliminado ninguna coma `,`
2. Verifica que todos los textos estén entre comillas dobles `"`
3. Verifica que no hayas cambiado los nombres de las propiedades

### Los cambios no se ven

1. Guarda el archivo `content.json`
2. Espera unos segundos (el servidor se actualiza automáticamente)
3. Recarga la página en el navegador (F5 o Cmd+R)

### Necesitas ayuda técnica

Si necesitas hacer cambios más complejos o algo no funciona, contacta al equipo de desarrollo.

---

## 🚀 Cómo arrancar el proyecto (para desarrolladores)

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Arrancar servidor de desarrollo
npm run dev
```

El proyecto estará disponible en: `http://localhost:3000`

---

## 📌 Notas adicionales

- **Los audios deben estar en formato MP3** y colocarse en la carpeta `public/audios/`
- En `content.json` solo escribe el nombre del archivo (ej: `"demo1-es.mp3"`), NO la ruta completa
### 📁 Ubicación de los archivos de audio

**Los archivos MP3 DEBEN estar en:** `public/audios/`

```
proyecto/
├── public/
│   └── audios/              ← AQUÍ van los archivos MP3
│       ├── demo1-es.mp3
│       ├── demo1-en.mp3
│       └── ...
├── content.json             ← AQUÍ editas los nombres
└── src/                     ← NO TOCAR (código)
```

**NO pongas los audios en:**
- ❌ `src/assets/` (esta carpeta es para el código)
- ❌ Otras carpetas

**SÍ ponlos en:**
- ✅ `public/audios/` (esta es la carpeta correcta)

### 📝 Otras notas

- Los audios deben estar en formato MP3
- En `content.json` solo escribe el nombre del archivo (ej: `"demo1-es.mp3"`), NO la ruta completa
- Las imágenes pueden ser JPG, PNG o WebP (pueden ser URLs o rutas relativas)
- Si dejas el nombre de audio vacío `""`, la demo mostrará una simulación de reproducción
- **IMPORTANTE:** Después de cambiar `content.json`, guarda el archivo y espera 2-3 segundos. Los cambios se reflejarán automáticamente en ambos idiomas.

---

## 📞 Contacto

Para dudas o problemas, contacta al equipo de desarrollo.
# audioguia
