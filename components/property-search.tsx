"use client"

import type React from "react"
import { useState } from "react"
import { Search, MapPin, Globe, CalendarDays, Users, DoorClosed } from "lucide-react"

const BASE_URL = "https://luxbnb.guestybookings.com/en/properties"

// Countries we operate in.
const COUNTRIES = ["United Arab Emirates"]

type FieldErrors = {
  city?: string
  country?: string
  checkIn?: string
  checkOut?: string
  adults?: string
}

function todayISO() {
  const now = new Date()
  const tzOffset = now.getTimezoneOffset() * 60000
  return new Date(now.getTime() - tzOffset).toISOString().slice(0, 10)
}

export function PropertySearch() {
  const [city, setCity] = useState("")
  const [country, setCountry] = useState(COUNTRIES[0])
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [adults, setAdults] = useState(1)
  const [rooms, setRooms] = useState<string>("")
  const [errors, setErrors] = useState<FieldErrors>({})

  const minDate = todayISO()

  function validate(): FieldErrors {
    const next: FieldErrors = {}

    if (!city.trim()) {
      next.city = "Please enter a destination city."
    }
    if (!country.trim()) {
      next.country = "Please select a country."
    }
    if (!checkIn) {
      next.checkIn = "Select a check-in date."
    } else if (checkIn < minDate) {
      next.checkIn = "Check-in cannot be in the past."
    }
    if (!checkOut) {
      next.checkOut = "Select a check-out date."
    } else if (checkIn && checkOut <= checkIn) {
      next.checkOut = "Check-out must be after check-in."
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
    params.set("city", city.trim())
    params.set("country", country)
    params.set("minOccupancy", String(adults))
    params.set("checkIn", checkIn)
    params.set("checkOut", checkOut)
    params.set("adults", String(adults))

    const roomsValue = rooms.trim()
    if (roomsValue !== "") {
      params.set("rooms", roomsValue)
    }

    window.location.href = `${BASE_URL}?${params.toString()}`
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto mt-12 max-w-4xl rounded-md border border-border/70 bg-card/80 p-3 text-left backdrop-blur-md"
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-[1.4fr_1.2fr_1fr_1fr_0.8fr_0.8fr_auto]">
        <FieldShell icon={MapPin} label="Destination" error={errors.city}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Downtown Dubai"
            aria-label="Destination city"
            aria-invalid={!!errors.city}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
        </FieldShell>

        <FieldShell icon={Globe} label="Country" error={errors.country}>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            aria-label="Country"
            aria-invalid={!!errors.country}
            className="w-full bg-transparent text-sm text-foreground focus:outline-none [&>option]:bg-card [&>option]:text-foreground"
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FieldShell>

        <FieldShell icon={CalendarDays} label="Check-in" error={errors.checkIn}>
          <input
            type="date"
            value={checkIn}
            min={minDate}
            onChange={(e) => setCheckIn(e.target.value)}
            aria-label="Check-in date"
            aria-invalid={!!errors.checkIn}
            className="w-full bg-transparent text-sm text-foreground focus:outline-none [color-scheme:dark]"
          />
        </FieldShell>

        <FieldShell icon={CalendarDays} label="Check-out" error={errors.checkOut}>
          <input
            type="date"
            value={checkOut}
            min={checkIn || minDate}
            onChange={(e) => setCheckOut(e.target.value)}
            aria-label="Check-out date"
            aria-invalid={!!errors.checkOut}
            className="w-full bg-transparent text-sm text-foreground focus:outline-none [color-scheme:dark]"
          />
        </FieldShell>

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

        <FieldShell icon={DoorClosed} label="Rooms">
          <input
            type="number"
            min={1}
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            placeholder="Any"
            aria-label="Number of rooms (optional)"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
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
