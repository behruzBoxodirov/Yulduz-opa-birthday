/**
 * Deterministic PRNG so every decorative layer renders in the exact same
 * place on every render (no reshuffling on re-render / StrictMode).
 */
export function makeRng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Build `count` items from a seeded rng. */
export function spread(count, seed, make) {
  const rng = makeRng(seed)
  return Array.from({ length: count }, (_, i) => make(rng, i))
}

export const range = (rng, min, max) => min + rng() * (max - min)
export const pick = (rng, list) => list[Math.floor(rng() * list.length) % list.length]
