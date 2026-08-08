import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { FeaturedProperties } from "@/components/featured-properties"
import { PropertySlideshow } from "@/components/property-slideshow"
import { getSlideshowProperties } from "@/lib/store"
import { Experiences } from "@/components/experiences"
import { Concierge } from "@/components/concierge"
import { Testimonials } from "@/components/testimonials"
import { ContactCta } from "@/components/contact-cta"
import { SiteFooter } from "@/components/site-footer"

export default async function Page() {
  const slideshowProperties = await getSlideshowProperties()

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PropertySlideshow slides={slideshowProperties} />
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
