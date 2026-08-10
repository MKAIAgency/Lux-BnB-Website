import { ArrowUpRight } from "lucide-react"

export function About() {
  return (
    <section id="about" className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10 lg:py-28">
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
          About LUX BNB
        </p>
        <h2 className="text-balance font-serif text-4xl font-medium leading-tight text-foreground sm:text-5xl">
          Beautiful homes. Thoughtful stays.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          LUX BNB brings together exceptional holiday homes in Dubai with warm,
          attentive service. From the first enquiry to check-out, we make every
          stay feel effortless, personal, and memorable.
        </p>
        <a
          href="#contact"
          className="mt-8 inline-flex items-center gap-2 border-b border-gold/60 pb-2 text-sm tracking-wide text-gold transition-colors hover:border-gold"
        >
          Get to know us
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </section>
  )
}
