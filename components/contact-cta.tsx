"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Phone, Mail, MapPin, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { sendEnquiry, type EnquiryState } from "@/app/actions/send-enquiry"

const initialState: EnquiryState = { status: "idle", message: "" }

export function ContactCta() {
  const [state, formAction] = useActionState(sendEnquiry, initialState)

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
                href="tel:+97143955536"
                className="flex items-center gap-3 text-foreground transition-colors hover:text-gold"
              >
                <Phone className="size-5 text-gold" /> +971 4 395 5536
              </a>
              <a
                href="mailto:guestrelations@luxtravels.com"
                className="flex items-center gap-3 text-foreground transition-colors hover:text-gold"
              >
                <Mail className="size-5 text-gold" /> guestrelations@luxtravels.com
              </a>
              <p className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 size-5 shrink-0 text-gold" />
                Concord Tower, Unit 1405, Floor 14, Dubai Media City,
                Dubai&nbsp;&ndash;&nbsp;450116, U.A.E.
              </p>
            </div>
          </div>

          {state.status === "success" ? (
            <div className="flex flex-col items-center justify-center rounded-md border border-gold/40 bg-card/80 p-8 text-center backdrop-blur-md">
              <CheckCircle2 className="size-12 text-gold" />
              <h3 className="mt-5 font-serif text-2xl text-foreground">
                Enquiry Received
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                {state.message}
              </p>
            </div>
          ) : (
            <form
              action={formAction}
              noValidate
              className="rounded-md border border-border/60 bg-card/80 p-8 backdrop-blur-md"
            >
              <div className="grid grid-cols-1 gap-5">
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="Your name"
                  type="text"
                  error={state.errors?.name}
                />
                <Input
                  label="Email"
                  name="email"
                  placeholder="you@email.com"
                  type="email"
                  error={state.errors?.email}
                />
                <Input
                  label="Dates"
                  name="dates"
                  placeholder="Check-in — Check-out"
                  type="text"
                  error={state.errors?.dates}
                />
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your ideal stay"
                    aria-invalid={!!state.errors?.message}
                    className="w-full resize-none rounded-sm border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-300 focus:border-gold focus:outline-none aria-[invalid=true]:border-destructive"
                  />
                  {state.errors?.message ? (
                    <p className="mt-1.5 text-xs text-destructive">{state.errors.message}</p>
                  ) : null}
                </div>

                {state.status === "error" && !state.errors ? (
                  <p className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="size-4 shrink-0" />
                    {state.message}
                  </p>
                ) : null}

                <SubmitButton />
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-1 inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-gold-foreground transition-all duration-300 ease-luxe hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Sending…
        </>
      ) : (
        "Request Proposal"
      )}
    </button>
  )
}

function Input({
  label,
  name,
  placeholder,
  type,
  error,
}: {
  label: string
  name: string
  placeholder: string
  type: string
  error?: string
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        className="w-full rounded-sm border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-300 focus:border-gold focus:outline-none aria-[invalid=true]:border-destructive"
      />
      {error ? <p className="mt-1.5 text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
