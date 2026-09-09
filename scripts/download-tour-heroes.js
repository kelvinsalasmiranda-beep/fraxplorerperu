/**
 * Descarga imágenes hero para tours (Pexels, uso libre).
 * Ejecutar: node scripts/download-tour-heroes.js
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'tours');
const DEPLOY_DIR = path.join(__dirname, '..', 'deploy', 'images');
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images');

const DOWNLOADS = [
  {
    file: 'city-tour-cusco.jpg',
    url: 'https://images.pexels.com/photos/5095992/pexels-photo-5095992.jpeg?auto=compress&cs=tinysrgb&w=1280',
  },
  {
    file: 'city-tour-lima.jpg',
    url: 'https://images.pexels.com/photos/1520189/pexels-photo-1520189.jpeg?auto=compress&cs=tinysrgb&w=1280',
    note: 'Sobrescrito por imágenes del PDF oficial en public/images/tours/',
  },
  {
    file: 'glaciar-qelccaya.jpg',
    url: 'https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg?auto=compress&cs=tinysrgb&w=1280',
  },
  {
    file: 'valle-sagrado-incas.jpg',
    url: 'https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg?auto=compress&cs=tinysrgb&w=1280',
    fallback: '33098cd0a441c619cc416a8f67180f21.jpg',
  },
  {
    file: 'cuatrimotos-maras-moray.jpg',
    url: 'https://images.pexels.com/photos/3601424/pexels-photo-3601424.jpeg?auto=compress&cs=tinysrgb&w=1280',
  },
  {
    file: 'lago-titicaca-cusco.jpg',
    url: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=1280',
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0 FraXplorerPeru/1.0' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          fs.unlinkSync(dest);
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(dest)));
      })
      .on('error', reject);
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  if (fs.existsSync(DEPLOY_DIR)) {
    for (const name of fs.readdirSync(DEPLOY_DIR)) {
      const src = path.join(DEPLOY_DIR, name);
      const dest = path.join(PUBLIC_DIR, name);
      if (fs.statSync(src).isFile() && !fs.existsSync(dest)) {
        fs.copyFileSync(src, dest);
      }
    }
    console.log('✓ Imágenes de deploy copiadas a public/images');
  }

  for (const item of DOWNLOADS) {
    const dest = path.join(OUT_DIR, item.file);
    try {
      await download(item.url, dest);
      console.log(`✓ ${item.file}`);
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      if (item.fallback) {
        const src = path.join(PUBLIC_DIR, item.fallback);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          console.log(`✓ ${item.file} (copiada desde deploy: ${item.fallback})`);
          continue;
        }
      }
      console.error(`✗ ${item.file}: ${err.message}`);
    }
  }
}

main();
