import Reveal from './Reveal'
import Sparkles from './Sparkles'

/**
 * The name. Two lines, gold-gradient engraving, sitting inside a breathing
 * pool of warm light with a horizontal light-streak across the baseline.
 */
export default function HeroTitle() {
  return (
    <header className="relative flex flex-col items-center text-center">
      <Reveal
        as="p"
        delay={120}
        className="eyebrow t-eyebrow leading-relaxed text-gold-300/85"
      >
        Tavallud ayyomingiz
      </Reveal>

      <div className="relative mt-[0.55rem] grid place-items-center sm:mt-7">
        {/* pool of light behind the name */}
        <span
          className="anim-halo pointer-events-none absolute left-1/2 top-1/2 aspect-[1/0.62] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(255,214,140,0.42) 0%, rgba(255,190,110,0.16) 46%, transparent 78%)',
            '--dur': '11s',
          }}
        />
        {/* light streak across the wordmark */}
        <span
          className="anim-sway pointer-events-none absolute left-1/2 top-1/2 h-[42%] w-[128%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,226,168,0.20) 30%, rgba(255,244,214,0.30) 50%, rgba(255,226,168,0.20) 70%, transparent)',
            '--dur': '15s',
            '--rest': '-1.5deg',
            '--amp': '1.5deg',
          }}
        />

        <h1 className="relative anim-bloom" style={{ '--delay': '260ms' }}>
          <span className="t-title text-gold-enchant block font-display leading-[0.94] font-light tracking-[0.005em]">
            Yulduz
          </span>
          <span className="-mt-[0.06em] flex items-center justify-center gap-[0.14em]">
            <span className="t-title-b text-gold-enchant block font-display leading-[0.94] font-light italic">
              opa
            </span>
            <span
              className="text-gold-300 text-[0.26em] leading-none drop-shadow-[0_0_14px_rgba(255,214,140,0.6)]"
              style={{ alignSelf: 'center' }}
            >
              🌟
            </span>
          </span>
        </h1>

        <Sparkles count={6} seed={3141} className="-inset-16" />
      </div>

      <Reveal
        as="p"
        delay={900}
        className="only-tall t-sub text-body-enchant mt-6 max-w-[19rem] font-body leading-[1.7] text-ivory/70 sm:mt-7"
      >
        Bu kunda yulduzingiz porlaydi,
        <br />
        uni tabriklar shu yerda.
      </Reveal>
    </header>
  )
}
