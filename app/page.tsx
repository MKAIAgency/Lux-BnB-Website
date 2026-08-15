import { LifestyleHero } from "@/components/lifestyle-hero"
import { FeaturedProperties } from "@/components/featured-properties"
import { Experiences } from "@/components/experiences"
import { Concierge } from "@/components/concierge"
import { Testimonials } from "@/components/testimonials"
import { ContactCta } from "@/components/contact-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
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
