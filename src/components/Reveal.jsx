import { useReveal } from '../hooks/useReveal'

/**
 * Scroll-revealing wrapper. `delay` staggers children of the page so the
 * name lands first and the greeting arrives after it.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, shown] = useReveal()

  return (
    <Tag
      ref={ref}
      data-shown={shown ? 'true' : undefined}
      className={`reveal ${shown ? 'reveal-shown' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
