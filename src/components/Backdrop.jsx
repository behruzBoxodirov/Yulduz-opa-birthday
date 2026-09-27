import Aurora from './Aurora'
import StarField from './StarField'
import Bokeh from './Bokeh'
import GoldenParticles from './GoldenParticles'

/**
 * Fixed, non-interactive atmosphere. Everything lives behind the content
 * (`-z-10`) so it never intercepts taps or affects layout/scroll.
 */
export default function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Deep base gradient — indigo night falling into velvet black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(178deg, #1d1139 0%, #150c2a 26%, #0d0720 56%, #07040f 82%, #05030c 100%)',
        }}
      />

      {/* Warm golden light pouring from above the name */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 62% at 50% -8%, rgba(255,214,140,0.30) 0%, rgba(232,180,92,0.13) 26%, rgba(120,70,160,0.10) 52%, transparent 74%)',
        }}
      />

      {/* Rose warmth low in the frame, for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(85% 48% at 50% 108%, rgba(214,132,170,0.20) 0%, rgba(120,60,140,0.10) 34%, transparent 68%)',
        }}
      />

      <Aurora />
      <Bokeh />
      <StarField />
      <GoldenParticles />

      {/* Vignette — pulls the eye to the centre and hides layer edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(112% 78% at 50% 42%, transparent 46%, rgba(4,2,10,0.45) 78%, rgba(3,1,7,0.86) 100%)',
        }}
      />

      {/* Fine film grain so the gradients never band on cheap phone panels */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          backgroundSize: '140px 140px',
        }}
      />
    </div>
  )
}
