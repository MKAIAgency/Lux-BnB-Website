import { Phone, Mail, MapPin } from "lucide-react"

export function ContactCta() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/luxbnb/images/property-skyvilla.png"
          alt=""
          aria-hidden="true"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">Begin Your Stay</p>
            <h2 className="text-balance font-serif text-4xl font-medium leading-tight text-foreground sm:text-5xl">
              Reserve your private Dubai residence
            </h2>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              Contact us directly or use our secure booking partner to plan your stay. This website does not collect or store your enquiry details.
            </p>

            <div className="mt-10 space-y-4">
              <a href="tel:+97143955536" className="flex items-center gap-3 text-foreground transition-colors hover:text-gold">
                <Phone className="size-5 text-gold" /> +971 4 395 5536
              </a>
              <a href="mailto:guestrelations@luxtravels.com" className="flex items-center gap-3 text-foreground transition-colors hover:text-gold">
                <Mail className="size-5 text-gold" /> guestrelations@luxtravels.com
              </a>
              <p className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 size-5 shrink-0 text-gold" />
                Concord Tower, Unit 1405, Floor 14, Dubai Media City, Dubai&nbsp;&ndash;&nbsp;450116, U.A.E.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-md border border-border/60 bg-card/80 p-8 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Direct contact</p>
            <h3 className="mt-4 font-serif text-3xl text-foreground">A more personal welcome</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Choose the contact method that suits you. Email and telephone conversations are handled by their respective providers and are not submitted through this website.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="mailto:guestrelations@luxtravels.com" className="rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90">
                Email guest relations
              </a>
              <a href="tel:+97143955536" className="rounded-sm border border-gold/50 px-6 py-3 text-sm text-foreground transition-colors hover:border-gold hover:text-gold">
                Call us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
