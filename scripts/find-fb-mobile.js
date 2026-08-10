const https = require('https');

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)' } }, (res) => {
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
  const url = 'https://m.facebook.com/profile.php?id=61577758311529&v=videos';
  const html = await fetchText(url);
  const vids = [...html.matchAll(/\/watch\/\?v=(\d+)/g)].map((m) => m[1]);
  const reels = [...html.matchAll(/\/reel\/(\d+)/g)].map((m) => m[1]);
  const posts = [...html.matchAll(/story_fbid=(\d+)/g)].map((m) => m[1]);
  console.log('watch ids:', [...new Set(vids)].slice(0, 10));
  console.log('reels:', [...new Set(reels)].slice(0, 10));
  console.log('story_fbid:', [...new Set(posts)].slice(0, 10));
  console.log('html length', html.length);
}

main().catch(console.error);
