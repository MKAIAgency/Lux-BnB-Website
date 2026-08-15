"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Check, ImageIcon } from "lucide-react"
import type { Property } from "@/lib/store"
import { saveSlideshowAction } from "@/app/admin/actions"

export function SlideshowManager({ properties, selectedIds }: { properties: Property[]; selectedIds: string[] }) {
  const [selected, setSelected] = useState(() => selectedIds.filter((id) => properties.some((property) => property.id === id)))
  const selectedProperties = selected.map((id) => properties.find((property) => property.id === id)).filter((property): property is Property => Boolean(property))
  const available = properties.filter((property) => !selected.includes(property.id))

  function toggle(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function move(id: string, direction: -1 | 1) {
    setSelected((current) => {
      const index = current.indexOf(id)
      const nextIndex = index + direction
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current
      const next = [...current]
      ;[next[index], next[nextIndex]] = [next[nextIndex], next[index]]
      return next
    })
  }

  return (
    <section className="mt-16 border-t border-border/60 pt-10">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">Homepage feature</p>
          <h2 className="font-serif text-3xl font-medium text-foreground">Property Slideshow</h2>
          <p className="mt-1 text-sm text-muted-foreground">Choose which residences appear after the hero and set their order.</p>
        </div>
        <form action={saveSlideshowAction}>
          {selected.map((id) => <input key={id} type="hidden" name="propertyId" value={id} />)}
          <button type="submit" className="inline-flex items-center gap-2 rounded-sm bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-foreground transition-opacity hover:opacity-90"><Check className="size-4" /> Save Slideshow</button>
        </form>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Visible slides · {selected.length}</p>
          <div className="overflow-hidden rounded-lg border border-border/60">
            {selectedProperties.length ? selectedProperties.map((property, index) => (
              <div key={property.id} className="flex items-center gap-3 border-b border-border/60 p-3 last:border-0">
                <img src={property.image?.startsWith("/") ? `/d${property.image}` : property.image || "/d/placeholder.svg"} alt="" className="size-14 rounded-sm object-cover" />
                <div className="min-w-0 flex-1"><p className="truncate font-serif text-base text-foreground">{property.name}</p><p className="truncate text-xs text-muted-foreground">{property.location}</p></div>
                <button type="button" onClick={() => move(property.id, -1)} disabled={index === 0} aria-label={`Move ${property.name} up`} className="rounded-sm border border-border p-2 text-muted-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-30"><ArrowUp className="size-3.5" /></button>
                <button type="button" onClick={() => move(property.id, 1)} disabled={index === selectedProperties.length - 1} aria-label={`Move ${property.name} down`} className="rounded-sm border border-border p-2 text-muted-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-30"><ArrowDown className="size-3.5" /></button>
                <button type="button" onClick={() => toggle(property.id)} className="rounded-sm border border-border px-2 py-2 text-xs text-muted-foreground transition-colors hover:border-destructive hover:text-destructive">Remove</button>
              </div>
            )) : <p className="px-4 py-8 text-center text-sm text-muted-foreground">No slides selected. The slideshow will be hidden.</p>}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Available properties</p>
          <div className="overflow-hidden rounded-lg border border-border/60">
            {available.length ? available.map((property) => <button key={property.id} type="button" onClick={() => toggle(property.id)} className="flex w-full items-center gap-3 border-b border-border/60 p-3 text-left last:border-0 transition-colors hover:bg-secondary/50"><span className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-border text-muted-foreground"><ImageIcon className="size-4" /></span><span className="min-w-0 flex-1"><span className="block truncate font-serif text-base text-foreground">{property.name}</span><span className="block truncate text-xs text-muted-foreground">{property.location}</span></span><span className="text-xs uppercase tracking-[0.15em] text-gold">Add</span></button>) : <p className="px-4 py-8 text-center text-sm text-muted-foreground">All properties are selected.</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
