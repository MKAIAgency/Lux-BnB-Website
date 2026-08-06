"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Search, CalendarDays, Users, MapPin, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"

const BASE_URL = "https://luxbnb.guestybookings.com/en/properties"

// The company only operates in the UAE, so the country is always fixed.
const COUNTRY = "United Arab Emirates"

// Destinations the company operates in. Selecting one is optional; it simply
// adds a `city` filter to the search.
const DESTINATIONS = [
  "Business Bay",
  "Downtown",
  "Dubai",
  "Dubai Creek Harbour",
  "Greens & Views",
  "JBR",
  "JVC",
  "Palm Jumeirah",
  "دبي",
]

type FieldErrors = {
  dates?: string
  adults?: string
}

function toISO(d: Date) {
  const tzOffset = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 10)
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function sameDay(a: Date | null, b: Date | null) {
  return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

function formatDisplay(d: Date | null) {
  if (!d) return null
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short" })
}

export function PropertySearch() {
  const [destination, setDestination] = useState("")
  const [destOpen, setDestOpen] = useState(false)
  const [adults, setAdults] = useState(1)
  const [from, setFrom] = useState<Date | null>(null)
  const [to, setTo] = useState<Date | null>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [calendarOpen, setCalendarOpen] = useState(false)

  const today = startOfDay(new Date())
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const calendarRef = useRef<HTMLDivElement>(null)
  const destRef = useRef<HTMLDivElement>(null)

  // Close the calendar when clicking outside of it.
  useEffect(() => {
    if (!calendarOpen) return
    function onPointerDown(e: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false)
      }
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [calendarOpen])

  // Close the destination dropdown when clicking outside of it.
  useEffect(() => {
    if (!destOpen) return
    function onPointerDown(e: MouseEvent) {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setDestOpen(false)
      }
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [destOpen])

  function handleDayClick(day: Date) {
    if (!from || (from && to)) {
      // Start a new range.
      setFrom(day)
      setTo(null)
      return
    }
    // We have a "from" but no "to".
    if (day <= from) {
      setFrom(day)
      return
    }
    setTo(day)
    setErrors((prev) => ({ ...prev, dates: undefined }))
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    if (!from || !to) {
      next.dates = "Select your stay dates."
    } else if (from < today) {
      next.dates = "Check-in cannot be in the past."
    } else if (to <= from) {
      next.dates = "Check-out must be after check-in."
    }
    if (!adults || adults < 1) {
      next.adults = "At least 1 adult is required."
    }
    return next
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // URLSearchParams handles encoding of spaces and non-Latin characters.
    const params = new URLSearchParams()
    // Destination is optional; only add a `city` filter when one is selected.
    if (destination) {
      params.set("city", destination)
    }
    params.set("country", COUNTRY)
    params.set("minOccupancy", String(adults))
    params.set("checkIn", toISO(from as Date))
    params.set("checkOut", toISO(to as Date))
    params.set("adults", String(adults))

    window.location.href = `${BASE_URL}?${params.toString()}`
  }

  // Build the grid of days for the current view month.
  const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1)
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate()
  const leadingBlanks = firstOfMonth.getDay()
  const cells: (Date | null)[] = []
  for (let i = 0; i < leadingBlanks; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d))

  const canGoPrev = viewMonth > new Date(today.getFullYear(), today.getMonth(), 1)

  const dateLabel =
    from && to
      ? `${formatDisplay(from)} – ${formatDisplay(to)}`
      : from
        ? `${formatDisplay(from)} – …`
        : "Add dates"

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto mt-12 max-w-3xl rounded-md border border-border/70 bg-card/80 p-3 text-left backdrop-blur-md"
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.3fr_1.3fr_0.8fr_auto]">
        <div className="relative flex flex-col" ref={destRef}>
          <button
            type="button"
            onClick={() => setDestOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={destOpen}
            className="flex items-center gap-3 rounded-sm px-4 py-3 text-left transition-colors hover:bg-secondary/60"
          >
            <MapPin className="size-5 shrink-0 text-gold" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Destination</p>
              <p className={`truncate text-sm ${destination ? "text-foreground" : "text-muted-foreground/60"}`}>
                {destination || "Anywhere in Dubai"}
              </p>
            </div>
            <ChevronDown
              className={`size-4 shrink-0 text-muted-foreground transition-transform ${destOpen ? "rotate-180" : ""}`}
            />
          </button>

          {destOpen ? (
            <div className="absolute left-0 bottom-full z-30 mb-3 w-full min-w-[17rem] overflow-hidden rounded-lg border border-gold/25 bg-popover/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-white/5 backdrop-blur-xl">
              <div className="border-b border-border/60 px-4 pb-2.5 pt-3">
                <p className="font-serif text-sm italic text-gold">Choose your destination</p>
              </div>
              <ul
                role="listbox"
                aria-label="Select a destination"
                className="max-h-64 overflow-y-auto p-2"
              >
                <li role="option" aria-selected={destination === ""}>
                  <button
                    type="button"
                    onClick={() => {
                      setDestination("")
                      setDestOpen(false)
                    }}
                    className={`group flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-gold/10 ${
                      destination === "" ? "text-gold" : "text-muted-foreground"
                    }`}
                  >
                    <MapPin className="size-4 shrink-0 opacity-60" />
                    Anywhere in Dubai
                  </button>
                </li>
                {DESTINATIONS.map((d) => (
                  <li key={d} role="option" aria-selected={destination === d}>
                    <button
                      type="button"
                      onClick={() => {
                        setDestination(d)
                        setDestOpen(false)
                      }}
                      className={`group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-gold/10 ${
                        destination === d ? "bg-gold/10" : ""
                      }`}
                    >
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          destination === d
                            ? "border-gold/50 bg-gold/15 text-gold"
                            : "border-border/70 text-muted-foreground group-hover:border-gold/40 group-hover:text-gold"
                        }`}
                      >
                        <MapPin className="size-4" />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className={`text-sm ${destination === d ? "text-gold" : "text-foreground"}`}>{d}</span>
                        <span className="text-[11px] text-muted-foreground">Dubai, United Arab Emirates</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="relative flex flex-col" ref={calendarRef}>
          <button
            type="button"
            onClick={() => setCalendarOpen((v) => !v)}
            aria-haspopup="dialog"
            aria-expanded={calendarOpen}
            aria-invalid={!!errors.dates}
            className={`flex items-center gap-3 rounded-sm px-4 py-3 text-left transition-colors ${
              errors.dates ? "ring-1 ring-destructive" : "hover:bg-secondary/60"
            }`}
          >
            <CalendarDays className="size-5 shrink-0 text-gold" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Dates</p>
              <p className={`truncate text-sm ${from ? "text-foreground" : "text-muted-foreground/60"}`}>{dateLabel}</p>
            </div>
          </button>

          {calendarOpen ? (
            <div
              role="dialog"
              aria-label="Select stay dates"
              className="absolute left-0 bottom-full z-30 mb-3 w-[20rem] overflow-hidden rounded-lg border border-gold/25 bg-popover/95 p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-white/5 backdrop-blur-xl"
            >
              <p className="mb-3 font-serif text-sm italic text-gold">Select your stay</p>
              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
                  disabled={!canGoPrev}
                  aria-label="Previous month"
                  className="inline-flex size-8 items-center justify-center rounded-full border border-border/70 text-foreground transition-colors hover:border-gold/40 hover:text-gold disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border/70 disabled:hover:text-foreground"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <p className="font-serif text-base text-foreground">
                  {MONTHS[viewMonth.getMonth()]} <span className="text-gold">{viewMonth.getFullYear()}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
                  aria-label="Next month"
                  className="inline-flex size-8 items-center justify-center rounded-full border border-border/70 text-foreground transition-colors hover:border-gold/40 hover:text-gold"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>

              <div className="mb-2 grid grid-cols-7 gap-1">
                {WEEKDAYS.map((w) => (
                  <div key={w} className="text-center text-[10px] font-medium uppercase tracking-[0.15em] text-gold/60">
                    {w}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-1">
                {cells.map((day, i) => {
                  if (!day) return <div key={`blank-${i}`} />
                  const isPast = day < today
                  const isFrom = sameDay(day, from)
                  const isTo = sameDay(day, to)
                  const inRange = !!(from && to && day > from && day < to)
                  const isEndpoint = isFrom || isTo
                  // Connected range background: fill the cell edges so highlights join up.
                  const rangeBg = isEndpoint || inRange
                  return (
                    <div
                      key={toISO(day)}
                      className={`relative flex items-center justify-center ${
                        rangeBg ? "bg-gold/12" : ""
                      } ${isFrom ? "rounded-l-full" : ""} ${isTo ? "rounded-r-full" : ""}`}
                    >
                      <button
                        type="button"
                        disabled={isPast}
                        onClick={() => handleDayClick(day)}
                        aria-label={day.toDateString()}
                        className={`inline-flex size-9 items-center justify-center rounded-full text-sm transition-colors disabled:cursor-not-allowed disabled:text-muted-foreground/25 ${
                          isEndpoint
                            ? "bg-gold font-semibold text-gold-foreground shadow-[0_2px_10px_-2px_rgba(0,0,0,0.5)]"
                            : inRange
                              ? "text-gold"
                              : "text-foreground hover:bg-gold/15 hover:text-gold"
                        }`}
                      >
                        {day.getDate()}
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setFrom(null)
                    setTo(null)
                  }}
                  className="text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setCalendarOpen(false)}
                  disabled={!from || !to}
                  className="rounded-sm bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  Done
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <FieldShell icon={Users} label="Adults" error={errors.adults}>
          <input
            type="number"
            min={1}
            value={adults}
            onChange={(e) => setAdults(Number.parseInt(e.target.value, 10) || 0)}
            aria-label="Number of adults"
            aria-invalid={!!errors.adults}
            className="w-full bg-transparent text-sm text-foreground focus:outline-none"
          />
        </FieldShell>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-6 py-4 text-sm font-semibold tracking-wide text-gold-foreground transition-opacity hover:opacity-90"
        >
          <Search className="size-4" />
          Search
        </button>
      </div>

      {errors.dates ? (
        <p role="alert" className="mt-1 px-4 text-[11px] leading-tight text-destructive">
          {errors.dates}
        </p>
      ) : null}
    </form>
  )
}

function FieldShell({
  icon: Icon,
  label,
  error,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <div
        className={`flex items-center gap-3 rounded-sm px-4 py-3 transition-colors ${
          error ? "ring-1 ring-destructive" : "hover:bg-secondary/60"
        }`}
      >
        <Icon className="size-5 shrink-0 text-gold" />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
          {children}
        </div>
      </div>
      {error ? (
        <p role="alert" className="mt-1 px-4 text-[11px] leading-tight text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
