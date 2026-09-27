import { range, spread } from '../lib/random'

const BLOBS = [
  { size: 62, top: '-14%', left: '-22%', color: 'rgba(126,74,190,0.42)' },
  { size: 58, top: '2%', left: '62%', color: 'rgba(232,180,92,0.26)' },
  { size: 74, top: '38%', left: '-26%', color: 'rgba(214,120,168,0.26)' },
  { size: 66, top: '54%', left: '58%', color: 'rgba(88,64,180,0.34)' },
  { size: 80, top: '80%', left: '10%', color: 'rgba(255,205,130,0.20)' },
]

/**
 * Five huge, heavily-blurred colour clouds that drift on a 40s+ loop.
 * Purely atmospheric — creates the slow "living light" of the background.
 */
export default function Aurora() {
  const blobs = spread(BLOBS.length, 20260927, (rng, i) => {
    const base = BLOBS[i]
    return {
      ...base,
      dur: range(rng, 34, 52),
      delay: range(rng, -30, 0),
    }
  })

  return (
    <div className="absolute inset-0">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="anim-drift absolute rounded-full will-change-transform"
          style={{
            top: blob.top,
            left: blob.left,
            width: `${blob.size}vw`,
            height: `${blob.size}vw`,
            background: `radial-gradient(circle at 42% 38%, ${blob.color} 0%, transparent 68%)`,
            filter: 'blur(38px)',
            '--dur': `${blob.dur}s`,
            '--delay': `${blob.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
