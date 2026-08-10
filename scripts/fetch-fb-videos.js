const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
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
  const page = 'https://www.facebook.com/profile.php?id=61577758311529/videos';
  try {
    const html = await fetch(page);
    const patterns = [
      /https:\/\/www\.facebook\.com\/[^"\\]+?\/videos\/\d+/g,
      /https:\/\/www\.facebook\.com\/watch\/\?v=\d+/g,
      /"video_id":"(\d+)"/g,
      /\/videos\/(\d{10,})/g,
    ];
    const found = new Set();
    for (const p of patterns) {
      for (const m of html.matchAll(p)) {
        found.add(m[0].startsWith('http') ? m[0] : `https://www.facebook.com/watch/?v=${m[1]}`);
      }
    }
    console.log('Found', found.size, 'videos');
    [...found].slice(0, 10).forEach((v) => console.log(v));
  } catch (e) {
    console.error(e.message);
  }
}

main();
