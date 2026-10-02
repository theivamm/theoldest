import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Fade a block up the first time it enters the viewport. */
export function Reveal({ children, as: Tag = 'div', delay = 0, y = 26, className = '', ...rest }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}

/** Stagger a list of direct children as it scrolls in. */
export function Stagger({ children, className = '', each = 0.07, y = 22, start = 'top 85%' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.from(ref.current.children, {
        y,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: each,
        scrollTrigger: { trigger: ref.current, start, once: true },
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/** Split a line into words and bring them on one by one. */
export function SplitWords({ text, className = '', delay = 0, stagger = 0.035, as: Tag = 'span' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.from(ref.current.querySelectorAll('.word'), {
        yPercent: 108,
        opacity: 0,
        rotate: 3,
        duration: 0.85,
        delay,
        stagger,
        ease: 'power3.out',
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span className="word-mask" key={`${word}-${i}`}>
          <span className="word">{word}</span>
          {i < text.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

/** Slow vertical drift tied to scroll. */
export function Parallax({ children, amount = 60, className = '' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.to(ref.current, {
        yPercent: -amount / 10,
        ease: 'none',
        scrollTrigger: { trigger: ref.current.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/** An endless ticker of brass text, like a lightbox above the bar. */
export function Marquee({ items, speed = 34, className = '' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const track = ref.current
      // duplicate the run so the -50% translate lands seamlessly
      const half = track.scrollWidth / 2
      gsap.to(track, {
        x: -half,
        duration: half / speed,
        ease: 'none',
        repeat: -1,
      })
    },
    { scope: ref },
  )

  const run = [...items, ...items]

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div ref={ref} className="marquee__track">
        {run.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
            <span className="marquee__dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/** Count a number up when it scrolls into view. */
export function Counter({ to, duration = 1.6, className = '' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const node = ref.current
      const state = { value: 0 }
      gsap.to(state, {
        value: to,
        duration,
        ease: 'power2.out',
        snap: { value: 1 },
        onUpdate: () => {
          node.textContent = String(state.value)
        },
        scrollTrigger: { trigger: node, start: 'top 92%', once: true },
      })
    },
    { scope: ref },
  )

  return <span ref={ref} className={className} />
}
