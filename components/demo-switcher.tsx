"use client"

import { useState } from "react"
import { Check, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

const concepts = [
  { id: "editorial", label: "Editorial", note: "Quietly iconic" },
  { id: "mediterranean", label: "Mediterranean", note: "Sun-washed escape" },
  { id: "maximalist", label: "Maximalist", note: "Art-directed energy" },
  { id: "midnight", label: "Midnight", note: "Dubai after dark" },
] as const

type Concept = (typeof concepts)[number]["id"]

export function DemoSwitcher({ children }: { children: React.ReactNode }) {
  const [concept, setConcept] = useState<Concept>("editorial")

  return (
    <div className={cn("demo-site", `demo-${concept}`)}>
      <aside className="demo-switcher" aria-label="Website demo concepts">
        <div className="demo-switcher__title">
          <Palette aria-hidden="true" />
          <span>Choose a direction</span>
        </div>
        <div className="demo-switcher__options" role="radiogroup" aria-label="Choose a visual concept">
          {concepts.map((item) => {
            const active = item.id === concept
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setConcept(item.id)}
                className={cn("demo-switcher__option", active && "is-active")}
              >
                <span className="demo-switcher__dot">{active && <Check aria-hidden="true" />}</span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.note}</small>
                </span>
              </button>
            )
          })}
        </div>
      </aside>
      <div className="demo-site__content">{children}</div>
    </div>
  )
}
