"use client"

import { useEffect, useState } from "react"

export function SiteLoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const handleReady = () => {
      setExiting(true)
      window.setTimeout(() => setVisible(false), 900)
    }

    window.addEventListener("hero-video-ready", handleReady)
    return () => window.removeEventListener("hero-video-ready", handleReady)
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-900 ease-out ${exiting ? "pointer-events-none opacity-0" : "opacity-100"}`}
      role="status"
      aria-label="Loading website"
    >
      <div className="w-56 overflow-hidden">
        <div className="h-0.5 w-full bg-[#ead9b2]">
          <div className="site-loading-bar h-full w-2/5 bg-[#c89b3c]" />
        </div>
      </div>
    </div>
  )
}
