"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Search, CalendarDays, Users, ChevronLeft, ChevronRight } from "lucide-react"

const BASE_URL = "https://luxbnb.guestybookings.com/en/properties"

// The company only operates in the UAE, so the country is always fixed.
const COUNTRY = "United Arab Emirates"

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

type PropertySearchProps = {
  selectedDestination?: string
}

export function PropertySearch({ selectedDestination }: PropertySearchProps) {
  const [adults, setAdults] = useState(1)
  const [from, setFrom] = useState<Date | null>(null)
  const [to, setTo] = useState<Date | null>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [calendarOpen, setCalendarOpen] = useState(false)

  const today = startOfDay(new Date())
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const calendarRef = useRef<HTMLDivElement>(null)

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
    if (selectedDestination) params.set("city", selectedDestination)
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
      className="mx-auto mt-8 w-full max-w-3xl rounded-md border border-border/70 bg-card/80 p-3 text-left backdrop-blur-md"
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <div className="relative flex flex-col" ref={calendarRef}>
          <button
            type="button"
            onClick={() => setCalendarOpen((v) => !v)}
            aria-haspopup="dialog"
            aria-expanded={calendarOpen}
            aria-invalid={!!errors.dates}
            className={`flex items-center gap-3 rounded-sm px-4 py-3 text-left transition-colors duration-300 ${
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
              className="absolute left-0 top-full z-30 mt-3 w-[20rem] origin-top overflow-hidden rounded-lg border border-gold/25 bg-popover/95 p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-white/5 backdrop-blur-xl animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-500 ease-luxe"
            >
              <p className="mb-2 text-sm text-gold">Select your stay</p>
              <div className="mb-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
                  disabled={!canGoPrev}
                  aria-label="Previous month"
                  className="inline-flex size-8 items-center justify-center rounded-full border border-border/70 text-foreground transition-colors duration-300 hover:border-gold/40 hover:text-gold disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border/70 disabled:hover:text-foreground"
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
                  className="inline-flex size-8 items-center justify-center rounded-full border border-border/70 text-foreground transition-colors duration-300 hover:border-gold/40 hover:text-gold"
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
                        className={`inline-flex size-8 items-center justify-center rounded-full text-sm transition-all duration-300 ease-luxe disabled:cursor-not-allowed disabled:text-muted-foreground/25 ${
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

              <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
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
                  className="rounded-sm bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold-foreground transition-all duration-300 ease-luxe hover:opacity-90 active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100"
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
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-6 py-4 text-sm font-semibold tracking-wide text-gold-foreground transition-all duration-300 ease-luxe hover:opacity-90 hover:shadow-[0_10px_30px_-8px_var(--gold)] active:scale-[0.98]"
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
