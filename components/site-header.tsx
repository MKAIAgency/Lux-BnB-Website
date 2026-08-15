"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Residences", href: "#residences" },
  { label: "Experiences", href: "#experiences" },
  { label: "Concierge", href: "#concierge" },
  { label: "Contact", href: "#contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#" className="flex items-center leading-none" aria-label="Lux BNB Vacation Homes">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/644d6bbff379b2416f2f0332_logo-blue-luxbnb-rDGqIasy4sMK9GCWDBklWr1TGmlNMz.png"
            alt="Lux BNB"
            className="h-10 w-auto object-contain"
          />
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-sm border border-gold/60 px-6 py-2.5 text-sm font-medium tracking-wide text-gold transition-colors hover:bg-gold hover:text-gold-foreground md:inline-flex"
        >
          Book a Stay
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base tracking-wide text-muted-foreground transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center rounded-sm border border-gold/60 px-6 py-3 text-sm font-medium tracking-wide text-gold"
            >
              Book a Stay
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
