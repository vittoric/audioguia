# Instrucciones para publicar la web en un subdominio

**Para reenviar a los responsables del dominio / hosting**

---

La Audioguía La Cabina (prototipo MWC 2026) es una **web estática** pensada para publicarse en un subdominio (por ejemplo `audioguia.dominio.com` o `lacabina.dominio.com`). No usa base de datos ni servidor de aplicaciones: todo el contenido y la lógica van en archivos estáticos (HTML, CSS, JavaScript e imágenes/audios).

**Qué necesitan quienes vayan a subirla:**

1. **Contenido a publicar:** Una vez hecha la compilación del proyecto (`npm install` y `npm run build`), la web lista para subir está dentro de la carpeta **`build`**. Toda esa carpeta debe publicarse en la raíz del subdominio (los archivos que están dentro de `build` deben ser los que se sirvan al acceder a la URL del subdominio).

2. **Tipo de alojamiento:** Basta con un **alojamiento estático** (un servidor web o CDN que sirva archivos: Nginx, Apache, Netlify, Vercel, S3 + CloudFront, etc.). No hace falta PHP, Node.js en el servidor ni bases de datos.

3. **Configuración importante:** La aplicación es una SPA (Single Page Application) con rutas internas (por ejemplo `/demos`). El servidor debe estar configurado para que **todas las rutas devuelvan el mismo `index.html`** cuando se accede directamente o se refresca la página. Si no se hace esto, al entrar o refrescar en una ruta como `/demos` aparecerá un error 404. En la práctica suele bastar con una regla de “rewrite” o “fallback” hacia `index.html` para todas las peticiones que no correspondan a un archivo existente (por ejemplo a un `.js`, `.css` o `.png`).

4. **Requisitos técnicos:** Solo se necesita poder subir la carpeta `build` al servidor o canal de despliegue y que el servidor esté configurado como en el punto 3. No hay variables de entorno obligatorias ni APIs externas que configurar para que la web funcione.

5. **Resumen:** Compilar el proyecto → subir el contenido de la carpeta **`build`** a la raíz del subdominio → configurar el servidor para que las rutas sin archivo físico respondan con **`index.html`**. Con eso la web quedará operativa en el subdominio.
