import Announcement from "@/components/marketing/Announcement";
import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import TrustedUniversities from "@/components/marketing/TrustedUniversities";
import WhoItsFor from "@/components/marketing/WhoItsFor";
import WhyByteHub from "@/components/marketing/WhyByteHub";
import FeaturedDevelopers from "@/components/marketing/FeaturedDevelopers";
import FeaturedProjects from "@/components/marketing/FeaturedProjects";
import HowItWorks from "@/components/marketing/HowItWorks";
import Testimonials from "@/components/marketing/Testimonials";
import CTA from "@/components/marketing/CTA";
import Footer from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <>
      <Announcement />
      <Navbar />

      <main>
        <Hero />
        <TrustedUniversities />
        <WhoItsFor />
        <WhyByteHub />
        <FeaturedDevelopers />
        <FeaturedProjects />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
