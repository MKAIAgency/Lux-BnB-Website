"use client"

import { PropertySearch } from "@/components/property-search"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-start justify-center">
      <div className="absolute inset-0 overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          preload="auto"
          poster="/images/hero-dubai-skyline.jpeg"
          onEnded={(event) => {
            const video = event.currentTarget
            video.currentTime = 0
            void video.play()
          }}
          className="size-full object-cover object-center"
        >
          <source src="/videos/hero-dubai.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
        <p className="luxe-reveal mb-6 text-xs uppercase tracking-[0.45em] text-gold">
          LUX BNB Vacation Homes
        </p>
        <h1
          className="luxe-reveal text-balance font-serif text-5xl font-medium leading-[1.05] text-foreground sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.15s" }}
        >
          Beautiful Homes for{" "}
          <span className="text-gold">Inspired Vacations</span>
        </h1>
        <p
          className="luxe-reveal mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: "0.3s" }}
        >
          A handpicked collection of premium apartments and penthouses across
          Dubai&apos;s most sought-after addresses, paired with attentive
          guest service for a flawless stay.
        </p>

        <div className="luxe-reveal" style={{ animationDelay: "0.45s" }}>
          <PropertySearch />
        </div>
      </div>
    </section>
  )
}
