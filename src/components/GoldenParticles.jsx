import { range, spread } from '../lib/random'

const COUNT = 26
const TINTS = ['255,222,150', '255,240,205', '255,200,120', '255,255,255']

/**
 * Golden motes drifting upward through the whole page. They start below the
 * fold and rise out of the top, so the card feels like it sits inside a
 * continuous column of light.
 */
export default function GoldenParticles() {
  const motes = spread(COUNT, 77700012, (rng, i) => {
    const isGlint = rng() > 0.78
    const size = isGlint ? range(rng, 9, 16) : range(rng, 2, 5)
    return {
      key: i,
      isGlint,
      size,
      left: `${range(rng, 1, 99)}%`,
      tint: TINTS[Math.floor(rng() * TINTS.length)],
      dur: range(rng, 15, 30),
      delay: range(rng, -28, 0),
      sway: range(rng, -32, 32),
      peak: range(rng, 0.4, 0.9),
    }
  })

  return (
    <div className="absolute inset-0 overflow-hidden">
      {motes.map((m) =>
        m.isGlint ? (
          <span
            key={m.key}
            className="anim-rise absolute"
            style={{
              left: m.left,
              bottom: '-10vh',
              width: m.size,
              height: m.size,
              '--dur': `${m.dur}s`,
              '--delay': `${m.delay}s`,
              '--sway': `${m.sway}px`,
              '--peak': m.peak,
            }}
          >
            <span
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${m.tint},0.9), transparent)`,
              }}
            />
            <span
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent, rgba(${m.tint},0.9), transparent)`,
              }}
            />
          </span>
        ) : (
          <span
            key={m.key}
            className="anim-rise absolute rounded-full"
            style={{
              left: m.left,
              bottom: '-10vh',
              width: m.size,
              height: m.size,
              background: `radial-gradient(circle, rgba(${m.tint},1) 0%, rgba(${m.tint},0.5) 48%, transparent 74%)`,
              boxShadow: `0 0 ${m.size * 3.4}px rgba(${m.tint},0.7)`,
              '--dur': `${m.dur}s`,
              '--delay': `${m.delay}s`,
              '--sway': `${m.sway}px`,
              '--peak': m.peak,
            }}
          />
        ),
      )}
    </div>
  )
}
