/** Download live-site images for EXPLORA + Huaynapicchu tours */
const fs = require('fs');
const https = require('https');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'images');
const BASE = 'https://fraxplorerperu.com/wp-content/uploads';

const FILES = [
  '2025/08/pexels-d-a-28-2148748679-33539819-scaled.jpg',
  '2025/08/pexels-d-a-28-2148748679-scaled.jpg',
  '2025/08/d3d030bd37c8d7dddf9c37a12baa6d5f.jpg',
  '2025/08/4775f8d4a5a0b1d656387d205add3157-225x300.jpg',
  '2025/08/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
  '2025/08/pexels-gilmar-santos-1157205006-22717159-1024x768.jpg',
  '2025/08/pexels-willianjusten-30929499-scaled.jpg',
  '2025/08/pexels-ivan-vizcarra-572790796-16931550-1536x1024.jpg',
  '2025/08/pexels-efrem-efre-2786187-33850121-1536x1024.jpg',
];

function dl(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
      console.log('skip', path.basename(dest));
      return resolve(true);
    }
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://fraxplorerperu.com/' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          res.resume();
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
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(path.join(OUT, 'tours'), { recursive: true });

  for (const rel of FILES) {
    const name = rel.split('/').pop();
    await dl(`${BASE}/${rel}`, path.join(OUT, name));
  }

  // Pexels fallback for Lima cooking workshop (live page 404)
  const cookingDest = path.join(OUT, 'tours', 'taller-cocina-lima.jpg');
  if (!fs.existsSync(cookingDest)) {
    await dl(
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1280',
      cookingDest
    );
  }

  // Pexels fallback for Maras downhill (live page empty)
  const downhillDest = path.join(OUT, 'tours', 'maras-moray-downhill.jpg');
  if (!fs.existsSync(downhillDest)) {
    await dl(
      'https://images.pexels.com/photos/3601424/pexels-photo-3601424.jpeg?auto=compress&cs=tinysrgb&w=1280',
      downhillDest
    );
  }
})();
