const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const dir = path.join(__dirname, '..', 'public', 'images', 'web')
const MAX = 1800
const QUALITY = 78
const MIN_BYTES = 800 * 1024

async function run() {
  const files = fs.readdirSync(dir).filter((name) => /\.(jpe?g|png)$/i.test(name) && !name.includes('.tmp.'))
  let saved = 0

  for (const name of files) {
    const file = path.join(dir, name)
    const before = fs.statSync(file).size
    if (before < MIN_BYTES) continue

    const outName = path.extname(name).toLowerCase() === '.png' ? name.replace(/\.png$/i, '.jpg') : name
    const out = path.join(dir, outName)
    const buffer = await sharp(file)
      .rotate()
      .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer()

    if (buffer.length < before || outName !== name) {
      try {
        fs.writeFileSync(out, buffer)
        if (outName !== name) fs.unlinkSync(file)
        saved += before - buffer.length
        console.log(`compressed ${name} -> ${outName} (${Math.round(before / 1024)}k -> ${Math.round(buffer.length / 1024)}k)`)
      } catch (error) {
        console.warn(`skipped ${name}: ${error.code || error.message}`)
      }
    }
  }

  console.log(`saved ~${Math.round(saved / 1024 / 1024)} MB`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
