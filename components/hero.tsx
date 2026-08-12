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
          preload="auto"
          poster="/luxbnb/luxbnb-hero-poster.jpg"
          className="hero-video size-full object-cover object-center"
          aria-hidden="true"
        >
          <source src="/luxbnb/luxbnb-hero.mp4?v=2" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/10 to-foreground/75" />
        <div className="absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-foreground/65 via-foreground/25 to-transparent lg:block" />
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
