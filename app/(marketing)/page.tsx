import Announcement from "@/components/marketing/Announcement";
import Navbar from "@/components/marketing/Navbar";

import Hero from "@/components/marketing/Hero";
import WhoItsFor from "@/components/marketing/WhoItsFor";
import HowItWorks from "@/components/marketing/HowItWorks";

export default function HomePage() {
  return (
    <>
      <Announcement />
      <Navbar />

      <main>
        <Hero />
        <WhoItsFor />
        <HowItWorks />
      </main>
    </>
  );
}
