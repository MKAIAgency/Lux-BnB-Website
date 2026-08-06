"use client"

import { useRef, type ReactNode } from "react"

/**
 * A card that renders a soft gold radial glow following the cursor, plus a
 * subtle 3D tilt toward the pointer. Purely decorative and pointer-driven.
 */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const node = ref.current
    const glow = glowRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (glow) {
      glow.style.setProperty("--mx", `${x}px`)
      glow.style.setProperty("--my", `${y}px`)
      glow.style.opacity = "1"
    }
    // Gentle tilt: max ~5deg based on cursor offset from center.
    const rx = ((y / rect.height - 0.5) * -6).toFixed(2)
    const ry = ((x / rect.width - 0.5) * 6).toFixed(2)
    node.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }

  function handleLeave() {
    const node = ref.current
    const glow = glowRef.current
    if (glow) glow.style.opacity = "0"
    if (node) node.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative transition-transform duration-300 ease-luxe [transform-style:preserve-3d] ${className}`}
    >
      <div
        ref={glowRef}
        aria-hidden
        className="spotlight-glow pointer-events-none absolute inset-0 z-20 rounded-md opacity-0 transition-opacity duration-500"
      />
      {children}
    </div>
  )
}
