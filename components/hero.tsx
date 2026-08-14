import { PropertySearch } from "@/components/property-search"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-start justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-dubai-skyline.jpeg"
          className="size-full object-cover"
        >
          <source src="/videos/hero-dubai.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-32 text-center sm:pt-40 lg:pt-48">
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

        <PropertySearch />
      </div>
    </section>
  )
}
