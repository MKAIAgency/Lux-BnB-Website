import { DemoSwitcher } from "@/components/demo-switcher"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { FeaturedProperties } from "@/components/featured-properties"
import { Experiences } from "@/components/experiences"
import { Concierge } from "@/components/concierge"
import { Testimonials } from "@/components/testimonials"
import { ContactCta } from "@/components/contact-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <DemoSwitcher>
      <SiteHeader />
      <main>
        <Hero />
        <FeaturedProperties />
        <Experiences />
        <Concierge />
        <Testimonials />
        <ContactCta />
      </main>
      <SiteFooter />
    </DemoSwitcher>
  )
}
