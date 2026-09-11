const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT = path.join(__dirname, '..', 'public', 'images', 'web');
fs.mkdirSync(OUT, { recursive: true });

const SEARCHES = {
  humantay: 'Laguna Humantay Peru',
  colores: 'Vinicunca Rainbow Mountain Cusco',
  palcoyo: 'Palcoyo Peru',
  pallay: 'Pallay Punchu Peru',
  valle: 'Pisac Sacred Valley Peru',
  maras: 'Salineras de Maras Peru',
  moray: 'Moray Peru circular terraces',
  cusco: 'Cusco historic center Peru',
  ballestas: 'Islas Ballestas Paracas',
  huacachina: 'Huacachina Ica Peru',
  titicaca: 'Uros Lake Titicaca Peru',
  uyuni: 'Salar de Uyuni',
  lima: 'Miraflores Lima Peru',
  machupicchu: 'Machu Picchu citadel Peru',
  ausangate: 'Ausangate mountain Peru',
  waqrapukara: 'Waqrapukara Peru',
  qelccaya: 'Quelccaya glacier Peru',
  salkantay: 'Salkantay trek Peru',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent': 'FraXplorerPeruBot/1.0 (https://fraxplorerperu.com; tour gallery photos)',
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
          return reject(new Error(`${res.statusCode}`));
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

async function searchCommons(query, limit = 10) {
  const url =
    'https://commons.wikimedia.org/w/api.php?' +
    new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: `filetype:bitmap ${query}`,
      gsrnamespace: '6',
      gsrlimit: String(limit),
      prop: 'imageinfo',
      iiprop: 'url|mime|size',
      iiurlwidth: '2560',
      format: 'json',
    });
  const data = await getJson(url);
  const pages = data.query?.pages ? Object.values(data.query.pages) : [];
  return pages
    .map((p) => {
      const info = p.imageinfo?.[0];
      if (!info || !String(info.mime || '').startsWith('image/')) return null;
      if (String(info.mime).includes('svg')) return null;
      return info.thumburl || info.url;
    })
    .filter(Boolean);
}

(async () => {
  const index = {};
  for (const [key, query] of Object.entries(SEARCHES)) {
    console.log('search', key);
    await sleep(600);
    let urls = [];
    try {
      urls = await searchCommons(query, 10);
    } catch (e) {
      console.log('  fail', e.message);
      continue;
    }
    index[key] = [];
    let n = 0;
    for (const url of urls) {
      n += 1;
      const ext = /\.png/i.test(url) ? 'png' : 'jpg';
      if (ext === 'png') continue;
      const name = `${key}-hq-${n}.jpg`;
      const dest = path.join(OUT, name);
      await sleep(350);
      try {
        await download(url, dest);
        const size = fs.statSync(dest).size;
        if (size < 20000 || size > 2800000) {
          fs.unlinkSync(dest);
          console.log('  skip size', name, Math.round(size / 1024) + 'kb');
          continue;
        }
        index[key].push(`/images/web/${name}`);
        console.log('  ok', name, Math.round(size / 1024) + 'kb');
        if (index[key].length >= 8) break;
      } catch (e) {
        console.log('  skip', e.message);
      }
    }
  }
  fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(index, null, 2));
  console.log('done');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
