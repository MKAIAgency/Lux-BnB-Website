import { PropertySearch } from "@/components/property-search"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-start justify-center overflow-hidden bg-foreground">
      <div className="absolute inset-0">
        <img src="/luxbnb/luxbnb-hero.gif" alt="Animated Dubai skyline with the Burj Khalifa and palm trees at night" className="size-full object-cover" />
        <div className="absolute inset-0 bg-foreground/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/25 to-foreground/75" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-44 text-center sm:pt-48 lg:pt-56">
        <p className="luxe-reveal mb-6 text-xs uppercase tracking-[0.45em] text-background drop-shadow-[0_2px_10px_rgb(0_0_0_/_0.8)]">
          LUX BNB Vacation Homes
        </p>
        <h1
          className="luxe-reveal text-balance font-serif text-5xl font-medium leading-[1.05] text-background drop-shadow-[0_3px_18px_rgb(0_0_0_/_0.55)] sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.15s" }}
        >
          {"Beautiful Homes for "}
          <span className="text-gold drop-shadow-[0_3px_12px_rgb(0_0_0_/_0.9)]">Inspired Vacations</span>
        </h1>
        <p
          className="luxe-reveal mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-background drop-shadow-[0_2px_10px_rgb(0_0_0_/_0.65)] sm:text-lg"
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
