"use client"

import { useState } from "react"
import { PropertySearch } from "@/components/property-search"

export function Hero() {
  const [videoReady, setVideoReady] = useState(false)

  return (
    <section className="relative flex min-h-screen items-start justify-center bg-[#07152e]">
      <div className="absolute inset-0 overflow-hidden bg-[#07152e]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlayThrough={(event) => {
            setVideoReady(true)
            void event.currentTarget.play()
          }}
          className={`size-full object-cover transition-opacity duration-700 ease-out ${videoReady ? "opacity-100" : "opacity-0"}`}
        >
          <source src="/videos/hero-dubai.mp4" type="video/mp4" />
        </video>
        {!videoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#07152e]" role="status" aria-live="polite">
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="size-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" aria-hidden="true" />
              <p className="text-xs uppercase tracking-[0.35em] text-gold">Preparing your escape</p>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-32 text-center sm:pt-40 lg:pt-48">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-gold">
          Curated Private Residences
        </p>
        <h1 className="text-balance font-serif text-5xl font-medium leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
          Live the Golden Standard of{" "}
          <span className="text-gold">Dubai Living</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          An exclusive collection of villas, penthouses and sky residences,
          each paired with bespoke concierge service for a flawless stay.
        </p>

        <PropertySearch />
      </div>
    </section>
  )
}
