/**
 * Double gold frame pinned to the viewport with engraved corner flourishes.
 * A travelling highlight sweeps the top edge so the border feels lit.
 */
function Corner({ className, style }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`absolute size-9 sm:size-11 ${className}`}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="corner-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff3d2" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#e8b45c" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#a87322" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path
        d="M2 30 C 2 12, 12 2, 30 2"
        fill="none"
        stroke="url(#corner-gold)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M9 34 C 9 19, 19 9, 34 9"
        fill="none"
        stroke="url(#corner-gold)"
        strokeWidth="0.8"
        strokeOpacity="0.6"
        strokeLinecap="round"
      />
      <path
        d="M2 44 C 16 44, 44 16, 44 2"
        fill="none"
        stroke="url(#corner-gold)"
        strokeWidth="0.7"
        strokeOpacity="0.4"
      />
      <circle cx="30" cy="30" r="1.6" fill="#fff3d2" opacity="0.85" />
    </svg>
  )
}

export default function GoldFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20" aria-hidden="true">
      {/* outer rule */}
      <div
        className="absolute rounded-[26px] sm:rounded-[34px]"
        style={{
          inset: 'clamp(8px, 2.2vw, 20px)',
          border: '1px solid rgba(232,180,92,0.22)',
          boxShadow:
            '0 0 0 1px rgba(255,240,205,0.05) inset, 0 0 60px -18px rgba(232,180,92,0.35) inset',
        }}
      />
      {/* inner rule, slightly brighter at the top */}
      <div
        className="absolute rounded-[20px] sm:rounded-[26px]"
        style={{
          inset: 'clamp(13px, 3.1vw, 27px)',
          border: '1px solid transparent',
          backgroundImage:
            'linear-gradient(160deg, rgba(255,246,224,0.20), rgba(255,246,224,0.04) 40%, rgba(255,246,224,0.13))',
          backgroundOrigin: 'border-box',
          WebkitMaskImage:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskImage: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />

      <Corner className="left-0 top-0" />
      <Corner className="right-0 top-0 scale-x-[-1]" />
      <Corner className="bottom-0 left-0 scale-y-[-1]" />
      <Corner className="bottom-0 right-0 scale-[-1]" />
    </div>
  )
}
