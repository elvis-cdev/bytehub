import Announcement from "@/components/marketing/Announcement";
import Navbar from "@/components/marketing/Navbar/Navbar";
import Hero from "@/components/marketing/Hero/Hero";
import WhoItsFor from "@/components/marketing/WhoItsFor";

export default function HomePage() {
  return (
    <>
      <Announcement />
      <Navbar />

      <main>
        <Hero />
        <WhoItsFor />
      </main>
    </>
  );
}
