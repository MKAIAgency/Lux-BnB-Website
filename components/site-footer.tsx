const footerLinks = [
  {
    title: "Explore",
    links: ["Residences", "Experiences", "Concierge", "Destinations"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Partnerships"],
  },
  {
    title: "Support",
    links: ["Contact", "FAQ", "Privacy Policy", "Terms of Service"],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-2xl font-semibold text-foreground">
              Maison <span className="text-gold">Doré</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              An exclusive collection of Dubai&apos;s finest private residences,
              paired with white-glove concierge service.
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs uppercase tracking-[0.25em] text-gold">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Maison Doré. All rights reserved.</p>
          <p className="uppercase tracking-[0.2em]">Dubai · United Arab Emirates</p>
        </div>
      </div>
    </footer>
  )
}
