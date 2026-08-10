const https = require('https');
const fs = require('fs');
const path = require('path');

function fetch(url, follow = 0) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml',
          },
        },
        (res) => {
          if ((res.statusCode === 301 || res.statusCode === 302) && follow < 5) {
            return fetch(res.headers.location, follow + 1).then(resolve).catch(reject);
          }
          let data = '';
          res.on('data', (c) => (data += c));
          res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
        }
      )
      .on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(dest);
        });
      })
      .on('error', reject);
  });
}

async function main() {
  const pageId = '61577758311529';
  const urls = [
    `https://www.facebook.com/profile.php?id=${pageId}`,
    `https://graph.facebook.com/${pageId}/picture?type=large&redirect=0`,
  ];

  for (const url of urls) {
    console.log('\nTrying:', url);
    const { data } = await fetch(url);
    const og = data.match(/property="og:image" content="([^"]+)"/);
    if (og) console.log('og:image:', og[1].slice(0, 120));

    const covers = [
      ...data.matchAll(/"cover_photo":\{[^}]*"photo":\{[^}]*"image":\{"uri":"([^"]+)"/g),
      ...data.matchAll(/"uri":"(https:\\\/\\\/scontent[^"]+)"/g),
    ];
    console.log('cover matches:', covers.length);
    covers.slice(0, 3).forEach((m) => console.log(JSON.parse('"' + m[1] + '"').slice(0, 150)));
  }

  // Try direct cover endpoint patterns
  const coverTry = await fetch(
    `https://graph.facebook.com/${pageId}?fields=cover,picture&access_token=`
  ).catch(() => null);
  if (coverTry) console.log('graph:', coverTry.data.slice(0, 300));
}

main().catch(console.error);
