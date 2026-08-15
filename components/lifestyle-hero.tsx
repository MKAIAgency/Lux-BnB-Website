"use client"

import { useState } from "react"
import { ArrowDownRight, ChevronDown } from "lucide-react"
import { PropertySearch } from "@/components/property-search"

const lifestyles = [
  { name: "Palm Jumeirah", mood: "Island calm", image: "/images/property-beach-villa.png" },
  { name: "Dubai Marina", mood: "Waterfront energy", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-NPyJrRSDlRw6QoQvr6CXbLTfNUwhEt.jpeg" },
  { name: "Downtown", mood: "City in motion", image: "/images/hero-dubai-skyline.jpeg" },
  { name: "JBR", mood: "Beachside living", image: "/images/property-penthouse.png" },
  { name: "Emirates Hills", mood: "Private retreat", image: "/images/hero-villa.png" },
  { name: "Business Bay", mood: "Urban waterfront", image: "/images/property-marina.png" },
  { name: "Dubai Creek Harbour", mood: "Creekside calm", image: "/images/hero-dubai-skyline.jpeg" },
  { name: "Greens & Views", mood: "Leafy retreat", image: "/images/hero-villa.png" },
]

export function LifestyleHero() {
  const [activeDestination, setActiveDestination] = useState("")
  const [destinationOpen, setDestinationOpen] = useState(false)
  const activeIndex = lifestyles.findIndex((item) => item.name === activeDestination)
  const lifestyle = activeIndex >= 0 ? lifestyles[activeIndex] : { name: "All destinations", mood: "Dubai, your way", image: "/images/hero-dubai-skyline.jpeg" }

  return (
    <section className="lifestyle-hero relative isolate min-h-[min(920px,100vh)] overflow-visible bg-background">
      <div className="lifestyle-hero__image absolute inset-0" key={lifestyle.image} style={{ backgroundImage: `url(${lifestyle.image})` }} aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-[min(920px,100vh)] max-w-[1500px] flex-col justify-between px-6 pb-8 pt-32 lg:px-12 lg:pb-12 lg:pt-40">
        <div className="max-w-3xl">
          <p className="luxe-reveal mb-6 text-xs uppercase tracking-[0.45em] text-gold">LUX BNB Vacation Homes</p>
          <h1 className="luxe-reveal max-w-3xl text-balance font-serif text-6xl font-medium leading-[0.9] text-foreground sm:text-8xl lg:text-[8.5rem]" style={{ animationDelay: "0.15s" }}>
            Beautiful Homes for <span className="text-gold">Inspired Vacations</span>
          </h1>
          <p className="luxe-reveal mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg" style={{ animationDelay: "0.3s" }}>
            A handpicked collection of premium apartments and penthouses across Dubai&apos;s most sought-after addresses, paired with attentive guest service for a flawless stay.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_430px] lg:items-end">
          <div className="lifestyle-search rounded-sm border border-foreground/15 bg-background/55 p-4 backdrop-blur-xl sm:p-5">
            <div className="lifestyle-search__destination">
              <div className="mb-3 flex items-center justify-between"><span className="text-xs uppercase tracking-[0.24em] text-gold">Explore destinations</span><ArrowDownRight className="size-4 text-gold" aria-hidden="true" /></div>
              <div className="destination-picker">
                <button type="button" className="destination-picker__trigger" aria-expanded={destinationOpen} aria-controls="destination-options" onClick={() => setDestinationOpen((open) => !open)}>
                  <span>{activeDestination || "Dubai"}</span>
                  <ChevronDown className={`size-4 transition-transform ${destinationOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {destinationOpen ? (
                  <div id="destination-options" className="destination-picker__menu" role="listbox" aria-label="Choose a destination">
                    <button type="button" role="option" aria-selected={activeDestination === ""} onClick={() => { setActiveDestination(""); setDestinationOpen(false) }}>
                      <span>Dubai</span><small>Dubai, your way</small>
                    </button>
                    {lifestyles.map((item) => (
                      <button key={item.name} type="button" role="option" aria-selected={activeDestination === item.name} onClick={() => { setActiveDestination(item.name); setDestinationOpen(false) }}>
                        <span>{item.name}</span><small>{item.mood}</small>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="lifestyle-search__form">
              <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-gold">Find your stay</span>
              <PropertySearch selectedDestination={activeDestination} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
