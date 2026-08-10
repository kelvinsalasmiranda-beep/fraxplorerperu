const fs = require('fs');
const path = require('path');

/**
 * Prepara el build estático para desplegar en Hostinger.
 * Copia el contenido de /out a /deploy para subir vía Git o FTP.
 */
const outDir = path.join(__dirname, '..', 'out');
const deployDir = path.join(__dirname, '..', 'deploy');

if (!fs.existsSync(outDir)) {
  console.error('Error: Ejecuta "npm run build" primero.');
  process.exit(1);
}

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

if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true });
}
copyRecursive(outDir, deployDir);

console.log('✓ Deploy listo en /deploy');
console.log('  Sube el contenido de /deploy a public_html en Hostinger');
