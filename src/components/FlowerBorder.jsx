import Flower from './Flower'
import { range, spread } from '../lib/random'

/**
 * A gold botanical sprig — thin stem, small leaves, a single bud.
 * Purely ornamental line work.
 */
function Sprig({ flip = false, size = 90, style, className = '' }) {
  return (
    <svg
      viewBox="0 0 60 100"
      width={size}
      height={size * (100 / 60)}
      className={className}
      style={{ ...style, transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="sprig-stroke" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#a87322" stopOpacity="0.15" />
          <stop offset="55%" stopColor="#e8b45c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff3d2" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="sprig-bud" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#fff6de" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#f7cd80" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#cf9436" stopOpacity="0.1" />
        </radialGradient>
      </defs>

      <path
        d="M30 100 C 22 74, 40 56, 30 26"
        fill="none"
        stroke="url(#sprig-stroke)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {[
        { x: 24, y: 78, r: -34 },
        { x: 37, y: 66, r: 26 },
        { x: 24, y: 52, r: -30 },
        { x: 36, y: 40, r: 24 },
      ].map((leaf, i) => (
        <ellipse
          key={i}
          cx={leaf.x}
          cy={leaf.y}
          rx="7.5"
          ry="3.4"
          fill="url(#sprig-stroke)"
          opacity="0.5"
          transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`}
        />
      ))}
      <circle cx="30" cy="20" r="10" fill="url(#sprig-bud)" opacity="0.9" />
      <circle cx="30" cy="20" r="4.2" fill="#fff3d2" opacity="0.55" />
    </svg>
  )
}

/**
 * Blossoms and gold sprigs hugging the edges of the frame. They sway gently
 * and fade toward the screen edges so they feel like they are growing in
 * from outside the composition.
 */
export default function FlowerBorder() {
  const blooms = spread(7, 5200121, (rng, i) => {
    const variants = ['rose', 'blush', 'lilac']
    return {
      key: i,
      variant: variants[Math.floor(rng() * variants.length)],
      size: range(rng, 58, 132),
      dur: range(rng, 11, 19),
      delay: range(rng, -12, 0),
      rest: range(rng, -22, 22),
      amp: range(rng, 2.5, 6),
      opacity: range(rng, 0.4, 0.78),
    }
  })

  const spots = [
    { top: '-3%', left: '-9%' },
    { top: '1%', right: '-11%' },
    { top: '34%', left: '-13%' },
    { top: '44%', right: '-14%' },
    { bottom: '16%', left: '-11%' },
    { bottom: '4%', right: '-9%' },
    { bottom: '2%', left: '6%' },
  ]

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{
        maskImage: 'radial-gradient(122% 92% at 50% 50%, #000 52%, transparent 92%)',
        WebkitMaskImage: 'radial-gradient(122% 92% at 50% 50%, #000 52%, transparent 92%)',
      }}
    >
      {blooms.map((b, i) => (
        <div
          key={b.key}
          className="anim-sway absolute will-change-transform"
          style={{
            ...spots[i],
            '--dur': `${b.dur}s`,
            '--delay': `${b.delay}s`,
            '--rest': `${b.rest}deg`,
            '--amp': `${b.amp}deg`,
          }}
        >
          <div style={{ opacity: b.opacity }}>
            <Flower variant={b.variant} size={b.size} spin={i} />
          </div>
        </div>
      ))}

      <div
        className="anim-sway absolute top-[16%] right-[2%] opacity-70"
        style={{ '--dur': '17s', '--delay': '-4s', '--rest': '14deg', '--amp': '4deg' }}
      >
        <Sprig size={54} />
      </div>
      <div
        className="anim-sway absolute bottom-[22%] left-[1%] opacity-60"
        style={{ '--dur': '20s', '--delay': '-9s', '--rest': '-16deg', '--amp': '5deg' }}
      >
        <Sprig flip size={44} />
      </div>
    </div>
  )
}
