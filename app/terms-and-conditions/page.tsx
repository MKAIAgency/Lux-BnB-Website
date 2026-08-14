import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | LUX BNB",
  description: "Reservation terms, conditions, and house rules for LUX BNB Vacation Homes Rental LLC.",
}

const sections = [
  {
    title: "Preamble",
    paragraphs: [
      "Your reservation and accommodation agreement with the Operator involving the Property, whether made directly or through a third party such as a travel agent, is subject to these Reservation Terms and Conditions and the House Rules set out here.",
      "By making a reservation online or by telephone, you confirm that you have read, understood, and accepted these Reservation Terms and Conditions and the House Rules.",
      "Reservations made through a travel agent or other third party create a separate legal relationship with that party. The Operator is not responsible for that party's acts or omissions, including compliance with the Reservation Privacy Policy.",
      "Your reservation also incorporates the terms and conditions for using the Operator's website and any relevant terms linked from it.",
    ],
  },
  {
    title: "1. Definition of Terms",
    items: [
      ["Operator", "Lux BnB Vacation Homes Rental LLC, a holiday homes rental operator based in Dubai registered under DED / DTCM license 835805."],
      ["Property or Premises", "The licensed holiday home Property, also referred to as a vacation home, rented to the Guest and identified in the Reservation Form."],
      ["Guest or Guests", "Any individual or group with a confirmed booking from the Operator for temporary use of the Property as a vacation home."],
      ["Visitors", "Individuals visiting the Property who are not permitted to stay overnight unless a separate confirmed booking is obtained."],
    ],
  },
  {
    title: "2. Rights of Property Usage",
    bullets: [
      "Guests agree to rent the Property for the length and rate designated on the Reservation Form. Extensions or rate adjustments require the Operator's prior written approval.",
      "Guests receive limited permission to occupy the Property for temporary accommodation only. This agreement is not a residential tenancy agreement under Dubai residential tenancy legislation.",
      "Guests may not assign, sublet, or grant a license to use the Property without the Operator's prior written consent.",
      "Guests or Visitors below 21 years old must be accompanied by adults during check-in and while at the Premises.",
      "All Guests and Visitors must present original, valid identification documents such as an Emirates ID or passport at check-in. Entry may be denied without acceptable identification.",
      "The Guest must present the credit or debit card used for an online reservation at check-in. Reservations made with an invalid card may be cancelled immediately.",
      "Failure to comply with these obligations may result in immediate vacation of the Property, forfeiture of payments, and no refund claim.",
      "Guests travelling with pets should confirm the Property's pet policy directly with the Operator. A damage or cleaning deposit may apply.",
    ],
  },
  {
    title: "3. Reservation",
    paragraphs: ["Reservations and services are confirmed and guaranteed only when all outstanding rent, security deposits, fees, and taxes have been paid and the Operator has sent a confirmation email containing the booking number and reservation details."],
  },
  {
    title: "4. Security Deposit & Damages",
    paragraphs: ["Guests are responsible for damage to the Property, furniture, equipment, common areas, or other property caused intentionally or negligently by them, their Visitors, or pets."],
    bullets: [
      "A security deposit, determined by the Operator, is payable by cash or card at check-in.",
      "The deposit will normally be returned within seven days after check-out, or later where additional time is reasonably required to identify or replace missing or damaged items.",
      "The Operator may deduct repair, replacement, cleaning, key, access-card, remote-control, smoking, pet, community, utility, service, late check-out, or government charges from the deposit where applicable.",
      "If the deposit does not cover the charges incurred, the Guest must pay the remaining balance on demand.",
    ],
  },
  {
    title: "5. Rates, Currency & Taxes",
    bullets: [
      "Final rent and service rates are subject to 5% VAT.",
      "The Tourism Dirham Fee applies to the first 30 consecutive nights from check-in.",
      "Long stays are limited to three months per Reservation under DTCM requirements, after which the Reservation must be renewed and the Tourism Dirham Fee applies again.",
      "The default currency is AED. Currency conversion, card-provider charges, and bank fees may affect the final amount received or refunded.",
    ],
  },
  {
    title: "6. Cancellation, Changes & Refunds",
    bullets: [
      "Unless otherwise stated in the Reservation Form or required by applicable law, rental payments, deposits toward rent, booking payments, and service payments are non-refundable, non-transferable, and non-amendable.",
      "Cancellation, change requests, or no-shows may incur a fee equal to the entire stay.",
      "The security deposit remains refundable subject to these Terms and Conditions.",
      "If the Operator cancels a reservation without valid reason, the amount paid will be refunded without additional liability.",
      "Neither party is liable for changes or cancellations caused by events beyond reasonable control, including acts of God, terrorism, weather, strikes, riots, war, earthquakes, volcanic activity, tsunamis, fire, explosions, or qualifying public-health events.",
    ],
  },
  {
    title: "7. Penalties and Eviction",
    paragraphs: ["In addition to remedies available under applicable law, the Operator may forfeit the security deposit or immediately evict a Guest for repeated or serious violations, including:"],
    bullets: ["Loud music, parties, or inappropriate noise between 10:00 PM and 8:00 AM.", "Trespassing, blocking security barriers, illegal parking, or abusing community or Operator staff.", "Smoking inside the Property.", "Illegal activity, disturbance, damage, or unauthorized access involving neighbours, community property, or items.", "Animal residue requiring special cleaning, which may incur a minimum AED 2,500 cleaning charge.", "Improper garbage disposal."],
  },
  {
    title: "8. Liability Waiver",
    paragraphs: ["To the extent permitted by applicable law, the Guest is responsible for personal belongings and agrees to indemnify the Operator for loss, theft, damage, injury, illness, or death involving Guests or Visitors. The Operator is not responsible for circumstances beyond its reasonable control, including natural disasters, utility interruptions, equipment failures, facility restrictions, or emergency evacuations. Guests are encouraged to obtain travel protection insurance."],
  },
  {
    title: "9. Reservation Privacy",
    paragraphs: ["Personal data, including copies of passports, valid IDs, and similar documents, provided directly or through the website during the reservation process is Reservation Data. The Operator may process and share Reservation Data as necessary to fulfil the reservation, register Guests with building or community management and Dubai authorities, and comply with lawful requests from CID, Dubai Police, or other official authorities."],
  },
  {
    title: "10. Governing Law and Jurisdiction",
    paragraphs: ["These Reservation Terms and Conditions are governed by the laws of the Emirate of Dubai and applicable UAE Federal Laws. Disputes will be subject to the exclusive jurisdiction of the regular courts in Dubai."],
  },
]

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/60 px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">LUX BNB Vacation Homes Rental LLC</p>
          <h1 className="mt-5 font-serif text-5xl text-foreground sm:text-6xl">Terms &amp; Conditions</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">Reservation terms, property usage requirements, house rules, and legal information for Guests and Visitors.</p>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-14 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-12">
          {sections.map((section) => (
            <section key={section.title} aria-labelledby={section.title.replaceAll(" ", "-").toLowerCase()}>
              <h2 id={section.title.replaceAll(" ", "-").toLowerCase()} className="font-serif text-3xl text-foreground">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-5 text-base leading-8 text-muted-foreground">{paragraph}</p>)}
              {section.items && <dl className="mt-5 flex flex-col gap-4">{section.items.map(([term, definition]) => <div key={term}><dt className="font-medium text-foreground">{term}</dt><dd className="mt-1 text-base leading-8 text-muted-foreground">{definition}</dd></div>)}</dl>}
              {section.bullets && <ul className="mt-5 flex list-disc flex-col gap-3 pl-6 text-base leading-8 text-muted-foreground">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </section>
          ))}
        </div>
        <p className="mt-16 border-t border-border/60 pt-8 text-sm leading-6 text-muted-foreground">These terms were last modified on 6 March 2023. Any person booking or pre-booking a stay automatically agrees to these Reservation Terms &amp; Conditions and the applicable House Rules.</p>
      </article>
    </main>
  )
}
