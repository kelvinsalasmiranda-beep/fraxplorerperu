const https = require('https');

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            Accept: 'text/html',
          },
        },
        (res) => {
          if (res.statusCode === 301 || res.statusCode === 302) {
            return fetchText(res.headers.location).then(resolve).catch(reject);
          }
          let data = '';
          res.on('data', (c) => (data += c));
          res.on('end', () => resolve(data));
        }
      )
      .on('error', reject);
  });
}

async function main() {
  const urls = [
    'https://www.facebook.com/profile.php?id=61577758311529',
    'https://m.facebook.com/profile.php?id=61577758311529',
    'https://fraxplorerperu.com/sobre-nosotros/',
    'https://fraxplorerperu.com/',
  ];

  for (const url of urls) {
    console.log('\n===', url, '===');
    try {
      const html = await fetchText(url);
      const imgs = [
        ...html.matchAll(/https:\/\/[^"'\s<>]+(?:scontent|fbcdn)[^"'\s<>]+\.(?:jpg|png|webp)/gi),
      ].map((m) => m[0].replace(/\\u0026/g, '&').replace(/&amp;/g, '&'));
      const unique = [...new Set(imgs)].slice(0, 15);
      console.log('CDN images:', unique.length);
      unique.forEach((u) => console.log(u.slice(0, 120) + '...'));
      const cover = html.match(/"cover_photo":\{[^}]*"photo":\{[^}]*"image":\{"uri":"([^"]+)"/);
      if (cover) console.log('Cover:', cover[1].slice(0, 120));
    } catch (e) {
      console.log('Error:', e.message);
    }
  }
}

main().catch(console.error);
