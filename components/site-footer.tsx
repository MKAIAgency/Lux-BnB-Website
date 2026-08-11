const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Residences", href: "#residences" },
      { label: "Experiences", href: "#experiences" },
      { label: "About Us", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "/luxbnb/privacy-policy" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <span className="font-serif text-2xl font-semibold text-foreground">
              LUX <span className="text-gold">BNB</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Beautiful homes for inspired vacations. A curated collection of
              premium Dubai residences with attentive guest service.
            </p>
            <address className="mt-5 max-w-xs text-sm not-italic leading-relaxed text-muted-foreground">
              Concord Tower, Unit 1405, Floor 14, Dubai Media City, Dubai
              &ndash; 450116, U.A.E.
              <br />
              <a href="tel:+97143955536" className="transition-colors hover:text-gold">
                +971 4 395 5536
              </a>
              <br />
              <a
                href="mailto:guestrelations@luxtravels.com"
                className="transition-colors hover:text-gold"
              >
                guestrelations@luxtravels.com
              </a>
            </address>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs uppercase tracking-[0.25em] text-gold">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; 2024 LUX BNB Vacation Homes Rental LLC. All rights reserved.</p>
          <p className="uppercase tracking-[0.2em]">Tourism Licence No: 835805</p>
        </div>
      </div>
    </footer>
  )
}
