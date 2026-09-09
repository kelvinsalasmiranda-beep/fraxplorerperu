/** Download live-site gallery images for Camino Inca tours */
const fs = require('fs');
const https = require('https');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'images');
const BASE = 'https://fraxplorerperu.com/wp-content/uploads';

const PAGES = [
  'camino-inca-machupicchu-2d-1n',
  'camino-inca-4d-3n',
  'salkantay-trek-machupicchu-5d-4n',
];

const FILES = [
  '2025/08/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
  '2025/08/pexels-gilmar-santos-1157205006-22717159-scaled.jpg',
  '2025/08/pexels-janonovoa-16756521-scaled.jpg',
  '2025/08/Sin-titulo-1-2-866x1024.jpg',
  '2025/08/Sin-titulo-2-7-866x1024.jpg',
  '2025/08/Sin-titulo-3-2-866x1024.jpg',
  '2025/08/Sin-titulo-4-2-866x1024.jpg',
  '2025/08/Sin-titulo-4-2-768x908.jpg',
  '2025/08/Sin-titulo-2-7-768x908.jpg',
  '2025/08/Sin-titulo-1-5-768x908.jpg',
  '2025/08/Sin-titulo-2-10-768x908.jpg',
  '2025/08/Sin-titulo-3-4-768x908.jpg',
  '2025/08/tulo-1-768x908.jpg',
  '2025/08/Sin-tit1-768x908.jpg',
  '2025/08/Sin-titulo-2-6-768x908.jpg',
  '2025/07/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
  '2025/07/712069dd3e031f7431963927bded8f28.jpg',
];

function fetchHtml(url) {
  return new Promise((resolve) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve(data));
      })
      .on('error', () => resolve(''));
  });
}

function dl(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
      console.log('skip', path.basename(dest));
      return resolve(true);
    }
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://fraxplorerperu.com/' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return dl(res.headers.location, dest).then(resolve);
        }
        if (res.statusCode !== 200) {
          console.log('fail', path.basename(dest), res.statusCode);
          res.resume();
          return resolve(false);
        }
        const ws = fs.createWriteStream(dest);
        res.pipe(ws);
        ws.on('finish', () => {
          console.log('ok', path.basename(dest));
          resolve(true);
        });
      })
      .on('error', (e) => {
        console.log('err', path.basename(dest), e.message);
        resolve(false);
      });
  });
}

(async () => {
  const found = new Set(FILES.map((f) => f.split('/').pop()));

  for (const slug of PAGES) {
    const html = await fetchHtml(`https://fraxplorerperu.com/${slug}/`);
    const re = /wp-content\/uploads\/(\d{4}\/\d{2}\/[^"'\s>]+\.(?:jpg|jpeg|png|webp))/gi;
    let m;
    while ((m = re.exec(html))) {
      const rel = m[1];
      if (!/logo|cropped|pagos|icon/i.test(rel)) found.add(rel.split('/').pop());
      FILES.push(rel);
    }
  }

  const unique = [...new Set(FILES)];
  for (const rel of unique) {
    const name = rel.split('/').pop();
    await dl(`${BASE}/${rel}`, path.join(OUT, name));
    if (!fs.existsSync(path.join(OUT, name)) || fs.statSync(path.join(OUT, name)).size < 5000) {
      const alt = rel.replace('/2025/08/', '/2025/07/').replace('/2025/12/', '/2025/08/');
      if (alt !== rel) await dl(`${BASE}/${alt}`, path.join(OUT, name));
    }
  }
})();
