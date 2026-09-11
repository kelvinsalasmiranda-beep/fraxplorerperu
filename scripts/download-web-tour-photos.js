const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT = path.join(__dirname, '..', 'public', 'images', 'web');
fs.mkdirSync(OUT, { recursive: true });

const SEARCHES = {
  humantay: 'Laguna Humantay Peru',
  colores: 'Vinicunca Rainbow Mountain Peru',
  palcoyo: 'Palcoyo mountain Peru',
  valle: 'Sacred Valley Pisac Peru',
  maras: 'Maras salt mines Peru',
  cusco: 'Cusco Plaza de Armas Peru',
  ballestas: 'Islas Ballestas Paracas Peru',
  huacachina: 'Huacachina oasis Peru',
  titicaca: 'Lake Titicaca Uros Peru',
  uyuni: 'Salar de Uyuni Bolivia',
  lima: 'Lima Peru coast Malecon',
  machupicchu: 'Machu Picchu Peru',
};

function getJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent': 'FraXplorerPeruBot/1.0 (https://fraxplorerperu.com; photos for tour galleries)',
            Accept: 'application/json',
          },
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            return getJson(new URL(res.headers.location, url).toString()).then(resolve).catch(reject);
          }
          const chunks = [];
          res.on('data', (c) => chunks.push(c));
          res.on('end', () => {
            try {
              resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
            } catch (e) {
              reject(e);
            }
          });
        }
      )
      .on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { 'User-Agent': 'FraXplorerPeruBot/1.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          if (fs.existsSync(dest)) fs.unlinkSync(dest);
          return download(new URL(res.headers.location, url).toString(), dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          if (fs.existsSync(dest)) fs.unlinkSync(dest);
          return reject(new Error(`${res.statusCode} ${url}`));
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

async function searchCommons(query, limit = 8) {
  const url =
    'https://commons.wikimedia.org/w/api.php?' +
    new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: `filetype:bitmap ${query}`,
      gsrnamespace: '6',
      gsrlimit: String(limit),
      prop: 'imageinfo',
      iiprop: 'url|mime',
      iiurlwidth: '1400',
      format: 'json',
    });
  const data = await getJson(url);
  const pages = data.query?.pages ? Object.values(data.query.pages) : [];
  return pages
    .map((p) => {
      const info = p.imageinfo?.[0];
      if (!info) return null;
      const mime = info.mime || '';
      if (!mime.startsWith('image/')) return null;
      return info.thumburl || info.url;
    })
    .filter(Boolean);
}

(async () => {
  const index = {};
  for (const [key, query] of Object.entries(SEARCHES)) {
    console.log('search', key, query);
    let urls = [];
    try {
      urls = await searchCommons(query, 8);
    } catch (e) {
      console.log('  fail', e.message);
      continue;
    }
    index[key] = [];
    let n = 0;
    for (const url of urls) {
      n += 1;
      const ext = url.includes('.png') ? 'png' : 'jpg';
      const name = `${key}-${n}.${ext}`;
      const dest = path.join(OUT, name);
      try {
        await download(url, dest);
        const size = fs.statSync(dest).size;
        if (size < 8000) {
          fs.unlinkSync(dest);
          console.log('  skip tiny', name);
          continue;
        }
        index[key].push(`/images/web/${name}`);
        console.log('  ok', name, Math.round(size / 1024) + 'kb');
      } catch (e) {
        console.log('  skip', e.message);
      }
    }
  }
  fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(index, null, 2));
  console.log('done', index);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
