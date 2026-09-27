import { range, spread } from '../lib/random'

/**
 * One delicate balloon: soft body gradient, specular highlight, knot and a
 * long curved string. Drawn rather than animated in 2D CSS so the highlight
 * stays put while the whole balloon drifts.
 */
function Balloon({ hue, size, rest, amp, dur, delay, flip, glow }) {
  const uid = `b-${hue.replace('#', '')}-${rest}`
  return (
    <div
      className="anim-sway absolute will-change-transform"
      style={{
        '--dur': `${dur}s`,
        '--delay': `${delay}s`,
        '--rest': `${rest}deg`,
        '--amp': `${amp}deg`,
        transform: flip ? 'scaleX(-1)' : undefined,
      }}
    >
      <svg
        viewBox="0 0 70 160"
        width={size}
        height={size * (160 / 70)}
        style={{ filter: `drop-shadow(0 0 ${Math.round(size * 0.34)}px ${glow})` }}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id={`${uid}-body`} cx="34%" cy="26%" r="78%">
            <stop offset="0%" stopColor="#fffaf2" stopOpacity="0.95" />
            <stop offset="22%" stopColor={hue} stopOpacity="0.9" />
            <stop offset="72%" stopColor={hue} stopOpacity="0.62" />
            <stop offset="100%" stopColor="#3a1b4d" stopOpacity="0.75" />
          </radialGradient>
          <linearGradient id={`${uid}-gloss`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-string`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7cd80" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f7cd80" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* string */}
        <path
          d="M35 104 C 30 122, 41 132, 34 152"
          fill="none"
          stroke={`url(#${uid}-string)`}
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* body */}
        <path
          d="M35 4 C 54 4, 66 20, 66 40 C 66 62, 52 82, 39 96 C 37 99, 33 99, 31 96 C 18 82, 4 62, 4 40 C 4 20, 16 4, 35 4 Z"
          fill={`url(#${uid}-body)`}
        />
        {/* rim light */}
        <path
          d="M35 4 C 54 4, 66 20, 66 40 C 66 62, 52 82, 39 96"
          fill="none"
          stroke="#fff3d2"
          strokeOpacity="0.35"
          strokeWidth="1.2"
        />
        {/* highlight */}
        <ellipse cx="24" cy="28" rx="8" ry="13" fill={`url(#${uid}-gloss)`} transform="rotate(-18 24 28)" />
        <ellipse cx="48" cy="58" rx="4" ry="7" fill={`url(#${uid}-gloss)`} opacity="0.4" transform="rotate(-18 48 58)" />

        {/* knot */}
        <path d="M32 97 L38 97 L35 103 Z" fill="#f7cd80" opacity="0.8" />
      </svg>
    </div>
  )
}

/**
 * A few balloons drifting up the sides, well clear of the text column.
 * Fixed, so they stay as ambient scenery while the message scrolls.
 */
export default function Balloons() {
  const balloons = spread(4, 881122, (rng, i) => ({
    key: i,
    hue: ['#f0b7c9', '#e6c98a', '#cbb2ee', '#f2d3b0'][i],
    size: range(rng, 42, 62),
    rest: range(rng, -14, 14),
    amp: range(rng, 3, 7),
    dur: range(rng, 10, 17),
    delay: range(rng, -11, 0),
    flip: i % 2 === 1,
    glow: ['rgba(240,183,201,0.45)', 'rgba(230,201,138,0.42)', 'rgba(203,178,238,0.4)', 'rgba(242,211,176,0.4)'][i],
  }))

  const spots = [
    { top: '13%', left: '-4%' },
    { top: '30%', right: '-5%' },
    { bottom: '26%', left: '-6%' },
    { bottom: '9%', right: '-3%' },
  ]

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{ opacity: 0.72 }}
    >
      {balloons.map(({ key, ...b }, i) => (
        <div
          key={key}
          className="anim-float-up absolute"
          style={{ ...spots[i], '--dur': `${b.dur}s`, '--delay': `${b.delay}s`, '--sway': '8px' }}
        >
          <Balloon {...b} />
        </div>
      ))}
    </div>
  )
}
