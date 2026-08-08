"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import type { Property } from "@/lib/store"

export function PropertySlideshow({ slides }: { slides: Property[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || slides.length < 2) return
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [paused, slides.length])

  useEffect(() => {
    if (active >= slides.length) setActive(0)
  }, [active, slides.length])

  if (!slides.length) return null
  const current = slides[active]

  return (
    <section aria-label="Featured residences" className="border-b border-border/60 bg-background px-6 py-16 lg:px-10 lg:py-24" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gold">A glimpse inside</p>
            <h2 className="font-serif text-3xl text-foreground sm:text-4xl">Stay somewhere extraordinary</h2>
          </div>
          {slides.length > 1 ? <div className="hidden items-center gap-2 sm:flex">
            <button type="button" onClick={() => setActive((active - 1 + slides.length) % slides.length)} aria-label="Previous featured property" className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"><ChevronLeft className="size-4" /></button>
            <button type="button" onClick={() => setActive((active + 1) % slides.length)} aria-label="Next featured property" className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"><ChevronRight className="size-4" /></button>
          </div> : null}
        </div>

        <div className="relative overflow-hidden rounded-md border border-border/70 bg-card">
          <div className="grid min-h-[28rem] grid-cols-1 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="relative min-h-[20rem] overflow-hidden lg:min-h-[30rem]">
              {slides.map((slide, index) => <img key={slide.id} src={slide.image || "/placeholder.svg"} alt={`${slide.name} in ${slide.location}`} className={`absolute inset-0 size-full object-cover transition-all duration-1000 ease-luxe ${index === active ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />)}
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background" />
            </div>
            <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Featured residence</p>
                <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">{current.location}</p>
                <h3 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">{current.name}</h3>
                <p className="mt-5 text-sm tracking-wide text-muted-foreground">{current.tag}</p>
              </div>
              <div className="mt-12 flex items-end justify-between gap-4">
                <div className="flex gap-2" aria-label="Choose featured property">
                  {slides.map((slide, index) => <button key={slide.id} type="button" onClick={() => setActive(index)} aria-label={`Show ${slide.name}`} aria-current={index === active} className={`h-1 transition-all duration-500 ${index === active ? "w-10 bg-gold" : "w-4 bg-border hover:bg-gold/60"}`} />)}
                </div>
                <a href={current.enquireLink || "#contact"} target={current.enquireLink ? "_blank" : undefined} rel={current.enquireLink ? "noreferrer" : undefined} className="inline-flex items-center gap-2 rounded-sm bg-gold px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-gold-foreground transition-opacity hover:opacity-90">Enquire <ArrowUpRight className="size-4" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
