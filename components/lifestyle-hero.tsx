"use client"

import { useState } from "react"
import { ArrowDownRight, Compass, MapPin } from "lucide-react"
import { PropertySearch } from "@/components/property-search"

const lifestyles = [
  { name: "Palm Jumeirah", mood: "Island calm", image: "/images/property-beach-villa.png" },
  { name: "Dubai Marina", mood: "Waterfront energy", image: "/images/property-marina.png" },
  { name: "Downtown Dubai", mood: "City in motion", image: "/images/hero-dubai-skyline.jpeg" },
  { name: "JBR", mood: "Beachside living", image: "/images/property-penthouse.png" },
  { name: "Emirates Hills", mood: "Private retreat", image: "/images/hero-villa.png" },
]

export function LifestyleHero() {
  const [active, setActive] = useState(0)
  const lifestyle = lifestyles[active]

  return (
    <section className="lifestyle-hero relative isolate min-h-[min(920px,100vh)] overflow-hidden bg-background">
      <div className="lifestyle-hero__image absolute inset-0" key={lifestyle.image} style={{ backgroundImage: `url(${lifestyle.image})` }} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/55 to-background/10" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/25" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[min(920px,100vh)] max-w-[1500px] flex-col justify-between px-6 pb-8 pt-32 lg:px-12 lg:pb-12 lg:pt-40">
        <div className="max-w-3xl">
          <div className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.34em] text-gold">
            <Compass className="size-4" aria-hidden="true" />
            <span>Choose Your Dubai Lifestyle</span>
          </div>
          <p className="luxe-reveal mb-6 text-xs uppercase tracking-[0.45em] text-gold">LUX BNB Vacation Homes</p>
          <h1 className="luxe-reveal max-w-3xl text-balance font-serif text-6xl font-medium leading-[0.9] text-foreground sm:text-8xl lg:text-[8.5rem]" style={{ animationDelay: "0.15s" }}>
            Beautiful Homes for <span className="text-gold">Inspired Vacations</span>
          </h1>
          <p className="luxe-reveal mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg" style={{ animationDelay: "0.3s" }}>
            A handpicked collection of premium apartments and penthouses across Dubai&apos;s most sought-after addresses, paired with attentive guest service for a flawless stay.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_430px] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-foreground/70">
              <MapPin className="size-3.5 text-gold" aria-hidden="true" />
              <span>Explore by feeling</span>
            </div>
            <div className="flex max-w-3xl gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Choose your Dubai lifestyle">
              {lifestyles.map((item, index) => (
                <button key={item.name} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`lifestyle-tab ${active === index ? "is-active" : ""}`}>
                  <span>{item.name}</span>
                  <small>{item.mood}</small>
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3 text-sm text-foreground/70"><span className="text-gold">0{active + 1}</span><span className="h-px w-20 bg-foreground/30" /><span>05 destinations</span></div>
          </div>
          <div className="lifestyle-search rounded-sm border border-foreground/15 bg-background/55 p-4 backdrop-blur-xl sm:p-5">
            <div className="mb-3 flex items-center justify-between"><span className="text-xs uppercase tracking-[0.24em] text-gold">Find your stay</span><ArrowDownRight className="size-4 text-gold" aria-hidden="true" /></div>
            <PropertySearch />
          </div>
        </div>
      </div>
    </section>
  )
}
