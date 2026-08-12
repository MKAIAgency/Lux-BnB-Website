"use client"

import { useState } from "react"
import { PropertySearch } from "@/components/property-search"

export function Hero() {
  const [videoReady, setVideoReady] = useState(false)

  return (
    <section className="hero-enter relative flex min-h-screen items-start justify-center overflow-visible bg-foreground">
      <div className="absolute inset-0 overflow-hidden bg-foreground" aria-hidden="true">
        <img
          src="/luxbnb/images/hero-dubai-skyline.jpeg"
          alt=""
          fetchPriority="high"
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
        >
          <source src="/luxbnb/luxbnb-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-foreground/45" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-44 text-center sm:pt-48 lg:pt-56">

        <p className="luxe-reveal mb-6 text-xs uppercase tracking-[0.45em] text-primary">
          LUX BNB Vacation Homes
        </p>
        <h1
          className="luxe-reveal text-balance font-serif text-5xl font-medium leading-[1.05] text-foreground sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.15s" }}
        >
          {"Beautiful Homes for "}
          <span className="text-gold drop-shadow-[0_3px_12px_rgb(0_0_0_/_0.9)]">Inspired Vacations</span>
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
