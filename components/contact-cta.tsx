import { Phone, Mail } from "lucide-react"

export function ContactCta() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/property-skyvilla.png"
          alt=""
          aria-hidden="true"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
              Begin Your Stay
            </p>
            <h2 className="text-balance font-serif text-4xl font-medium leading-tight text-foreground sm:text-5xl">
              Reserve your private Dubai residence
            </h2>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              Share a few details and a lifestyle manager will craft a tailored
              proposal within the hour.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="tel:+97140000000"
                className="flex items-center gap-3 text-foreground transition-colors hover:text-gold"
              >
                <Phone className="size-5 text-gold" /> +971 4 000 0000
              </a>
              <a
                href="mailto:stay@maisondore.ae"
                className="flex items-center gap-3 text-foreground transition-colors hover:text-gold"
              >
                <Mail className="size-5 text-gold" /> stay@maisondore.ae
              </a>
            </div>
          </div>

          <form className="rounded-md border border-border/60 bg-card/80 p-8 backdrop-blur-md">
            <div className="grid grid-cols-1 gap-5">
              <Input label="Full Name" placeholder="Your name" type="text" />
              <Input label="Email" placeholder="you@email.com" type="email" />
              <Input label="Dates" placeholder="Check-in — Check-out" type="text" />
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your ideal stay"
                  className="w-full resize-none rounded-sm border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-1 inline-flex justify-center rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-gold-foreground transition-opacity hover:opacity-90"
              >
                Request Proposal
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function Input({
  label,
  placeholder,
  type,
}: {
  label: string
  placeholder: string
  type: string
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-sm border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
      />
    </div>
  )
}
