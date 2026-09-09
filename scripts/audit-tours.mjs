import fs from 'fs';
import path from 'path';

const root = 'c:/YOGER/fraxplorerperu';

const site = fs.readFileSync(path.join(root, 'src/data/site.ts'), 'utf8');
const es = fs.readFileSync(path.join(root, 'src/i18n/es.ts'), 'utf8');
const navData = fs.readFileSync(path.join(root, 'src/i18n/nav-data.ts'), 'utf8');

const siteNavSlugs = [...new Set([...site.matchAll(/href: '\/tours\/([^']+)'/g)].map((m) => m[1].replace(/\/$/, '')))].sort();
const esNavSlugs = [...new Set([...es.matchAll(/href: H\.(\w+)/g)].map((m) => {
  const key = m[1];
  const re = new RegExp(`${key}: '([^']+)'`);
  const match = navData.match(re);
  return match ? match[1].replace(/^\/tours\//, '').replace(/\/$/, '') : null;
}).filter(Boolean))].sort();

const scraped = JSON.parse(fs.readFileSync(path.join(root, 'src/data/tours-scraped.json')));
const imgs = JSON.parse(fs.readFileSync(path.join(root, 'src/data/tour-images.generated.json')));
const pdfTs = fs.readFileSync(path.join(root, 'src/data/tours-pdf-content.ts'), 'utf8');
const pdfCustomMatch = pdfTs.match(/PDF_CUSTOM_TOUR_SLUGS = \[([\s\S]*?)\]/);
const pdfCustomSlugs = [...pdfCustomMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
const pdfContentSlugs = [...pdfTs.matchAll(/^\s+'([a-z0-9-]+)': \{/gm)].map((m) => m[1]);

const toursTs = fs.readFileSync(path.join(root, 'src/data/tours.ts'), 'utf8');
const metaBlock = toursTs.split('const META')[1].split('};')[0];
const metaSlugs = [...metaBlock.matchAll(/'([^']+)':/g)].map((m) => m[1]);

const SUPER = {
  'peru-aventura-total-7d-6n': 'inca-trip-7d-6n',
  'peru-aventura-total-8d-7n': 'inca-trip-8d-7n',
  'peru-aventura-total-9d-8n': 'inca-trip-9d-8n',
  'peru-aventura-total-10d-9n': 'inca-trip-10d-9n',
  'peru-aventura-total-13d-12n': 'inca-trip-10d-9n',
};

const map = Object.fromEntries(scraped.map((t) => [t.slug, t]));
const isLogo = (i) => /logo|cropped-FRAX|cropped-LOGO|favicon|pagos|portada\.jpg/i.test(i || '');

function audit(slug) {
  const src = SUPER[slug] || slug;
  const raw = map[src] || map[slug];
  const hero = (imgs[slug] || imgs[src])?.hero;
  const inPdfCustom = pdfCustomSlugs.includes(slug);
  const inPdfContent = pdfContentSlugs.includes(slug);
  const pdfBlock = pdfTs.includes(`'${slug}': {`);
  return {
    slug,
    src,
    hasRaw: !!raw,
    inPdfCustom,
    inPdfContent,
    hero: hero || null,
    heroOk: !!(hero && !isLogo(hero)),
    itinScraped: raw?.itinerary?.length || 0,
    price: raw?.price || null,
    title: raw?.title || null,
    category: raw?.category || null,
    inMeta: metaSlugs.includes(slug) || metaSlugs.includes(src),
  };
}

const allCheckSlugs = [...new Set([...siteNavSlugs, ...esNavSlugs, ...scraped.map((t) => t.slug), ...pdfCustomSlugs])].sort();

console.log(JSON.stringify({
  counts: { siteNav: siteNavSlugs.length, esNav: esNavSlugs.length, scraped: scraped.length, pdfCustom: pdfCustomSlugs.length, pdfContent: pdfContentSlugs.length },
  navDiff: {
    onlyInSite: siteNavSlugs.filter((s) => !esNavSlugs.includes(s)),
    onlyInEs: esNavSlugs.filter((s) => !siteNavSlugs.includes(s)),
  },
  navAudit: allCheckSlugs.map(audit),
  missingFromData: allCheckSlugs.map(audit).filter((r) => !r.hasRaw && !r.inPdfCustom),
  emptyItinerary: allCheckSlugs.map(audit).filter((r) => r.itinScraped === 0 && !r.inPdfCustom && !r.inPdfContent),
  badHero: allCheckSlugs.map(audit).filter((r) => !r.heroOk),
  scrapedSlugs: scraped.map((t) => t.slug),
}, null, 2));
