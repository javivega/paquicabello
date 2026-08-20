import fs from 'node:fs'
import sharp from 'sharp'

const source = fs.existsSync('src/img/hero-portrait.webp')
  ? 'src/img/hero-portrait.webp'
  : 'public/images/hero-portrait.webp'

fs.mkdirSync('public/images', { recursive: true })

async function writeWebp(input, width, outPath) {
  const buf = await sharp(input)
    .resize(width, width, { fit: 'cover', position: 'centre' })
    .webp({ quality: 76, effort: 6 })
    .toBuffer()
  fs.writeFileSync(outPath, buf)
}

// Lighthouse paints ~708px on mobile; 800w default + 1120w for larger DPR.
await writeWebp(source, 800, 'public/images/hero-portrait.webp')
await writeWebp(source, 1120, 'public/images/hero-portrait-1120.webp')

try {
  fs.copyFileSync(
    'public/images/hero-portrait.webp',
    'src/img/hero-portrait.webp',
  )
} catch (err) {
  console.warn('Could not sync src/img/hero-portrait.webp:', err.message)
}

/** Slot CSS size → encode at ~2× for retina without overshooting Lighthouse. */
const logos = [
  ['animalnature', 210],
  ['creciendoentreperros', 140],
  ['dieresis', 172],
  ['edogtorial', 126],
  ['logo', 214],
]

for (const [name, width] of logos) {
  const candidates = [
    `src/img/Servicios/${name}.webp`,
    `src/img/Servicios/${name}.png`,
  ]
  const input = candidates.find((p) => fs.existsSync(p))
  if (!input) {
    console.warn('Missing logo source:', name)
    continue
  }
  const out = `src/img/Servicios/${name}.webp`
  const buf = await sharp(input)
    .resize(width, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80, alphaQuality: 90, effort: 6 })
    .toBuffer()
  fs.writeFileSync(out, buf)
}

const check = [
  'public/images/hero-portrait.webp',
  'public/images/hero-portrait-1120.webp',
  ...logos.map(([n]) => `src/img/Servicios/${n}.webp`),
]

for (const f of check) {
  if (!fs.existsSync(f)) continue
  const m = await sharp(f).metadata()
  const kb = (fs.statSync(f).size / 1024).toFixed(1)
  console.log(f, `${m.width}x${m.height}`, `${kb}KB`)
}
