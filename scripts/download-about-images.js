const https = require('https');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'images', 'about');

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
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) return reject(new Error(`${res.statusCode} ${url}`));
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', reject);
  });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const pages = [
    'https://fraxplorerperu.com/sobre-nosotros/',
    'https://fraxplorerperu.com/',
  ];

  const all = new Set();
  for (const page of pages) {
    const html = await fetchText(page);
    for (const m of html.matchAll(/https:\/\/fraxplorerperu\.com\/wp-content\/uploads\/[^"'\\s)]+/gi)) {
      all.add(m[0].split('?')[0].replace(/\\u0026/g, '&'));
    }
    for (const m of html.matchAll(/url\(([^)]+)\)/gi)) {
      const u = m[1].replace(/['"]/g, '');
      if (u.includes('wp-content/uploads')) all.add(u.split('?')[0]);
    }
  }

  const list = [...all].filter(
    (u) =>
      /\.(jpe?g|png|webp)$/i.test(u) &&
      !/logo|cropped-FRAX|32x32|192x192|pagos/i.test(u)
  );

  console.log('Found', list.length, 'images');
  list.slice(0, 12).forEach((u) => console.log(u));

  const picks = list.filter((u) => /FraXplorer|portada|equipo|team|about|nosotros|scaled|1024|1536|1920/i.test(u));
  const toDownload = picks.length ? picks.slice(0, 6) : list.slice(0, 6);

  for (let i = 0; i < toDownload.length; i++) {
    const url = toDownload[i];
    const name = decodeURIComponent(url.split('/').pop());
    const dest = path.join(OUT, name);
    try {
      process.stdout.write(`Downloading ${name}... `);
      await download(url, dest);
      console.log('OK');
    } catch (e) {
      console.log('FAIL', e.message);
    }
  }
}

main().catch(console.error);
