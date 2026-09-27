/**
 * Gold rule with a centred lozenge — the divider used between sections.
 * The line carries a slow shimmer so it never reads as a flat border.
 */
export default function Ornament({ className = '', width = 'min(78%, 20rem)' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} style={{ width }} aria-hidden="true">
      <span
        className="h-px flex-1"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(247,205,128,0.15) 12%, rgba(255,240,205,0.75) 50%, rgba(247,205,128,0.15) 88%, transparent)',
          backgroundSize: '200% 100%',
          animation: 'shimmer-line 7s linear infinite',
        }}
      />

      <span className="relative size-[0.8rem] shrink-0 sm:size-5">
        <span
          className="absolute inset-0 rotate-45"
          style={{
            background: 'linear-gradient(135deg, #fff3d2, #e8b45c 45%, #a87322)',
            boxShadow: '0 0 12px rgba(232,180,92,0.55)',
            borderRadius: '3px',
          }}
        />
        <span
          className="absolute inset-[3px] rotate-45"
          style={{ background: 'radial-gradient(circle, rgba(20,12,36,0.9), transparent 72%)' }}
        />
      </span>

      <span
        className="h-px flex-1"
        style={{
          background:
            'linear-gradient(270deg, transparent, rgba(247,205,128,0.15) 12%, rgba(255,240,205,0.75) 50%, rgba(247,205,128,0.15) 88%, transparent)',
          backgroundSize: '200% 100%',
          animation: 'shimmer-line 7s linear infinite reverse',
        }}
      />
    </div>
  )
}
