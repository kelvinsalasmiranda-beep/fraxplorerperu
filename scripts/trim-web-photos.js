const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const WEB = path.join(ROOT, 'public', 'images', 'web');

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const srcText = walk(SRC)
  .filter((f) => /\.(ts|tsx|js|jsx)$/.test(f))
  .map((f) => fs.readFileSync(f, 'utf8'))
  .join('\n');

const used = new Set();
for (const m of srcText.matchAll(/\/images\/web\/([A-Za-z0-9._-]+)/g)) {
  used.add(m[1]);
}

let removed = 0;
let kept = 0;
for (const file of fs.readdirSync(WEB)) {
  const full = path.join(WEB, file);
  if (!fs.statSync(full).isFile()) continue;
  if (used.has(file)) {
    kept += 1;
    continue;
  }
  fs.unlinkSync(full);
  removed += 1;
  console.log('removed', file);
}
console.log({ kept, removed, used: used.size });
