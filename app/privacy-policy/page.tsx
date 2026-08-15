import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Privacy Policy | LUX BNB",
  description: "How LUX BNB handles privacy and website information.",
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-background">
        <article className="mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">LUX BNB</p>
          <h1 className="mt-5 font-serif text-5xl text-foreground sm:text-6xl">Privacy Policy</h1>
          <p className="mt-6 text-sm text-muted-foreground">Last updated: August 11, 2026</p>

          <div className="mt-16 space-y-12 text-sm leading-7 text-muted-foreground">
            <section>
              <h2 className="font-serif text-2xl text-foreground">1. Website privacy</h2>
              <p className="mt-4">
                LUX BNB Vacation Homes Rental LLC does not collect, sell, or store personal information through this website. We do not use analytics, advertising pixels, tracking cookies, marketing cookies, or user accounts on this site.
              </p>
              <p className="mt-4">
                The property browsing and search experience is provided for information only. We do not retain searches, device identifiers, IP addresses, or browsing histories through our website.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground">2. External booking services</h2>
              <p className="mt-4">
                When you select “Book a Stay” or an enquiry link, you may be taken to Guesty or another third-party service. That service may collect contact, booking, payment, identity, device, and other information required to process your reservation. Its own privacy policy governs that information, not this policy.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground">3. Contacting us</h2>
              <p className="mt-4">
                This website does not submit or store contact forms. If you choose to contact us by telephone or email, the information you provide is handled by the relevant telephone or email provider and by LUX BNB only as needed to respond to your request.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground">4. Cookies and local storage</h2>
              <p className="mt-4">
                We do not intentionally place non-essential cookies or use local browser storage. Essential technical data may be processed by our hosting provider to deliver and secure the website. Browser settings can be used to control cookies and related technologies.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground">5. Third-party links</h2>
              <p className="mt-4">
                Links to booking platforms, telephone services, email services, and other third-party websites are outside our control. Please review their privacy policies before submitting information.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground">6. Your questions</h2>
              <p className="mt-4">
                For privacy questions about LUX BNB, contact guestrelations@luxtravels.com. Because this website does not maintain a personal-information database, requests to access or delete website data will normally have no matching record.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground">7. Policy changes</h2>
              <p className="mt-4">
                We may update this policy when the website, services, or legal requirements change. The latest version will always be published on this page.
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
