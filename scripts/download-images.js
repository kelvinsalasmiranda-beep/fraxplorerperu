const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'images-manifest.json'), 'utf8')
);

const ESSENTIAL = new Set([
  'cropped-FRAXPLORER-scaled-1-113x68.png',
  'cropped-FRAXPLORER-scaled-1-1024x620.png',
  'cropped-LOGO-WEB-192x192.png',
  'utopia-beach-hotels_1523_TC_BOTB_mustard_winner-gif_LL_2024.gif',
  '03-worlds-leading-cultural-destination-2021-peru.png',
  '3-icono.png',
  'Sin-titulo-1.jpg',
  '1-icono.png',
  '4-icono.png',
  'frax3-768x1024.jpg',
  'Siitulo-2-922x1024.jpg',
  'maaaaaaaaaaae-810x1024.jpg',
  'pexels-marcio-arias-811024542-19988408-819x1024.jpg',
  'e53f4f0c17099254dc58c70b1309e3df-819x1024.jpg',
  '1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
  'Sin-titu-2-922x1024.jpg',
  'pexels-susan-flores-232226967-33423804-681x1024.jpg',
  'Sin-titul-2.jpg',
  'Sin-titulo-55.jpg',
  'Sin-titulo-2-2.jpg',
  'Sin-titulo-5.jpg',
  'Sin-titulo-9.jpg',
  'Sin-titulo-6.jpg',
  '11-768x853.jpg',
  'Sin-lo-2-768x853.jpg',
  'Sino-2-768x853.jpg',
  'Sin-tilo-2-768x853.jpg',
  'Sin-tio-2-768x853.jpg',
  'Sin-titulo-2-3-768x853.jpg',
  'Sin-ttulo-2-768x853.jpg',
  'Situlo-2-768x853.jpg',
  'Sin-ti-2-Recuperado-768x853.jpg',
  'Sin-titulo-2-Recuperado-768x853.jpg',
  'Sin-titulo-2-Recurado-768x853.jpg',
  'Sin-titulo-2-Rrado-768x853.jpg',
  'Sito-2-768x853.jpg',
  'Sin-titulo-2-4-768x853.jpg',
  'Sin-titulo-2-Recuperado-1-768x853.jpg',
  'Sin-titulo-2-Rrado-1-768x853.jpg',
  'Sin-tulo-2-Recuperado-768x853.jpg',
  'Sn-titulo-2-Recuperado-768x853.jpg',
  'lagunaab-768x1024.jpg',
  'palcoyoo-1.jpg',
  'hucachina6-819x1024.jpg',
  'd5c317e89f5b1e24573d6410a9a7ec8f.jpg',
  '33098cd0a441c619cc416a8f67180f21.jpg',
  'Imagen-de-WhatsApp-2025-08-21-a-las-00.03.14_889f3aad.jpg',
  'Imagen-de-WhatsApp-2025-08-21-a-las-00.20.44_638e999d.jpg',
  'Imagen-de-WhatsApp-2025-08-21-a-las-00.26.36_f739ad7c.jpg',
  'Imagen-de-WhatsApp-2025-08-21-a-las-00.31.39_2d83e2f3.jpg',
  'Imagen-de-WhatsApp-2025-08-21-a-las-00.34.49_9380b644.jpg',
  'portada.jpg',
  'WTTC_sello_seguro-1024x569.jpg',
  'protegeme-turismo-responsable.webp',
  'pagos-1-1536x473-4-1024x315.png',
  'FraXplorerPeru.jpg',
  'pexels-joanavittoria-2193392-scaled.jpg',
  'pexels-sergei-a-1322276-2539417-1536x1022.jpg',
]);

const outDir = path.join(__dirname, '..', 'public', 'images');
fs.mkdirSync(outDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    proto
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          fs.unlinkSync(dest);
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(`${url} => ${res.statusCode}`));
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', (err) => {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        reject(err);
      });
  });
}

async function main() {
  const toDownload = manifest.filter((m) => ESSENTIAL.has(m.filename));
  let ok = 0;
  let fail = 0;
  for (const item of toDownload) {
    const dest = path.join(outDir, item.filename);
    if (fs.existsSync(dest)) {
      ok++;
      continue;
    }
    try {
      process.stdout.write(`Downloading ${item.filename}... `);
      await download(item.url, dest);
      console.log('OK');
      ok++;
    } catch (e) {
      console.log('FAIL:', e.message);
      fail++;
    }
  }
  console.log(`\nDone: ${ok} ok, ${fail} failed`);
}

main();
