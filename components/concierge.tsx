import { Check } from "lucide-react"

const services = [
  "Private chauffeur & luxury car fleet",
  "In-residence private chefs & catering",
  "Yacht charters and desert experiences",
  "Priority reservations at Dubai's finest",
]

export function Concierge() {
  return (
    <section id="concierge" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative overflow-hidden rounded-md border border-border/60">
          <img
            src="/luxbnb/images/concierge.png"
            alt="Private chauffeur service outside a luxury Dubai villa at night"
            className="aspect-[4/5] size-full object-cover"
          />
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            The Concierge
          </p>
          <h2 className="text-balance font-serif text-4xl font-medium leading-tight text-foreground sm:text-5xl">
            Your every wish, anticipated and arranged
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            From the moment you enquire to the day you depart, a dedicated
            lifestyle manager orchestrates every detail of your stay. Simply
            express a desire and consider it done.
          </p>

          <ul className="mt-8 space-y-4">
            {services.map((service) => (
              <li key={service} className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-gold/50">
                  <Check className="size-3.5 text-gold" />
                </span>
                <span className="text-foreground">{service}</span>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="mt-10 inline-flex rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-gold-foreground transition-opacity hover:opacity-90"
          >
            Speak with a Concierge
          </a>
        </div>
      </div>
    </section>
  )
}
