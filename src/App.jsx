import Backdrop from './components/Backdrop'
import Balloons from './components/Balloons'
import Cake from './components/Cake'
import Confetti from './components/Confetti'
import FlowerBorder from './components/FlowerBorder'
import GoldFrame from './components/GoldFrame'
import GreetingCard from './components/GreetingCard'
import HeroTitle from './components/HeroTitle'
import Ornament from './components/Ornament'
import Reveal from './components/Reveal'

export default function App() {
  return (
    <>
      <Backdrop />
      <FlowerBorder />
      <Balloons />
      <Confetti />
      <GoldFrame />

      <main
        className="relative z-10 mx-auto flex w-full max-w-[34rem] flex-col items-center px-[var(--gutter)]"
        style={{ paddingTop: 'var(--pad-top)', paddingBottom: 'var(--pad-bottom)' }}
      >
        <HeroTitle />

        <GreetingCard className="mt-[var(--gap-hero)]" />

        <Reveal className="w-full" style={{ marginTop: 'var(--gap-block)' }}>
          <Ornament className="mx-auto" width="var(--ornament-w)" />
        </Reveal>

        <Reveal style={{ marginTop: 'var(--gap-block)' }}>
          <Cake width="var(--cake-w)" />
        </Reveal>

        <Reveal
          as="p"
          delay={260}
          className="eyebrow t-eyebrow mt-[var(--gap-block)] text-center leading-relaxed text-gold-200/60"
        >
          Muqaddas bayram
        </Reveal>
      </main>
    </>
  )
}
