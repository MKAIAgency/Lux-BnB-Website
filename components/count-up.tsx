"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Counts up to a numeric value the first time it scrolls into view. Preserves
 * any non-numeric prefix/suffix (e.g. the "+" in "120+" or decimals in "4.98").
 * Values with no clean leading number (e.g. "24/7") render statically.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = useState(value)
  const started = useRef(false)

  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/)

  useEffect(() => {
    const node = ref.current
    if (!node || !match) return

    const prefix = match[1]
    const numericStr = match[2]
    const suffix = match[3]
    const decimals = numericStr.includes(".") ? numericStr.split(".")[1].length : 0
    const target = parseFloat(numericStr.replace(/,/g, ""))

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const duration = 1800
            const start = performance.now()
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1)
              // easeOutExpo for a refined deceleration.
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
              const current = target * eased
              const formatted = current.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              })
              setDisplay(`${prefix}${formatted}${suffix}`)
              if (progress < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [value, match])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
