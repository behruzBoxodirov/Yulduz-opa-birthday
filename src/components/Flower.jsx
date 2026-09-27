const RING = {
  rose: { outer: 6, inner: 5, hue: ['#ffe6ef', '#f7c8d8', '#e79fb8'] },
  blush: { hue: ['#fff3e2', '#ffd9c2', '#f2b39b'] },
  lilac: { hue: ['#f2e8ff', '#d9c4f2', '#b498dd'] },
}

function Petals({ count, radius, rx, ry, fill, stroke, opacity, rotate = 0 }) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy={50 - radius}
          rx={rx}
          ry={ry}
          fill={fill}
          stroke={stroke}
          strokeWidth="0.6"
          strokeOpacity="0.5"
          opacity={opacity}
          transform={`rotate(${(360 / count) * i + rotate} 50 50)`}
        />
      ))}
    </g>
  )
}

/**
 * A layered, hand-drawn-looking bloom. Used as the floral language of the
 * frame — each placement varies size, variant and opacity so the border
 * never looks copy-pasted.
 */
export default function Flower({
  variant = 'rose',
  size = 96,
  className = '',
  style,
  spin = 0,
  glow = 0.5,
}) {
  const palette = RING[variant] ?? RING.rose
  const uid = `f-${variant}-${spin}`

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${uid}-core`} cx="50%" cy="46%" r="52%">
          <stop offset="0%" stopColor="#fff6de" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#f7cd80" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#cf9436" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe9b8" stopOpacity={glow * 0.5} />
          <stop offset="100%" stopColor="#ffe9b8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-petal`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.hue[0]} stopOpacity="0.95" />
          <stop offset="70%" stopColor={palette.hue[1]} stopOpacity="0.8" />
          <stop offset="100%" stopColor={palette.hue[2]} stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`${uid}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff3d2" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#e8b45c" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#a87322" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="50" r="49" fill={`url(#${uid}-halo)`} />

      {/* outer ring */}
      <Petals
        count={RING[variant]?.outer ?? 6}
        radius={26}
        rx={13}
        ry={25}
        fill={`url(#${uid}-petal)`}
        stroke="#f7cd80"
        opacity={0.72}
      />
      {/* inner ring, offset for a natural spiral */}
      <Petals
        count={RING[variant]?.inner ?? 5}
        radius={17}
        rx={10.5}
        ry={18}
        fill={`url(#${uid}-petal)`}
        stroke="#ffe6b0"
        opacity={0.9}
        rotate={18}
      />

      {/* gold stamen centre */}
      <circle cx="50" cy="50" r="11" fill={`url(#${uid}-core)`} />
      <circle cx="50" cy="50" r="6.5" fill="none" stroke={`url(#${uid}-gold)`} strokeWidth="1.4" />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle
          key={a}
          cx={50 + 8.4 * Math.cos((a * Math.PI) / 180)}
          cy={50 + 8.4 * Math.sin((a * Math.PI) / 180)}
          r="1.5"
          fill="#fff3d2"
          opacity="0.9"
        />
      ))}
    </svg>
  )
}
