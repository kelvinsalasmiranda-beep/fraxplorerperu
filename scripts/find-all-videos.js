const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE = 'https://fraxplorerperu.com';
const OUT = path.join(__dirname, 'fb-videos-found.json');

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

async function discoverPages() {
  const slugs = [''];
  try {
    const xml = await fetch(`${SITE}/wp-sitemap-posts-page-1.xml`);
    for (const m of xml.matchAll(/<loc>https:\/\/fraxplorerperu\.com\/([^/<]*)\/<\/loc>/g)) {
      slugs.push(m[1] + '/');
    }
  } catch { /* ignore */ }
  return [...new Set(slugs)];
}

async function main() {
  const pages = await discoverPages();
  const videos = new Set();
  const fbLinks = new Set();

  for (const slug of pages.slice(0, 60)) {
    try {
      const html = await fetch(`${SITE}/${slug}`);
      for (const m of html.matchAll(/data-href="(https:\/\/www\.facebook\.com[^"]+)"/gi)) fbLinks.add(m[1]);
      for (const m of html.matchAll(/https:\/\/www\.facebook\.com\/[^"'\s<>]+\/videos\/[^"'\s<>]+/gi)) videos.add(m[0]);
      for (const m of html.matchAll(/https:\/\/fb\.watch\/[^"'\s<>]+/gi)) videos.add(m[0]);
      for (const m of html.matchAll(/https:\/\/www\.youtube\.com\/embed\/[^"'\s<>]+/gi)) videos.add(m[0]);
      for (const m of html.matchAll(/https:\/\/www\.youtube\.com\/watch\?v=[^"'\s<>]+/gi)) videos.add(m[0]);
    } catch { /* skip */ }
  }

  const result = { fbLinks: [...fbLinks], videos: [...videos], page: 'https://www.facebook.com/profile.php?id=61577758311529' };
  fs.writeFileSync(OUT, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
}

main();
