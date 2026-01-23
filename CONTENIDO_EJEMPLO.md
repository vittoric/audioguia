# 📝 Guía Rápida: Cómo Editar el Contenido

## 🎯 Resumen

**Solo necesitas editar UN archivo:** `content.json`

Este archivo contiene TODO el contenido visible en la web:
- Títulos y subtítulos de las 4 demos (en español e inglés)
- URLs de las imágenes
- Nombres de archivos de audio MP3
- Textos de la página de inicio (en español e inglés)

---

## 📋 Ejemplo de cómo se ve una demo en `content.json`

```json
{
  "id": "demo1",                    // ← NO CAMBIAR (identificador interno)
  "order": 1,                       // ← Orden de aparición (1, 2, 3, 4...)
  "title": {
    "es": "Demo 1",                 // ← Título en ESPAÑOL (cambia esto)
    "en": "Demo 1"                  // ← Título en INGLÉS (cambia esto)
  },
  "subtitle": {
    "es": "Subtítulo en español",    // ← Subtítulo en ESPAÑOL (cambia esto)
    "en": "Subtitle in English"     // ← Subtítulo en INGLÉS (cambia esto)
  },
  "backgroundImage": "https://...", // ← URL de la imagen (cambia esto)
  "audio": {
    "es": "demo1-es.mp3",           // ← Nombre del archivo MP3 en ESPAÑOL
    "en": "demo1-en.mp3"            // ← Nombre del archivo MP3 en INGLÉS
  }
}
```

---

## ✏️ Ejemplos Prácticos

### Ejemplo 1: Cambiar el título de "Demo 1"

**Busca esto:**
```json
"title": {
  "es": "Demo 1",
  "en": "Demo 1"
}
```

**Cámbialo por:**
```json
"title": {
  "es": "5G y Redes Inteligentes",
  "en": "5G and Smart Networks"
}
```

**✅ IMPORTANTE:** Después de guardar, espera 2-3 segundos y recarga la página. Los cambios se verán en AMBOS idiomas.

### Ejemplo 2: Añadir un audio

**📍 IMPORTANTE: Los archivos MP3 DEBEN estar en `public/audios/`**

**NO los pongas en:**
- ❌ `src/assets/` (esta carpeta es para el código, no para contenido)
- ❌ Otras carpetas

**SÍ ponlos en:**
- ✅ `public/audios/` (esta es la carpeta correcta)

**Paso 1:** Coloca tu archivo MP3 en la carpeta `public/audios/`
- Ejemplo: `public/audios/demo1-es.mp3`
- Ejemplo: `public/audios/demo1-en.mp3`

**Paso 2:** Edita `content.json`:

**Busca esto:**
```json
"audio": {
  "es": "",
  "en": ""
}
```

**Cámbialo por:**
```json
"audio": {
  "es": "demo1-es.mp3",
  "en": "demo1-en.mp3"
}
```

**⚠️ IMPORTANTE:** 
- Solo escribe el nombre del archivo (ej: `"demo1-es.mp3"`), NO escribas la ruta completa
- El archivo debe estar físicamente en `public/audios/`

### Ejemplo 3: Cambiar la imagen

**Busca esto:**
```json
"backgroundImage": "https://images.unsplash.com/..."
```

**Cámbialo por:**
```json
"backgroundImage": "https://tuservidor.com/imagenes/demo1.jpg"
```

---

## ⚠️ Reglas de Oro

1. ✅ **Siempre usa comillas dobles** `"texto"`
2. ✅ **No olvides las comas** `,` entre elementos
3. ✅ **Mantén ambos idiomas** (español e inglés) - SIEMPRE edita ambos
4. ✅ **No cambies** `id` ni los nombres de las propiedades
5. ✅ **Si no tienes audio**, deja `""` vacío
6. ✅ **Para audios**, solo escribe el nombre del archivo (ej: `"demo1-es.mp3"`), NO la ruta
7. ✅ **Los archivos MP3 DEBEN estar en `public/audios/`** (NO en `src/assets/`)

---

## 🔍 ¿Dónde está cada cosa?

### Las 4 demos están en:
```json
{
  "demos": [
    { ... },  // ← Demo 1 (intro)
    { ... },  // ← Demo 2
    { ... },  // ← Demo 3
    { ... }   // ← Demo 4
  ]
}
```

### La página de inicio está en:
```json
{
  "landing": {
    "title": { ... },
    "description": { ... },
    "cta": { ... }
  }
}
```

---

## 🌐 Traducciones (Español e Inglés)

**IMPORTANTE:** Cuando edites cualquier texto, DEBES editarlo en AMBOS idiomas:

```json
"title": {
  "es": "Título en español",     // ← Edita esto
  "en": "Title in English"       // ← Y también esto
}
```

**Si solo editas uno**, el otro idioma seguirá mostrando el texto anterior.

---

## 💡 Tips

- **Guarda el archivo** después de cada cambio
- **Espera 2-3 segundos** para que se actualice automáticamente
- **Recarga la página** (F5 o Cmd+R) si no ves los cambios
- **Prueba en ambos idiomas** para verificar que los cambios se aplicaron
- **Copia y pega** desde este documento si tienes dudas del formato

---

## 🆘 Si algo sale mal

### Los cambios no se ven en inglés

1. Verifica que hayas editado **AMBOS** idiomas (`"es"` y `"en"`)
2. Guarda el archivo `content.json`
3. Espera 2-3 segundos
4. Recarga la página completamente (F5 o Cmd+R)
5. Cambia el idioma en la web y verifica

### El audio no se reproduce

1. Verifica que el archivo MP3 esté en `public/audios/`
2. Verifica que el nombre en `content.json` coincida exactamente con el nombre del archivo
3. Verifica que el nombre tenga la extensión `.mp3`

### Error al guardar

1. Verifica que no hayas eliminado ninguna coma `,`
2. Verifica que todos los textos tengan comillas `"`
3. Verifica que no hayas cambiado `id` o nombres de propiedades

---

## 📞 ¿Necesitas ayuda?

Si tienes problemas editando el archivo, contacta al equipo de desarrollo con:
- Una captura de pantalla del error
- El contenido que intentaste añadir
- El idioma en el que estás probando (español/inglés)
