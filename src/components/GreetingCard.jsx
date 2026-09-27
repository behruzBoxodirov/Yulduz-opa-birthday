import Ornament from './Ornament'
import Reveal from './Reveal'

const SALOM = 'Assalomu alaykum, Yulduz opa! 🌷'

const BODY = [
  'Sizni tavallud ayyomingiz bilan chin qalbimdan muborakbod etaman! 🎉',
  'Avvalo, sizga mustahkam sog‘lik, uzoq umr, oilaviy xotirjamlik va cheksiz baxt tilayman. Har bir kuningiz quvonchli, qalbingiz esa doimo xotirjam va shodliklarga to‘la bo‘lsin.',
 
]

const CLOSING = 'Tug‘ilgan kuningiz muborak bo‘lsin, Yulduz opa! ❤️🎂✨'

/** The full greeting, set inside a glass panel with a gold hairline border. */
export default function GreetingCard({ className = '' }) {
  return (
    <Reveal as="section" delay={140} className={`relative w-full ${className}`}>
      {/* soft gold bloom hugging the card */}
      <span
        className="anim-halo pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[128%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255,206,140,0.20) 0%, rgba(180,120,220,0.12) 48%, transparent 76%)',
          '--dur': '14s',
        }}
      />

      <div
        className="gold-hairline glass-card card-pad relative overflow-hidden"
        style={{ borderRadius: 'var(--card-radius)' }}
      >
        {/* top sheen */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 55%, transparent 100%)',
          }}
        />

        {/* wax-seal medallion riding the top border */}
        <span
          className="absolute left-1/2 top-0 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
          style={{ width: 'var(--seal-size)', height: 'var(--seal-size)' }}
        >
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(150deg, #fff6e0, #e8b45c 48%, #a87322)',
              boxShadow: '0 0 0 1px rgba(255,243,210,0.5), 0 6px 18px -6px rgba(232,180,92,0.85)',
            }}
          />
          <span
            className="absolute inset-[2px] rounded-full"
            style={{ background: 'radial-gradient(circle at 40% 32%, #241542, #140b26)' }}
          />
          <span
            className="relative text-[0.62rem] leading-none"
            style={{ color: '#ffe6ae', textShadow: '0 0 10px rgba(255,214,140,0.9)' }}
          >
            ✦
          </span>
        </span>

        <div className="cascade relative text-center">
          <h2 className="t-salom text-gold-enchant font-display leading-[1.28] font-medium">
            {SALOM}
          </h2>

          <Ornament className="mx-auto mt-[var(--card-gap)]" width="var(--ornament-w)" />

          <div className="para-gap mt-[var(--card-gap)] flex flex-col">
            {BODY.map((line, i) => (
              <p
                key={i}
                style={{ '--i': i + 1 }}
                className="t-body text-body-enchant font-body font-light text-ivory/88 [text-wrap:pretty]"
              >
                {line}
              </p>
            ))}
          </div>

          <Ornament className="mx-auto mt-[var(--card-gap)]" width="var(--ornament-w)" />

          <p
            className="t-closing text-gold-enchant mt-[var(--card-gap)] font-display leading-[1.5] font-medium italic"
            style={{ '--i': BODY.length + 2 }}
          >
            {CLOSING}
          </p>
        </div>
      </div>
    </Reveal>
  )
}
