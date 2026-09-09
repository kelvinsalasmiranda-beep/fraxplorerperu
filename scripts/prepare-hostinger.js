const fs = require('fs');
const path = require('path');

/**
 * Prepara el build estático para desplegar en Hostinger.
 * Copia /out → /deploy y genera .htaccess con redirects 301.
 */
const outDir = path.join(__dirname, '..', 'out');
const deployDir = path.join(__dirname, '..', 'deploy');

/** Slug legacy → slug canónico (alineado con nav live) */
const TOUR_REDIRECTS = {
  'inca-trip-7d-6n': 'peru-aventura-total-7d-6n',
  'inca-trip-8d-7n': 'peru-aventura-total-8d-7n',
  'inca-trip-9d-8n': 'peru-aventura-total-9d-8n',
  'inca-trip-10d-9n': 'peru-aventura-total-10d-9n',
  'ausangate-7-lagunas-donhill-1-dia': 'ausangate-7-lagunas-downhill-1-dia',
};

function copyRecursive(src, dest) {
  if (fs.statSync(src).isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function writeRedirectHtml(deployRoot, fromSlug, toSlug) {
  const dir = path.join(deployRoot, 'tours', fromSlug);
  fs.mkdirSync(dir, { recursive: true });
  const target = `/tours/${toSlug}/`;
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="refresh" content="0;url=${target}" />
  <link rel="canonical" href="${target}" />
  <script>location.replace('${target}');</script>
  <title>Redirigiendo…</title>
</head>
<body><p><a href="${target}">Continuar al tour</a></p></body>
</html>`;
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
}

function writeHtaccess(deployRoot) {
  const lines = [
    '# FraXplorer Perú — redirects de slugs legacy',
    'RewriteEngine On',
    '',
  ];

  for (const [from, to] of Object.entries(TOUR_REDIRECTS)) {
    lines.push(`Redirect 301 /tours/${from}/ /tours/${to}/`);
    lines.push(`Redirect 301 /tours/${from} /tours/${to}/`);
  }

  fs.writeFileSync(path.join(deployRoot, '.htaccess'), lines.join('\n') + '\n', 'utf8');
}

if (!fs.existsSync(outDir)) {
  console.error('Error: Ejecuta "npm run build" primero.');
  process.exit(1);
}

if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true });
}
copyRecursive(outDir, deployDir);

writeHtaccess(deployDir);
for (const [from, to] of Object.entries(TOUR_REDIRECTS)) {
  writeRedirectHtml(deployDir, from, to);
}

console.log('✓ Deploy listo en /deploy');
console.log(`✓ ${Object.keys(TOUR_REDIRECTS).length} redirects (.htaccess + HTML fallback)`);
console.log('  Sube el contenido de /deploy a public_html en Hostinger');
