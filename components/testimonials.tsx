import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "A smooth check in and check out. They serve you Molton Brown soap, and the shower gel and shampoo are amazing.",
    name: "Verified Guest",
    detail: "Opera Grand · Burj, Sea & Fountain View",
  },
  {
    quote:
      "It was a great place to stay — the location is perfect, near everything. The host was a quick responder and flexible.",
    name: "Verified Guest",
    detail: "Opera Grand · Downtown",
  },
  {
    quote:
      "Perfect place! A great apartment with everything you need for a short stay — kitchen, washing machine, and a full view of The Address and the fountain. A definite five-star recommendation.",
    name: "Verified Guest",
    detail: "Act One Tower · Dubai Opera",
  },
]

export function Testimonials() {
  return (
    <section className="border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            Guest Stories
          </p>
          <h2 className="text-balance font-serif text-4xl font-medium leading-tight text-foreground sm:text-5xl">
            Trusted by the world's most discerning travellers
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-md border border-border/60 bg-card p-8"
            >
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="flex-1 text-pretty leading-relaxed text-foreground">
                {`\u201C${t.quote}\u201D`}
              </blockquote>
              <figcaption className="mt-6 border-t border-border/60 pt-6">
                <p className="font-serif text-lg text-gold">{t.name}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {t.detail}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
