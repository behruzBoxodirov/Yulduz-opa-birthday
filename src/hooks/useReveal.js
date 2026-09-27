import { useEffect, useRef, useState } from 'react'

const NO_OBSERVER = typeof IntersectionObserver === 'undefined'

/**
 * Fades an element in the first time it enters the viewport.
 * Once shown it stays shown (never re-hides on scroll-up).
 * Returns `[ref, shown]`; children can react to `shown` via `data-shown`.
 */
export function useReveal({ threshold = 0.08, rootMargin = '0px 0px -6% 0px' } = {}) {
  const ref = useRef(null)
  // Without IntersectionObserver there is nothing to wait for.
  const [shown, setShown] = useState(NO_OBSERVER)

  useEffect(() => {
    const node = ref.current
    if (!node || NO_OBSERVER) return

    // IO delivers its first callback asynchronously, so elements already in
    // view on load reveal on the next frame — no synchronous setState needed.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, shown]
}
