import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { FeaturedProperties } from "@/components/featured-properties"
import { PropertySlideshow } from "@/components/property-slideshow"
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
        <Hero />
        <PropertySlideshow />
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
