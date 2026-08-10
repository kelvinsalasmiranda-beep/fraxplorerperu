const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', '_source.html'), 'utf8');
const regex = /https:\/\/fraxplorerperu\.com\/wp-content\/uploads\/[^"'\s)]+/g;
const matches = html.match(regex) || [];

const urls = [...new Set(matches.map((u) => u.split('?')[0]))];
const outDir = path.join(__dirname, '..', 'public', 'images');
fs.mkdirSync(outDir, { recursive: true });

const manifest = urls.map((url) => {
  const filename = url.split('/').pop();
  return { url, filename, local: `/images/${filename}` };
});

fs.writeFileSync(path.join(__dirname, 'images-manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`Found ${manifest.length} unique images`);
manifest.forEach((m) => console.log(m.filename));
