import fs from 'node:fs'
import sharp from 'sharp'

const heroBuf = await sharp('src/img/hero-portrait.webp')
  .resize(1120, 1120, { fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 78, effort: 6 })
  .toBuffer()

fs.mkdirSync('public/images', { recursive: true })
fs.writeFileSync('public/images/hero-portrait.webp', heroBuf)
try {
  fs.writeFileSync('src/img/hero-portrait.webp', heroBuf)
} catch (err) {
  console.warn('Could not overwrite src/img/hero-portrait.webp:', err.message)
  console.warn('Using public/images/hero-portrait.webp as canonical source.')
}

const logos = [
  ['animalnature', 210],
  ['creciendoentreperros', 254],
  ['dieresis', 172],
  ['edogtorial', 126],
  ['logo', 214],
]

for (const [name, width] of logos) {
  const out = `src/img/Servicios/${name}.webp`
  await sharp(`src/img/Servicios/${name}.png`)
    .resize(width, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(out)
}

const check = [
  'public/images/hero-portrait.webp',
  'src/img/hero-portrait.webp',
  ...logos.map(([n]) => `src/img/Servicios/${n}.webp`),
]

for (const f of check) {
  if (!fs.existsSync(f)) continue
  const m = await sharp(f).metadata()
  const kb = (fs.statSync(f).size / 1024).toFixed(1)
  console.log(f, `${m.width}x${m.height}`, `${kb}KB`)
}
