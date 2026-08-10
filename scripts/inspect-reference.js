const https = require('https');
const fs = require('fs');

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

async function main() {
  const html = await fetchText('https://miproximohogar.com.pe/venta/terreno-chinchero-cusco-26');
  const idx = html.indexOf('video-lightbox');
  fs.writeFileSync('scripts/reference-video-snippet.html', html.slice(idx, idx + 8000));
  const cards = [...html.matchAll(/data-embed="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, '&'));
  console.log('embeds:', cards);
}

main().catch(console.error);
