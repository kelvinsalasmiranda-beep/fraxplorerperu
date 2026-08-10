const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const html = await fetch('https://fraxplorerperu.com/');
  const patterns = [
    /https?:\/\/[^"'\s<>]*facebook[^"'\s<>]*/gi,
    /https?:\/\/[^"'\s<>]*fb\.watch[^"'\s<>]*/gi,
    /https?:\/\/[^"'\s<>]*youtube[^"'\s<>]*/gi,
    /data-href="([^"]+)"/gi,
    /fb-video[^>]*data-href="([^"]+)"/gi,
  ];
  const found = new Set();
  for (const p of patterns) {
    for (const m of html.matchAll(p)) {
      found.add(m[1] || m[0]);
    }
  }
  console.log([...found].join('\n'));
}

main().catch(console.error);
