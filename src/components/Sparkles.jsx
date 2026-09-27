import { range, spread } from '../lib/random'

/**
 * Four-point sparkles that pop and fade on staggered loops. Used sparingly
 * around the name and the cake so the eye always has a couple of live glints.
 */
export default function Sparkles({ count = 7, className = '', seed = 4410 }) {
  const glints = spread(count, seed, (rng, i) => ({
    key: i,
    left: `${range(rng, 2, 98)}%`,
    top: `${range(rng, 2, 98)}%`,
    size: range(rng, 9, 20),
    dur: range(rng, 3.4, 6.5),
    delay: range(rng, -6, 0),
    tint: rng() > 0.5 ? '255,240,205' : '255,255,255',
  }))

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {glints.map((g) => (
        <span
          key={g.key}
          className="absolute"
          style={{
            left: g.left,
            top: g.top,
            width: g.size,
            height: g.size,
            animation: `sparkle-pop ${g.dur} cubic-bezier(0.22, 1, 0.36, 1) ${g.delay}s infinite`,
          }}
        >
          <span
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
            style={{
              background: `linear-gradient(180deg, transparent, rgba(${g.tint},0.95) 50%, transparent)`,
              boxShadow: `0 0 10px rgba(${g.tint},0.85)`,
            }}
          />
          <span
            className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(${g.tint},0.95) 50%, transparent)`,
              boxShadow: `0 0 10px rgba(${g.tint},0.85)`,
            }}
          />
        </span>
      ))}
    </div>
  )
}
