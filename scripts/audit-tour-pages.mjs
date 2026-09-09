/** HTTP audit: todas las páginas /tours/[slug]/ en dev o estático */
import fs from 'fs';
import http from 'http';
import path from 'path';

const root = path.join(import.meta.dirname, '..');
const scraped = JSON.parse(fs.readFileSync(path.join(root, 'src/data/tours-scraped.json')));
const pdfTs = fs.readFileSync(path.join(root, 'src/data/tours-pdf-content.ts'), 'utf8');
const pdfCustom = [...pdfTs.match(/PDF_CUSTOM_TOUR_SLUGS = \[([\s\S]*?)\]/)[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
const SKIP = new Set([
  'tour-en-cusco', 'machupicchu', 'paquetes', 'camino-inca',
  'salkantay-y-otros', 'otros-destinos', 'machu-picchu-full-day',
]);

const slugs = [
  ...new Set([
    ...scraped.map((t) => t.slug).filter((s) => !SKIP.has(s)),
    ...pdfCustom,
  ]),
].sort();

const port = Number(process.argv[2] || 3002);

function fetchSlug(slug) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/tours/${slug}/`, (res) => {
      let body = '';
      res.on('data', (c) => { body += c; });
      res.on('end', () => {
        resolve({
          slug,
          status: res.statusCode,
          internalError: body.includes('Internal Server Error'),
          notFound: /Tour no encontrado|404|not-found/i.test(body.slice(0, 2000)),
          hasTitle: body.includes('<h1'),
        });
      });
    });
    req.on('error', (e) => resolve({ slug, error: e.message }));
    req.setTimeout(15000, () => {
      req.destroy();
      resolve({ slug, error: 'timeout' });
    });
  });
}

const results = [];
for (let i = 0; i < slugs.length; i += 8) {
  const batch = await Promise.all(slugs.slice(i, i + 8).map(fetchSlug));
  results.push(...batch);
}

const bad = results.filter(
  (r) => r.error || r.status !== 200 || r.internalError || !r.hasTitle
);

console.log(JSON.stringify({ port, total: slugs.length, ok: slugs.length - bad.length, bad }, null, 2));
