import { BedDouble, Bath, Maximize, MapPin } from "lucide-react"
import { getProperties, type Property } from "@/lib/store"

export async function FeaturedProperties() {
  const properties = await getProperties()

  return (
    <section id="residences" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="mb-14 flex flex-col items-end justify-between gap-6 md:flex-row">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            The Collection
          </p>
          <h2 className="max-w-xl text-balance font-serif text-4xl font-medium leading-tight text-foreground sm:text-5xl">
            Signature residences, handpicked for the discerning
          </h2>
        </div>
        <a
          href="#contact"
          className="shrink-0 border-b border-gold/50 pb-1 text-sm tracking-wide text-gold transition-colors hover:border-gold"
        >
          View all residences
        </a>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  )
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group overflow-hidden rounded-md border border-border/60 bg-card transition-colors hover:border-gold/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image || "/placeholder.svg"}
          alt={`${property.name} in ${property.location}`}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
        <span className="absolute left-4 top-4 rounded-sm bg-background/80 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-gold backdrop-blur-sm">
          {property.tag}
        </span>
      </div>

      <div className="p-6">
        <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-gold" />
          {property.location}
        </div>
        <h3 className="font-serif text-2xl font-medium text-foreground">
          {property.name}
        </h3>

        <div className="mt-5 flex items-center gap-5 border-t border-border/60 pt-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BedDouble className="size-4 text-gold" /> {property.beds} Bed
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="size-4 text-gold" /> {property.baths} Bath
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="size-4 text-gold" /> {property.sqft} sq.ft.
          </span>
        </div>

        <div className="mt-5 flex items-center justify-end">
          <a
            href={property.enquireLink || "#contact"}
            target={property.enquireLink ? "_blank" : undefined}
            rel={property.enquireLink ? "noreferrer" : undefined}
            className="rounded-sm border border-border px-4 py-2 text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            Enquire
          </a>
        </div>
      </div>
    </article>
  )
}
