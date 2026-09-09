/** Download live-site gallery images for Súper Paquetes */
const fs = require('fs');
const https = require('https');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'images');
const BASE = 'https://fraxplorerperu.com/wp-content/uploads';

const FILES = [
  '2025/08/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
  '2025/08/Sin-titulo-3-6-768x908.jpg',
  '2025/08/Sin-titulo-4-7-768x908.jpg',
  '2025/08/Sin-titulo-6-1-768x908.jpg',
  '2025/08/Sin-titulo-7-768x908.jpg',
  '2025/08/Sin-titulo-4-6-768x908.jpg',
  '2025/08/Sin-titulo-7-1-768x908.jpg',
  '2025/08/Sin-titulo-6-2-768x908.jpg',
  '2025/08/Sin-titulo-3-768x922.jpg',
  '2025/08/Sin-titulo-2-11-768x908.jpg',
  '2025/08/Sin-titulo-3-5-768x908.jpg',
  '2025/08/Sin-titulo-3-4-768x908.jpg',
  '2025/08/Sin-titulo-1-6-866x1024.jpg',
  '2025/08/Sin-titulo-2-11-866x1024.jpg',
  '2025/08/Sin-titulo-3-5-866x1024.jpg',
  '2025/08/Sin-titulo-4-6-866x1024.jpg',
  '2025/08/Sin-titulo-5-6-866x1024.jpg',
];

function dl(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
      console.log('skip', path.basename(dest));
      return resolve();
    }
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://fraxplorerperu.com/' } }, (res) => {
        if (res.statusCode !== 200) {
          console.log('fail', path.basename(dest), res.statusCode);
          res.resume();
          return resolve();
        }
        const ws = fs.createWriteStream(dest);
        res.pipe(ws);
        ws.on('finish', () => {
          console.log('ok', path.basename(dest));
          resolve();
        });
      })
      .on('error', (e) => {
        console.log('err', path.basename(dest), e.message);
        resolve();
      });
  });
}

(async () => {
  for (const rel of FILES) {
    const name = rel.split('/').pop();
    await dl(`${BASE}/${rel}`, path.join(OUT, name));
  }
})();
