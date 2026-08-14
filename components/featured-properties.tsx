import { BedDouble, Bath, Users, MapPin, Star } from "lucide-react"

type Property = {
  name: string
  location: string
  image: string
  price: string
  beds: number
  baths: number
  guests: number
  rating: string
  tag: string
}

const properties: Property[] = [
  {
    name: "Skyline Penthouse",
    location: "Downtown Dubai",
    image: "/images/property-penthouse.png",
    price: "AED 12,500",
    beds: 4,
    baths: 5,
    guests: 8,
    rating: "4.98",
    tag: "Burj Khalifa View",
  },
  {
    name: "Palm Beach Villa",
    location: "Palm Jumeirah",
    image: "/images/property-beach-villa.png",
    price: "AED 24,000",
    beds: 6,
    baths: 7,
    guests: 12,
    rating: "5.0",
    tag: "Private Beach",
  },
  {
    name: "Marina Terrace Residence",
    location: "Dubai Marina",
    image: "/images/property-marina.png",
    price: "AED 9,800",
    beds: 3,
    baths: 4,
    guests: 6,
    rating: "4.95",
    tag: "Rooftop Jacuzzi",
  },
  {
    name: "Golden Dunes Retreat",
    location: "Al Barari",
    image: "/images/property-desert.png",
    price: "AED 18,400",
    beds: 5,
    baths: 6,
    guests: 10,
    rating: "4.97",
    tag: "Desert Escape",
  },
  {
    name: "The Gold Suite",
    location: "Jumeirah",
    image: "/images/property-bedroom.png",
    price: "AED 7,200",
    beds: 2,
    baths: 2,
    guests: 4,
    rating: "4.92",
    tag: "Couples Favourite",
  },
  {
    name: "Azure Sky Villa",
    location: "Business Bay",
    image: "/images/property-skyvilla.png",
    price: "AED 15,600",
    beds: 4,
    baths: 4,
    guests: 8,
    rating: "4.99",
    tag: "Infinity Pool",
  },
]

export function FeaturedProperties() {
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
          <PropertyCard key={property.name} property={property} />
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
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-sm bg-background/80 px-2.5 py-1 text-xs text-foreground backdrop-blur-sm">
          <Star className="size-3.5 fill-gold text-gold" />
          {property.rating}
        </div>
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
            <BedDouble className="size-4 text-gold" /> {property.beds}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="size-4 text-gold" /> {property.baths}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-4 text-gold" /> {property.guests}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <p className="text-foreground">
            <span className="font-serif text-2xl text-gold">{property.price}</span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </p>
          <a
            href="#contact"
            className="rounded-sm border border-border px-4 py-2 text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            Reserve
          </a>
        </div>
      </div>
    </article>
  )
}
