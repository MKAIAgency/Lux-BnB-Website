import { PropertySearch } from "@/components/property-search"

export function Hero() {
  return (
    <section className="hero-enter relative flex min-h-screen items-start justify-center overflow-visible bg-background">
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-44 text-center sm:pt-48 lg:pt-56">

        <p className="luxe-reveal mb-6 text-xs uppercase tracking-[0.45em] text-primary">
          LUX BNB Vacation Homes
        </p>
        <h1
          className="luxe-reveal text-balance font-serif text-5xl font-medium leading-[1.05] text-foreground sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.15s" }}
        >
          {"Beautiful Homes for "}
          <span className="text-gold drop-shadow-[0_3px_12px_rgb(0_0_0_/_0.9)]">Inspired Vacations</span>
        </h1>
        <p
          className="luxe-reveal mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: "0.3s" }}
        >
          A handpicked collection of premium apartments and penthouses across
          Dubai&apos;s most sought-after addresses, paired with attentive
          guest service for a flawless stay.
        </p>

        <div className="luxe-reveal" style={{ animationDelay: "0.45s" }}>
          <PropertySearch />
        </div>
      </div>
    </section>
  )
}
