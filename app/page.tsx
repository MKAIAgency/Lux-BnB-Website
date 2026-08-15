import { LifestyleHero } from "@/components/lifestyle-hero"
import { SiteHeader } from "@/components/site-header"
import { FeaturedProperties } from "@/components/featured-properties"
import { Experiences } from "@/components/experiences"
import { Concierge } from "@/components/concierge"
import { Testimonials } from "@/components/testimonials"
import { ContactCta } from "@/components/contact-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <LifestyleHero />
        <FeaturedProperties />
        <Experiences />
        <Concierge />
        <Testimonials />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  )
}
