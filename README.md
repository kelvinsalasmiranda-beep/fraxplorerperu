# Fraxplorer Peru — Réplica Profesional

Réplica completa del sitio [fraxplorerperu.com](https://fraxplorerperu.com/) construida con **Next.js 14**, **TypeScript** y **Tailwind CSS**. Export estático listo para Git y despliegue en [Hostinger WordPress Hosting](https://www.hostinger.com/mx/hosting-wordpress#pricing).

## Plan Hostinger recomendado

**Ilimitado** — MXN 55.99/mes (promo 48 meses)

| Característica | Detalle |
|---|---|
| Sitios web | Ilimitados |
| Almacenamiento | 50 GB NVMe |
| WordPress + Node.js | ✓ Ambos incluidos |
| Git | ✓ Integración SSH |
| CDN | ✓ Incluido |
| Backups | Diarios |
| Email | Ilimitados (1 año gratis) |

> El plan **Premium** solo incluye WordPress. Para Node.js + Git, usa el plan **Ilimitado**.

## Requisitos

- Node.js 18+
- npm 9+

## Instalación local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build + export estático a `/out` |
| `npm run download-images` | Descargar imágenes del sitio original |
| `npm run deploy:static` | Build + copia a `/deploy` para Hostinger |

## Estructura del proyecto

```
fraxplorerperu/
├── public/images/       # 58 imágenes del sitio original
├── src/
│   ├── app/             # Páginas (home, políticas, términos)
│   ├── components/      # Header, Hero, Tours, FAQ, Footer...
│   └── data/site.ts     # Todo el contenido y navegación
├── scripts/             # Extracción de imágenes y deploy
├── deploy/              # Output listo para subir (generado)
└── out/                 # Export estático Next.js (generado)
```

## Secciones incluidas

- ✅ Hero con video de fondo (Pexels)
- ✅ Barra superior con WhatsApp y email
- ✅ Menú completo con 7 categorías y submenús
- ✅ 4 razones para elegir FraXplorer
- ✅ Sección "Vive Historias"
- ✅ Carrusel de 8 paquetes turísticos
- ✅ 5 tipos de experiencias con galerías
- ✅ 4 aventuras de moda
- ✅ 4 destinos sugeridos
- ✅ Testimonios (WhatsApp screenshots)
- ✅ FAQ con 10 preguntas
- ✅ Licencias y sellos legales
- ✅ Footer completo con contacto y pagos
- ✅ Botón flotante WhatsApp
- ✅ Páginas legales (privacidad, términos)

## Despliegue en Hostinger

### Opción A: Sitio estático (recomendado para esta réplica)

1. Contrata plan **Premium** en Hostinger
2. En hPanel → **Git** → conecta tu repositorio
3. Build command: `npm install && npm run deploy:static`
4. Publish directory: `deploy`
5. O sube manualmente el contenido de `/deploy` a `public_html` vía FTP

### Opción B: WordPress + tema personalizado

1. Instala WordPress desde hPanel
2. Usa el contenido de `src/data/site.ts` como referencia
3. Importa imágenes desde `public/images/`
4. Configura Elementor o Gutenberg con las mismas secciones

### Opción C: Git + Node.js en Hostinger

1. Sube el repo a GitHub
2. En hPanel → Websites → Git → Deploy
3. Node.js version: 18+
4. Start command: `npm start` (modo SSR) o sirve `/out` como estático

## Subir a GitHub

```bash
git init
git add .
git commit -m "Réplica profesional Fraxplorer Peru"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/fraxplorerperu.git
git push -u origin main
```

## Contacto original

- Web: https://fraxplorerperu.com
- WhatsApp: +51 931 536 444
- Email: fraxplorerperu@gmail.com
- RUC: 20614867923

---

© Fraxplorer Peru — Réplica para despliegue profesional
