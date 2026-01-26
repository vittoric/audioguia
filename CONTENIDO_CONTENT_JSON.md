# Contenido editable desde content.json

Todo el contenido visible de la web (títulos, subtítulos, imágenes y audios) se puede modificar **solo editando** el archivo **`content.json`** en la raíz del proyecto. No hace falta tocar código.

---

## Resumen

| Dónde se ve | Qué editar en content.json |
|-------------|----------------------------|
| **Página principal (Index)** | `landing` |
| **Página de Demos** (título, subtítulo, botón Volver, texto del pie) | `demosPage` |
| **Tarjetas de audio** (título, subtítulo, imagen, audio) | `demos[]` |

---

## 1. Página principal (Landing)

- **Título grande:** `landing.title.es` / `landing.title.en`
- **Subtítulo / descripción:** `landing.description.es` / `landing.description.en`
- **Texto del botón (ej. «¡Empezamos!»):** `landing.cta.es` / `landing.cta.en`

---

## 2. Página de Demos (cabecera y pie)

- **Título de la página (ej. «Audioguía Interactiva»):** `demosPage.pageTitle.es` / `demosPage.pageTitle.en`
- **Subtítulo bajo el título:** `demosPage.pageSubtitle.es` / `demosPage.pageSubtitle.en`
- **Botón «Volver»:** `demosPage.back.es` / `demosPage.back.en`
- **Texto del pie (ej. «Toca cualquier tarjeta...»):** `demosPage.footerInfo.es` / `demosPage.footerInfo.en`

---

## 3. Tarjetas de audio

Cada elemento del array **`demos`** es una tarjeta. Propiedades:

- **Título de la tarjeta:** `demos[].title.es` / `demos[].title.en`
- **Subtítulo:** `demos[].subtitle.es` / `demos[].subtitle.en`
- **Imagen de fondo:** `demos[].backgroundImage` (URL completa o ruta)
- **Audio:** `demos[].audio.es` / `demos[].audio.en` (nombre del archivo en `public/audios/`, p. ej. `"mi-audio.mp3"`)

El **orden** de las tarjetas se controla con **`demos[].order`** (1, 2, 3…).  
Para **añadir o quitar** tarjetas, basta con añadir o quitar objetos en el array `demos` manteniendo la misma estructura (id, order, title, subtitle, backgroundImage, audio).

---

## Qué NO está en content.json

- **Idioma de la interfaz:** Los textos de la interfaz (p. ej. «Reproducir audio», «Saltar al contenido», etiquetas del panel de accesibilidad) siguen en `src/i18n/index.ts`. Solo el contenido de la landing, la página de demos y las tarjetas sale de `content.json`.
- **Logo del navbar:** Sigue siendo el asset en `src/assets/`. El enlace del logo apunta siempre a la página principal.

Resumen: **títulos, subtítulos, imágenes y audios** que ves en la landing y en la página de demos (incluidas las tarjetas) **se modifican solo en content.json**.
