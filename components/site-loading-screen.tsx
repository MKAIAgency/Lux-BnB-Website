"use client"

import { useEffect, useState } from "react"

export function SiteLoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleReady = () => setIsLoading(false)
    window.addEventListener("hero-video-ready", handleReady)
    return () => window.removeEventListener("hero-video-ready", handleReady)
  }, [])

  return (
    <div
      aria-hidden={!isLoading}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-700 ease-out ${
        isLoading ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex w-56 flex-col items-center gap-5">
        <div className="h-px w-full overflow-hidden bg-[#eadfca]">
          <div className="site-loading-bar h-full w-1/3 bg-gold" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#9a7b3f]">
          Preparing your escape
        </span>
      </div>
    </div>
  )
}
