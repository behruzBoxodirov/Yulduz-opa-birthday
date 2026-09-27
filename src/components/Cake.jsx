import Sparkles from './Sparkles'

const CAKE_W = 230
const CAKE_H = 190

const TIERS = [
  { x0: 26, x1: 204, top: 116, bottom: 172, r: 9, drips: 11, flute: 22 },
  { x0: 52, x1: 178, top: 72, bottom: 114, r: 8, drips: 8, flute: 15 },
  { x0: 78, x1: 142, top: 40, bottom: 70, r: 7, drips: 6, flute: 9 },
]

/** Scalloped cream cap sitting on a tier's top edge. */
function Cream({ x0, x1, top, drips }) {
  const capH = 11
  const step = (x1 - x0) / drips
  const circles = Array.from({ length: drips + 1 }, (_, i) => ({
    cx: x0 + i * step,
    r: step * 0.72,
  }))

  return (
    <g>
      <path
        d={`M${x0} ${top - capH} H${x1} V${top} H${x0} Z`}
        fill="url(#cake-cream)"
      />
      {circles.map((c, i) => (
        <circle key={i} cx={c.cx} cy={top} r={c.r} fill="url(#cake-cream)" />
      ))}
      <path
        d={`M${x0} ${top - capH} H${x1}`}
        stroke="url(#cake-gold)"
        strokeWidth="1.4"
        fill="none"
        opacity="0.85"
      />
    </g>
  )
}

function Flutes({ x0, x1, top, bottom, count }) {
  const step = (x1 - x0) / count
  return (
    <g opacity="0.32">
      {Array.from({ length: count + 1 }, (_, i) => {
        const x = x0 + i * step
        return (
          <line
            key={i}
            x1={x}
            y1={top + 4}
            x2={x}
            y2={bottom - 3}
            stroke="#fffdf8"
            strokeWidth="1"
            opacity={i % 2 ? 0.75 : 0.28}
          />
        )
      })}
    </g>
  )
}

function Candle({ x, top, delay }) {
  const bodyH = 20
  return (
    <g>
      {/* warm pool of light the candle throws on the cake */}
      <ellipse
        cx={x}
        cy={top - 6}
        rx="13"
        ry="13"
        fill="url(#candle-pool)"
        className="anim-candle-glow"
        style={{ '--delay': `${delay}ms` }}
      />
      {/* body */}
      <rect x={x - 3.5} y={top - bodyH} width="7" height={bodyH} rx="2.5" fill="url(#candle-body)" />
      <g opacity="0.5" stroke="#a87322" strokeWidth="1">
        <line x1={x - 3.5} y1={top - bodyH + 5} x2={x + 3.5} y2={top - bodyH + 2} />
        <line x1={x - 3.5} y1={top - bodyH + 11} x2={x + 3.5} y2={top - bodyH + 8} />
        <line x1={x - 3.5} y1={top - bodyH + 16} x2={x + 3.5} y2={top - bodyH + 13} />
      </g>
      <rect x={x - 3.5} y={top - bodyH} width="7" height="2.6" rx="1.2" fill="#f7cd80" opacity="0.85" />
      {/* wick */}
      <line x1={x} y1={top - bodyH - 2} x2={x} y2={top - bodyH - 5} stroke="#3a2a18" strokeWidth="1" strokeLinecap="round" />
      {/* flame */}
      <g className="anim-flame" style={{ transformOrigin: `${x}px ${top - bodyH - 4}px` }}>
        <path
          d={`M${x} ${top - bodyH - 15} C ${x + 4.4} ${top - bodyH - 8}, ${x + 3.2} ${top - bodyH - 3}, ${x} ${top - bodyH - 3.5} C ${x - 3.2} ${top - bodyH - 3}, ${x - 4.4} ${top - bodyH - 8}, ${x} ${top - bodyH - 15} Z`}
          fill="url(#flame)"
        />
        <ellipse
          cx={x}
          cy={top - bodyH - 7}
          rx="1.7"
          ry="3.2"
          fill="#fffdf2"
          opacity="0.95"
        />
      </g>
    </g>
  )
}

/**
 * The cake: three ivory tiers with gold trim, scalloped cream, three lit
 * candles and a warm bloom behind it. Drawn as one SVG so every edge stays
 * crisp at any size.
 */
export default function Cake({ width = 220, className = '', style }) {
  return (
    <div className={`relative grid place-items-center ${className}`} style={style}>
      <div
        className="anim-halo pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,206,130,0.30) 0%, rgba(255,184,110,0.12) 38%, transparent 68%)',
        }}
      />
      <svg
        viewBox={`0 0 ${CAKE_W} ${CAKE_H}`}
        className="relative h-auto w-full max-w-full drop-shadow-[0_18px_28px_rgba(0,0,0,0.55)]"
        style={{ width: typeof width === 'number' ? `${width}px` : width }}
        role="img"
        aria-label="Tug'ilgan kun torti"
      >
        <defs>
          <linearGradient id="cake-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffaf0" />
            <stop offset="42%" stopColor="#f0e0c8" />
            <stop offset="100%" stopColor="#c9ab8c" />
          </linearGradient>
          <linearGradient id="cake-cream" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffdf7" />
            <stop offset="100%" stopColor="#f2e2cc" />
          </linearGradient>
          <linearGradient id="cake-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a87322" stopOpacity="0.5" />
            <stop offset="30%" stopColor="#ffe6ae" />
            <stop offset="60%" stopColor="#e8b45c" />
            <stop offset="100%" stopColor="#a87322" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="candle-body" cx="34%" cy="20%" r="90%">
            <stop offset="0%" stopColor="#fffdf6" />
            <stop offset="55%" stopColor="#f7e6c8" />
            <stop offset="100%" stopColor="#c9a978" />
          </radialGradient>
          <radialGradient id="candle-pool" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffcf85" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffcf85" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="flame" cx="50%" cy="62%" r="58%">
            <stop offset="0%" stopColor="#fffdf0" />
            <stop offset="38%" stopColor="#ffd98a" />
            <stop offset="100%" stopColor="#ff9d3c" stopOpacity="0.85" />
          </radialGradient>
          <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff8e9" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#b9a184" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* ---- candles (behind the tiers they stand on) ---- */}
        <Candle x={90} top={40} delay={0} />
        <Candle x={115} top={40} delay={400} />
        <Candle x={140} top={40} delay={800} />

        {/* ---- plate ---- */}
        <ellipse cx="115" cy="176" rx="88" ry="11" fill="url(#plate)" opacity="0.92" />
        <ellipse cx="115" cy="174" rx="88" ry="11" fill="#fffaf0" opacity="0.35" />

        {/* ---- tiers, widest first ---- */}
        {TIERS.map((t, i) => (
          <g key={i}>
            <path
              d={`M${t.x0} ${t.top} H${t.x1} V${t.bottom - t.r} Q${t.x1} ${t.bottom} ${t.x1 - t.r} ${t.bottom} H${t.x0 + t.r} Q${t.x0} ${t.bottom} ${t.x0} ${t.bottom - t.r} Z`}
              fill="url(#cake-side)"
            />
            <Flutes {...t} />
            {/* gold base band + edge light */}
            <path
              d={`M${t.x0} ${t.bottom - 7} H${t.x1}`}
              stroke="url(#cake-gold)"
              strokeWidth="2"
              opacity="0.8"
            />
            <path
              d={`M${t.x0 + 1.5} ${t.top + 3} V${t.bottom - t.r}`}
              stroke="#fffdf8"
              strokeWidth="1.6"
              opacity="0.4"
            />
            <Cream {...t} />
          </g>
        ))}

        {/* ---- gold sugar pearls on the middle tier ---- */}
        {Array.from({ length: 7 }, (_, i) => {
          const step = (TIERS[1].x1 - TIERS[1].x0) / 7
          return (
            <circle
              key={i}
              cx={TIERS[1].x0 + step * (i + 0.5)}
              cy={TIERS[1].bottom - 15}
              r={i % 2 ? 1.7 : 2.3}
              fill="url(#cake-gold)"
              opacity="0.9"
            />
          )
        })}

        {/* ---- blush blossoms on the top tier ---- */}
        {[
          { x: 92, y: 32, s: 1 },
          { x: 138, y: 34, s: 0.8 },
        ].map((b, i) => (
          <g key={i} transform={`translate(${b.x} ${b.y}) scale(${b.s})`}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse
                key={a}
                cx="0"
                cy="-4.6"
                rx="3.1"
                ry="5"
                fill="#f7c8d8"
                opacity="0.92"
                transform={`rotate(${a})`}
              />
            ))}
            <circle cx="0" cy="0" r="2.1" fill="#f7cd80" />
          </g>
        ))}
      </svg>

      <Sparkles count={5} seed={9090} className="-inset-8" />
    </div>
  )
}
