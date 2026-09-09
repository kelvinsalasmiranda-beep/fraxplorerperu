/** Download live-site gallery images for Cusco en un día tours */
const fs = require('fs');
const https = require('https');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'images');
const BASE = 'https://fraxplorerperu.com/wp-content/uploads';

const FILES = [
  '2025/12/Sin-titulo--768x1024.jpg',
  '2025/12/Sin-titulo-2-768x1024.jpg',
  '2025/12/Sin-titulo-3-2-768x1024.jpg',
  '2025/12/Sin-titulo-4-768x1024.jpg',
  '2025/12/Sin-titulo-1-1-838x1024.jpg',
  '2025/12/Sin-titulo-2-1-838x1024.jpg',
  '2025/12/Sin-titulo-3-3-838x1024.jpg',
  '2025/12/Sin-titulo-5-838x1024.jpg',
  '2025/12/Sin-titulo-6-838x1024.jpg',
  '2025/12/Sin-titulo-1-2-838x1024.jpg',
  '2025/12/Sin-titulo-2-2-838x1024.jpg',
  '2025/12/Sin-titulo-3-4-838x1024.jpg',
  '2025/12/Sin-titulo-4-1-838x1024.jpg',
  '2025/12/Sin-titulo-5-1-838x1024.jpg',
  '2025/09/778218d7d4252d82475ec90875f51531-819x1024.jpg',
  '2025/09/778218d7d4252d82475ec90875f51531-1-819x1024.jpg',
];

function dl(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
      console.log('skip', path.basename(dest));
      return resolve();
    }
    const req = https.get(
      url,
      { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://fraxplorerperu.com/' } },
      (res) => {
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
      }
    );
    req.on('error', (e) => {
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
