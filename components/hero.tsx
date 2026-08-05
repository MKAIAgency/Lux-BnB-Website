import { Search, MapPin, CalendarDays, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero-dubai-skyline.jpeg"
          alt="Dubai skyline at dusk featuring the Burj Khalifa and the Address Residences towers against a deep blue sky"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-28 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-gold">
          Curated Private Residences
        </p>
        <h1 className="text-balance font-serif text-5xl font-medium leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
          Live the Golden Standard of{" "}
          <span className="text-gold">Dubai Living</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          An exclusive collection of villas, penthouses and sky residences,
          each paired with bespoke concierge service for a flawless stay.
        </p>

        <div className="mx-auto mt-12 max-w-3xl rounded-md border border-border/70 bg-card/80 p-3 backdrop-blur-md">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1.3fr_1fr_1fr_auto]">
            <Field icon={MapPin} label="Destination" value="Palm Jumeirah" />
            <Field icon={CalendarDays} label="Dates" value="Add dates" />
            <Field icon={Users} label="Guests" value="2 guests" />
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-6 py-4 text-sm font-semibold tracking-wide text-gold-foreground transition-opacity hover:opacity-90"
            >
              <Search className="size-4" />
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-sm px-4 py-3 text-left transition-colors hover:bg-secondary/60">
      <Icon className="size-5 shrink-0 text-gold" />
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  )
}
