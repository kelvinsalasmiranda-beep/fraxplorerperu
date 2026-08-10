const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const VIDEOS_DIR = path.join(ROOT, 'public', 'videos');
const MEDIA_MANIFEST = path.join(__dirname, 'media-manifest.json');

const SITE = 'https://fraxplorerperu.com';
const HERO_VIDEO_URL =
  'https://videos.pexels.com/video-files/32106877/13687564_2560_1440_60fps.mp4';

fs.mkdirSync(IMAGES_DIR, { recursive: true });
fs.mkdirSync(VIDEOS_DIR, { recursive: true });

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return fetchText(res.headers.location).then(resolve).catch(reject);
        }
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    proto
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          if (fs.existsSync(dest)) fs.unlinkSync(dest);
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          if (fs.existsSync(dest)) fs.unlinkSync(dest);
          return reject(new Error(`${url} => ${res.statusCode}`));
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', (err) => {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        reject(err);
      });
  });
}

function extractImageUrls(html) {
  const regex = /https?:\/\/(?:fraxplorerperu\.com|www\.fraxplorerperu\.com)\/wp-content\/uploads\/[^"'\s)<]+/gi;
  return [...new Set((html.match(regex) || []).map((u) => u.split('?')[0]))];
}

async function crawlSitemapUrls() {
  const urls = new Set([`${SITE}/`]);
  try {
    const sitemapIndex = await fetchText(`${SITE}/wp-sitemap.xml`);
    const sitemaps = [...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    for (const sm of sitemaps.slice(0, 8)) {
      try {
        const xml = await fetchText(sm);
        const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
        pages.forEach((p) => urls.add(p));
      } catch {
        /* skip broken sitemap */
      }
    }
  } catch {
    console.log('Sitemap no disponible, usando solo homepage');
  }
  return [...urls];
}

async function collectAllImageUrls() {
  const allUrls = new Set();

  // From saved source if exists
  const sourcePath = path.join(ROOT, '_source.html');
  if (fs.existsSync(sourcePath)) {
    extractImageUrls(fs.readFileSync(sourcePath, 'utf8')).forEach((u) => allUrls.add(u));
  }

  // Crawl pages
  const pages = await crawlSitemapUrls();
  console.log(`Escaneando ${pages.length} páginas...`);

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    try {
      process.stdout.write(`\r  [${i + 1}/${pages.length}] ${page.slice(0, 60).padEnd(60)}`);
      const html = await fetchText(page);
      extractImageUrls(html).forEach((u) => allUrls.add(u));
    } catch {
      /* skip failed page */
    }
  }
  console.log('\n');

  return [...allUrls];
}

async function main() {
  console.log('=== Descarga COMPLETA de medios FraXplorer ===\n');

  const imageUrls = await collectAllImageUrls();
  console.log(`Encontradas ${imageUrls.length} imágenes únicas\n`);

  const manifest = { images: [], video: null };
  let ok = 0;
  let fail = 0;
  let skipped = 0;

  for (const url of imageUrls) {
    const filename = decodeURIComponent(url.split('/').pop());
    const dest = path.join(IMAGES_DIR, filename);
    const entry = { url, filename, local: `/images/${filename}` };

    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      manifest.images.push(entry);
      skipped++;
      continue;
    }

    try {
      process.stdout.write(`IMG ${filename.slice(0, 50).padEnd(50)} `);
      await download(url, dest);
      manifest.images.push(entry);
      console.log('OK');
      ok++;
    } catch (e) {
      console.log('FAIL:', e.message);
      fail++;
    }
  }

  // Hero video
  const videoDest = path.join(VIDEOS_DIR, 'hero.mp4');
  if (!fs.existsSync(videoDest) || fs.statSync(videoDest).size === 0) {
    try {
      process.stdout.write('VIDEO hero.mp4... ');
      await download(HERO_VIDEO_URL, videoDest);
      console.log('OK');
      manifest.video = { url: HERO_VIDEO_URL, local: '/videos/hero.mp4' };
    } catch (e) {
      console.log('FAIL:', e.message);
    }
  } else {
    manifest.video = { url: HERO_VIDEO_URL, local: '/videos/hero.mp4' };
    console.log('VIDEO hero.mp4 ya existe');
  }

  fs.writeFileSync(MEDIA_MANIFEST, JSON.stringify(manifest, null, 2));

  console.log('\n=== RESUMEN ===');
  console.log(`Imágenes descargadas: ${ok}`);
  console.log(`Ya existían:         ${skipped}`);
  console.log(`Fallidas:            ${fail}`);
  console.log(`Total local:         ${manifest.images.length}`);
  console.log(`Carpeta:             public/images/`);
  console.log(`Manifiesto:          scripts/media-manifest.json`);
}

main().catch(console.error);
