const https = require('https');

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchText(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const html = await fetchText('https://fraxplorerperu.com/sobre-nosotros/');
  const imgs = [...html.matchAll(/https?:\/\/[^"'\s<>]*wp-content\/uploads[^"'\s<>]+/gi)].map((m) =>
    m[0].split('?')[0]
  );
  console.log([...new Set(imgs)].join('\n'));
}

main().catch(console.error);
