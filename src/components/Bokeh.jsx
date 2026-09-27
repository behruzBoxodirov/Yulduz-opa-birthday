import { range, spread } from '../lib/random'

const COUNT = 12
const TINTS = ['255,214,140', '255,180,200', '198,170,255', '255,240,200']

/**
 * Soft out-of-focus bokeh orbs. Blurred, slow, and very translucent — they read
 * as lens light rather than shapes.
 */
export default function Bokeh() {
  const orbs = spread(COUNT, 31415926, (rng, i) => {
    const size = range(rng, 9, 26)
    return {
      key: i,
      size,
      left: `${range(rng, -6, 94)}%`,
      top: `${range(rng, -4, 96)}%`,
      tint: TINTS[Math.floor(rng() * TINTS.length)],
      opacity: range(rng, 0.12, 0.34),
      dur: range(rng, 22, 40),
      delay: range(rng, -32, 0),
    }
  })

  return (
    <div className="absolute inset-0 overflow-hidden">
      {orbs.map((o) => (
        <span
          key={o.key}
          className="anim-drift absolute rounded-full will-change-transform"
          style={{
            left: o.left,
            top: o.top,
            width: `${o.size}vw`,
            height: `${o.size}vw`,
            opacity: o.opacity,
            background: `radial-gradient(circle at 38% 34%, rgba(${o.tint},0.85) 0%, rgba(${o.tint},0.28) 42%, transparent 68%)`,
            filter: `blur(${Math.round(o.size * 0.9)}px)`,
            boxShadow: `0 0 ${o.size * 3}vw rgba(${o.tint},0.22)`,
            '--dur': `${o.dur}s`,
            '--delay': `${o.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
