import fs from 'fs';
import path from 'path';

const root = 'c:/YOGER/fraxplorerperu';
const es = fs.readFileSync(path.join(root, 'src/i18n/es.ts'), 'utf8');
const navData = fs.readFileSync(path.join(root, 'src/i18n/nav-data.ts'), 'utf8');
const pdfTs = fs.readFileSync(path.join(root, 'src/data/tours-pdf-content.ts'), 'utf8');
const audit = JSON.parse(fs.readFileSync(path.join(root, 'scripts/audit-output.json'), 'utf8'));

const esNavSlugs = [...new Set([...es.matchAll(/href: H\.(\w+)/g)].map((m) => {
  const key = m[1];
  const re = new RegExp(`${key}: '([^']+)'`);
  const match = navData.match(re);
  return match ? match[1].replace(/^\/tours\//, '').replace(/\/$/, '') : null;
}).filter(Boolean))];

const pdfSlugs = new Set([...pdfTs.matchAll(/^\s+'([a-z0-9-]+)': \{/gm)].map((m) => m[1]));
const bySlug = Object.fromEntries(audit.navAudit.map((a) => [a.slug, a]));

const rows = esNavSlugs.map((slug) => {
  const a = bySlug[slug] || {};
  const hasPdf = pdfSlugs.has(slug);
  const hasContent = hasPdf || a.inPdfCustom || (a.itinScraped > 0);
  return {
    slug,
    hasPdf,
    hasContent,
    heroOk: a.heroOk,
    price: a.price,
    title: a.title,
    itin: a.itinScraped,
    status: hasPdf || a.inPdfCustom ? 'COMPLETE' : hasContent ? 'PARTIAL' : 'MISSING',
  };
});

console.log('ES NAV STATUS:');
rows.forEach((r) => console.log(`${r.status.padEnd(10)} | ${r.slug}`));

console.log('\nINCOMPLETE (no PDF, empty scraped itinerary):');
rows.filter((r) => r.status !== 'COMPLETE' && r.itin === 0).forEach((r) => console.log(`- ${r.slug}`));

console.log('\nNO HERO:');
rows.filter((r) => !r.heroOk).forEach((r) => console.log(`- ${r.slug}`));

console.log('\nNO PRICE in scraped:');
rows.filter((r) => !r.price && !hasPdfPrice(r.slug)).forEach((r) => console.log(`- ${r.slug}`));

function hasPdfPrice(slug) {
  const block = pdfTs.split(`'${slug}': {`)[1];
  if (!block) return false;
  return /price: '\$/.test(block.split('},')[0]);
}
