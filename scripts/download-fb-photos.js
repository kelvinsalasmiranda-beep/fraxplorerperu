/**
 * Descarga fotos públicas de la página Facebook de FraXplorer Perú
 * y las guarda en public/images/fb/ para asignarlas a tours.
 *
 * Uso: node scripts/download-fb-photos.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const PAGE_ID = '61577758311529';
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'fb');
const MANIFEST = path.join(__dirname, 'fb-photos-manifest.json');

function fetchText(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml',
            'Accept-Language': 'es-PE,es;q=0.9',
          },
        },
        (res) => {
          if ((res.statusCode === 301 || res.statusCode === 302) && redirects < 8) {
            const next = res.headers.location.startsWith('http')
              ? res.headers.location
              : `https://www.facebook.com${res.headers.location}`;
            return fetchText(next, redirects + 1).then(resolve).catch(reject);
          }
          let data = '';
          res.on('data', (c) => (data += c));
          res.on('end', () => resolve(data));
        }
      )
      .on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : require('http');
    proto
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if ((res.statusCode === 301 || res.statusCode === 302) && res.headers.location) {
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(dest);
        });
      })
      .on('error', reject);
  });
}

function decodeUri(s) {
  try {
    return JSON.parse(`"${s.replace(/"/g, '\\"')}"`);
  } catch {
    return s.replace(/\\u0026/g, '&').replace(/\\\/\//g, '//').replace(/&amp;/g, '&');
  }
}

function extractUrls(html) {
  const patterns = [
    /https:\\\/\\\/[^"'\s<>]+(?:scontent|fbcdn)[^"'\s<>]+\\\.(?:jpg|jpeg|png|webp)/gi,
    /https:\/\/[^"'\s<>]+(?:scontent|fbcdn)[^"'\s<>]+\.(?:jpg|jpeg|png|webp)/gi,
  ];
  const found = new Set();
  for (const re of patterns) {
    for (const m of html.matchAll(re)) {
      found.add(decodeUri(m[0]));
    }
  }
  return [...found];
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const urls = [
    `https://www.facebook.com/profile.php?id=${PAGE_ID}&sk=photos`,
    `https://m.facebook.com/profile.php?id=${PAGE_ID}&sk=photos`,
    `https://www.facebook.com/profile.php?id=${PAGE_ID}`,
  ];

  const all = new Set();
  for (const page of urls) {
    console.log('Fetching', page);
    try {
      const html = await fetchText(page);
      const imgs = extractUrls(html);
      console.log('  found', imgs.length);
      imgs.forEach((u) => all.add(u));
    } catch (e) {
      console.log('  error', e.message);
    }
  }

  const list = [...all].slice(0, 40);
  console.log('\nDownloading up to', list.length, 'images...');

  const manifest = [];
  for (let i = 0; i < list.length; i++) {
    const url = list[i];
    const ext = url.match(/\.(jpe?g|png|webp)/i)?.[1] || 'jpg';
    const filename = `fb-${String(i + 1).padStart(2, '0')}.${ext.replace('jpeg', 'jpg')}`;
    const dest = path.join(OUT_DIR, filename);
    try {
      process.stdout.write(`${filename}... `);
      await download(url, dest);
      console.log('OK');
      manifest.push({ filename, url, local: `/images/fb/${filename}` });
    } catch (e) {
      console.log('FAIL', e.message);
    }
  }

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log('\nSaved manifest:', MANIFEST);
  console.log('Done:', manifest.length, 'photos');
}

main().catch(console.error);
