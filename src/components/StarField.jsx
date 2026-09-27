import { range, spread } from '../lib/random'

const COUNT = 78
const TINTS = ['255,246,224', '255,228,178', '214,196,255', '255,255,255']

/**
 * Twinkling star field. Each star is a soft radial dot; a few are upgraded to
 * four-point "diamond" sparkles built from two crossed gradient bars.
 */
export default function StarField() {
  const stars = spread(COUNT, 19970418, (rng, i) => {
    const isSparkle = rng() > 0.84
    const size = isSparkle ? range(rng, 13, 22) : range(rng, 1.6, 3.6)
    return {
      key: i,
      isSparkle,
      size,
      left: `${range(rng, 0, 100)}%`,
      top: `${range(rng, 0, 100)}%`,
      tint: TINTS[Math.floor(rng() * TINTS.length)],
      dur: range(rng, 4.5, 11),
      delay: range(rng, -9, 0),
      peak: range(rng, 0.5, 1),
    }
  })

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((s) =>
        s.isSparkle ? (
          <span
            key={s.key}
            className="anim-twinkle absolute"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              '--dur': `${s.dur}s`,
              '--delay': `${s.delay}s`,
            }}
          >
            <span
              className="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 -translate-y-1/2"
              style={{
                background: `linear-gradient(180deg, transparent, rgba(${s.tint},0.95), transparent)`,
                boxShadow: `0 0 8px rgba(${s.tint},0.7)`,
              }}
            />
            <span
              className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${s.tint},0.95), transparent)`,
                boxShadow: `0 0 8px rgba(${s.tint},0.7)`,
              }}
            />
          </span>
        ) : (
          <span
            key={s.key}
            className="anim-twinkle absolute rounded-full"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              background: `radial-gradient(circle, rgba(${s.tint},1) 0%, rgba(${s.tint},0.45) 45%, transparent 72%)`,
              boxShadow: `0 0 ${s.size * 3}px rgba(${s.tint},0.55)`,
              '--dur': `${s.dur}s`,
              '--delay': `${s.delay}s`,
            }}
          />
        ),
      )}
    </div>
  )
}
