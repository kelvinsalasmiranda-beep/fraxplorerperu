const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE = 'https://fraxplorerperu.com';
const OUT = path.join(__dirname, '..', 'src', 'data', 'tours-scraped.json');

const EXTRA_SLUGS = [
  'inca-trip-8d-7n',
  'inca-trip-9d-8n',
  'valle-sagrado-full-day',
];

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

function decodeHtml(text) {
  return text
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/\\"/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripTags(html) {
  return decodeHtml(html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ' '));
}

function extractListItems(html) {
  const items = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
  return items.map(stripTags).filter((t) => t.length > 3);
}

function extractImages(html) {
  const regex = /https?:\/\/fraxplorerperu\.com\/wp-content\/uploads\/[^"'\s)]+/gi;
  return [...new Set((html.match(regex) || []).map((u) => {
    const filename = decodeURIComponent(u.split('?')[0].split('/').pop());
    return `/images/${filename}`;
  }))].filter((img) => /\.(jpe?g|png|gif|webp|avif)$/i.test(img));
}

function extractH2Sections(html) {
  const content =
    html.match(/class="entry-content[\s\S]*?itemprop="text"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/article>/i)?.[1]
    || html.match(/data-elementor-type="wp-page"[\s\S]*?<div class="entry-content[^"]*"[^>]*>([\s\S]*?)<footer/i)?.[1]
    || html.match(/<main[\s\S]*?<\/main>/i)?.[0]
    || html;

  const sections = [];
  const parts = content.split(/<h2[^>]*>/i).slice(1);
  for (const part of parts) {
    const titleEnd = part.indexOf('</h2>');
    if (titleEnd === -1) continue;
    const title = stripTags(part.slice(0, titleEnd));
    const body = part.slice(titleEnd + 5);
    const nextH2 = body.search(/<h2[^>]*>/i);
    const sectionHtml = nextH2 === -1 ? body : body.slice(0, nextH2);
    sections.push({ title, html: sectionHtml });
  }
  return sections;
}

function extractParagraphs(html) {
  return (html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [])
    .map(stripTags)
    .filter((t) => t.length > 25 && !/cookie|whatsapp|reservar ahora/i.test(t));
}

function extractH3Itinerary(html) {
  const days = [];
  const parts = html.split(/<h3[^>]*>/i).slice(1);
  for (const part of parts) {
    const end = part.indexOf('</h3>');
    if (end === -1) continue;
    const title = stripTags(part.slice(0, end));
    if (!/d[ií]a\s*\d+/i.test(title)) continue;
    const body = part.slice(end + 5);
    const next = body.search(/<h[23][^>]*>/i);
    const sectionHtml = next === -1 ? body : body.slice(0, next);
    const content = extractParagraphs(sectionHtml).join('\n\n') || stripTags(sectionHtml);
    if (content.length < 15) continue;
    days.push({
      day: title.match(/d[ií]a\s*\d+/i)?.[0] || title,
      title,
      content,
    });
  }
  return days;
}

function extractItinerary(sections, html) {
  const days = [];

  for (const section of sections) {
    if (!/d[ií]a\s*\d+/i.test(section.title)) continue;
    const content = extractParagraphs(section.html).join('\n\n') || stripTags(section.html);
    if (content.length < 20) continue;
    days.push({
      day: section.title.match(/d[ií]a\s*\d+/i)?.[0] || section.title,
      title: section.title,
      content,
    });
  }

  if (days.length === 0) {
    return extractH3Itinerary(html);
  }
  return days;
}

function extractAccordionSection(html, titlePattern) {
  const summaryRegex = /<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)(?=<details|<summary)/gi;
  let match;
  while ((match = summaryRegex.exec(html))) {
    const title = stripTags(match[1]);
    if (titlePattern.test(title)) {
      return extractListItems(match[2].slice(0, 20000));
    }
  }
  return [];
}

function extractMetaField(html, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `${escaped}\\s*<\\/h2>[\\s\\S]{0,800}?<p[^>]*>([^<]+)<\\/p>`,
    'i',
  );
  const m = html.match(pattern);
  if (m?.[1]) return stripTags(m[1]);
  return null;
}

function findSection(sections, ...patterns) {
  return sections.find((s) => patterns.some((p) => p.test(s.title)));
}

function extractTour(html, slug) {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  let title = titleMatch ? decodeHtml(titleMatch[1]).replace(/\s*[|\-–].*Fraxplorer.*/i, '').trim() : slug;

  const ogDesc = html.match(/property="og:description"\s+content="([^"]+)"/i);
  const images = extractImages(html);
  const sections = extractH2Sections(html);

  const firstH2 = sections.find((s) =>
    s.title.length > 10 &&
    !/navegaci|clientes|opinion|footer|tipo de tour|dificultad|duraci|detalle|d[ií]a\s*\d+/i.test(s.title),
  );
  const intro = firstH2 ? extractParagraphs(firstH2.html).slice(0, 3) : extractParagraphs(html).slice(0, 3);

  const detailsSec = findSection(sections, /^detalles del tour/i, /detalle/i, /paquete/i);
  const highlights = detailsSec ? extractListItems(detailsSec.html) : [];
  const detailParagraphs = detailsSec ? extractParagraphs(detailsSec.html) : [];

  const includes = extractAccordionSection(html, /^✅?\s*INCLUYE$/i);
  const excludes = extractAccordionSection(html, /^❌?\s*NO\s*INCLUYE$/i);
  const recommendations = extractAccordionSection(html, /^RECOMENDACION/i);

  const recoSec = findSection(sections, /recomendaci/i);
  const recoFromH2 = recoSec ? extractListItems(recoSec.html) : [];

  const itinerary = extractItinerary(sections, html);
  const priceSec = findSection(sections, /precio/i, /reserva/i);

  const tourType = extractMetaField(html, 'TIPO DE TOUR') || extractMetaField(html, 'Tipo de tour');
  const difficulty = extractMetaField(html, 'NIVEL DE DIFICULTAD') || extractMetaField(html, 'Dificultad');
  const duration =
    extractMetaField(html, 'Duración del tour') ||
    extractMetaField(html, 'Duración') ||
    html.match(/(\d+\s*[Dd][ií]as?\s*\/\s*\d+\s*[Nn]oches?)/)?.[1] ||
    null;

  const priceMatch = (priceSec ? stripTags(priceSec.html) : stripTags(html)).match(/USD\s*\$?\s*[\d,.]+|\$\s*[\d,.]+/i);
  const price = priceMatch ? priceMatch[0].replace(/\s/g, '') : null;
  const priceNote = priceSec ? extractParagraphs(priceSec.html).join(' ') : null;

  const heroImage = images.find((img) => !/logo|icon|cropped-FRAX/i.test(img)) || '/images/portada.jpg';

  if (/página no encontrada/i.test(title)) {
    title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  const finalIncludes = includes.length
    ? includes
    : (findSection(sections, /^✅?\s*incluye$/i) ? extractListItems(findSection(sections, /^✅?\s*incluye$/i).html) : []);
  const finalExcludes = excludes.length
    ? excludes
    : (findSection(sections, /no incluye/i) ? extractListItems(findSection(sections, /no incluye/i).html) : []);

  return {
    slug,
    title,
    subtitle: firstH2?.title || null,
    description: ogDesc?.[1] || intro[0] || detailParagraphs[0] || '',
    intro,
    detailParagraphs,
    highlights: highlights.length ? highlights : detailParagraphs.slice(1, 8).filter((p) => p.length > 30),
    tourType,
    difficulty,
    duration,
    price,
    priceNote,
    itinerary,
    includes: finalIncludes,
    excludes: finalExcludes,
    recommendations: recommendations.length ? recommendations : recoFromH2,
    images: images.slice(0, 15),
    heroImage,
    category: guessCategory(slug),
  };
}

function guessCategory(slug) {
  if (slug.includes('inca-trip') || slug.includes('peru-aventura')) return 'Súper Paquetes';
  if (slug.includes('-d-') || slug.includes('-n')) return 'Paquetes Cusco';
  if (slug.includes('camino-inca') || slug.includes('salkantay') || slug.includes('jungle')) return 'Camino Inca';
  if (slug.includes('machu') || slug.includes('huayna')) return 'Machu Picchu';
  if (slug.includes('lima') || slug.includes('uyuni') || slug.includes('titicaca') || slug.includes('huacachina')) return 'Explora';
  return 'Cusco en un día';
}

async function discoverSlugs() {
  const slugs = new Set(EXTRA_SLUGS);
  try {
    const index = await fetch(`${SITE}/wp-sitemap-posts-page-1.xml`);
    const matches = [...index.matchAll(/<loc>https:\/\/fraxplorerperu\.com\/([^/<]+)\/<\/loc>/g)];
    matches.forEach((m) => {
      const s = m[1];
      if (s && !['wp-content', 'feed', 'comments'].includes(s)) slugs.add(s);
    });
  } catch { /* use defaults */ }

  [
    'city-tour-medio-dia', 'laguna-humantay-full-day', 'montana-de-colores-full-day',
    'machu-picchu-en-carro-desde-cusco', 'montana-palcoyo-full-day', 'glaciar-qelccaya-full-day',
    'waqrapukara-full-day', 'maras-y-moray-con-picnic-andino-full-day', 'valle-sagrado-full-day',
    'cusco-montana-de-colores-4d-3n', 'cusco-valle-sagrado-6d-5n', 'machupicchu-laguna-humantay-6d-5n',
    'maras-moray-valle-sagrado-5d-4n', 'tour-machu-picchu-full-day', 'valle-sagrado-machu-picchu',
    'huaynapicchu-machupicchu', 'camino-inca-machupicchu-2d-1n', 'camino-inca-4d-3n',
    'salkantay-trek-machupicchu-5d-4n', 'inca-jungle-trek-machupicchu-4d-3n',
    'taller-de-cocina-en-lima-1-dia', 'lago-titicaca-salar-de-uyuni-4-dias',
    'cusco-retiro-ayahuasca-1-dia', 'ausangate-7-lagunas-downhill-1-dia',
    'tour-maras-moray-downhill-medio-dia', 'picnic-andino-medio-dia',
    'huacachina-islas-ballestas-full-day', 'cuatrimotos-maras-moray-medio-dia',
    'salar-de-uyuni-5-dias-4-noches-desde-puno', 'peru-aventura-total-7d-6n',
    'peru-aventura-total-8d-7n', 'peru-aventura-total-10d-9n', 'peru-aventura-total-9d-8n',
    'peru-aventura-total-13d-12n', 'inca-trip-8d-7n',
  ].forEach((s) => slugs.add(s));

  return [...slugs].filter((s) => !['politicas', 'terminos', 'sobre'].some((x) => s.startsWith(x)));
}

async function main() {
  const slugs = await discoverSlugs();
  console.log(`Scraping ${slugs.length} tours...\n`);
  const tours = [];

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    process.stdout.write(`[${i + 1}/${slugs.length}] ${slug}... `);
    try {
      const html = await fetch(`${SITE}/${slug}/`);
      if (/página no encontrada|404/i.test(html) && html.length < 50000) {
        console.log('404 skip');
        continue;
      }
      const tour = extractTour(html, slug);
      tours.push(tour);
      console.log(`OK (${tour.itinerary.length} días, ${tour.includes.length} incl.)`);
    } catch (e) {
      console.log('FAIL', e.message);
    }
    await new Promise((r) => setTimeout(r, 250));
  }

  fs.writeFileSync(OUT, JSON.stringify(tours, null, 2));
  console.log(`\nSaved ${tours.length} tours`);
}

main();
