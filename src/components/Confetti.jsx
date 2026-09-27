import { pick, range, spread } from '../lib/random'

const COLORS = ['#f7cd80', '#ffeec2', '#e8b45c', '#f7c8d8', '#d9c4f2', '#fff8e6']

/**
 * A single, very restrained rain of confetti. Narrow ribbons, low opacity,
 * slow — celebratory without ever becoming noisy behind the text.
 */
export default function Confetti() {
  const ribbons = spread(16, 602214, (rng, i) => ({
    key: i,
    left: `${range(rng, -2, 100)}%`,
    w: range(rng, 3, 7),
    h: range(rng, 9, 20),
    color: pick(rng, COLORS),
    dur: range(rng, 11, 20),
    delay: range(rng, -19, 0),
    drift: range(rng, -70, 70),
    spin: range(rng, 180, 540) * (rng() > 0.5 ? 1 : -1),
    round: rng() > 0.6,
  }))

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{ opacity: 0.4, maskImage: 'linear-gradient(180deg, #000 0%, transparent 78%)', WebkitMaskImage: 'linear-gradient(180deg, #000 0%, transparent 78%)' }}
    >
      {ribbons.map((r) => (
        <span
          key={r.key}
          className="absolute"
          style={{
            top: '-14vh',
            left: r.left,
            width: r.w,
            height: r.h,
            borderRadius: r.round ? '999px' : '2px',
            background: `linear-gradient(180deg, ${r.color}, ${r.color}44)`,
            boxShadow: `0 0 8px ${r.color}66`,
            animation: `ribbon-fall ${r.dur}s linear ${r.delay}s infinite`,
            '--drift': `${r.drift}px`,
            '--spin': `${r.spin}deg`,
          }}
        />
      ))}
    </div>
  )
}
