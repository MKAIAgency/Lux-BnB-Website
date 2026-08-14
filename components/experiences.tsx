import { Gem, Sparkles, ShieldCheck, Clock } from "lucide-react"

const features = [
  {
    icon: Gem,
    title: "Handpicked Residences",
    description:
      "Every home is personally vetted for design, location and impeccable comfort before it joins our collection.",
  },
  {
    icon: Sparkles,
    title: "Bespoke Concierge",
    description:
      "Private chefs, yacht charters, desert safaris and reservations arranged by a dedicated lifestyle manager.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Discreet",
    description:
      "Secure bookings, verified ownership and total privacy for guests who value discretion above all.",
  },
  {
    icon: Clock,
    title: "24/7 Attendance",
    description:
      "Around-the-clock support so every request, at any hour, is met with quiet, seamless efficiency.",
  },
]

const stats = [
  { value: "120+", label: "Private Residences" },
  { value: "18", label: "Prime Districts" },
  { value: "4.98", label: "Average Guest Rating" },
  { value: "24/7", label: "Concierge Service" },
]

export function Experiences() {
  return (
    <section id="experiences" className="border-y border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            Why Maison Doré
          </p>
          <h2 className="text-balance font-serif text-4xl font-medium leading-tight text-foreground sm:text-5xl">
            A stay defined by detail and quiet luxury
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="bg-background p-8">
              <feature.icon className="size-8 text-gold" />
              <h3 className="mt-6 font-serif text-xl text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl font-medium text-gold sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
