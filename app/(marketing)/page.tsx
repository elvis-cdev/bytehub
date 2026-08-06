import Announcement from "@/components/marketing/Announcement";
import Hero from "@/components/marketing/Hero/Hero";
import Navbar from "@/components/marketing/Navbar/Navbar";

export default function HomePage() {
  return (
    <>
      <Announcement />
      <Navbar />

      <main>
        <Hero />
      </main>
    </>
  );
}
