import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { FeaturedProperties } from "@/components/featured-properties"
import { PropertySlideshow } from "@/components/property-slideshow"
import { getSlideshowProperties } from "@/lib/store"
import { Experiences } from "@/components/experiences"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { ContactCta } from "@/components/contact-cta"
import { SiteFooter } from "@/components/site-footer"

export default async function Page() {
  const slideshowProperties = await getSlideshowProperties()

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <PropertySlideshow slides={slideshowProperties} />
        <FeaturedProperties />
        <Experiences />
        <About />
        <Testimonials />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  )
}
