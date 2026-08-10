const https = require('https');

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
  const html = await fetchText('https://fraxplorerperu.com/');
  const fb = [...html.matchAll(/https:\/\/www\.facebook\.com\/[^"'\s<>]+/g)].map((m) => m[0]);
  const tt = [...html.matchAll(/https:\/\/www\.tiktok\.com\/[^"'\s<>]+/g)].map((m) => m[0]);
  console.log('FB:', [...new Set(fb)].slice(0, 20));
  console.log('TT:', [...new Set(tt)].slice(0, 20));
}

main().catch(console.error);
