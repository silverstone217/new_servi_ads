import CategoriesSection from "@/components/home/CategoriesSection";
import DiscoverSection from "@/components/home/DiscoverSection";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import { oswald } from "@/lib/fonts";

export default function Home() {
  return (
    <div
      className=" mx-auto 
    
    "
    >
      <Header />
      {/* hero */}
      <Hero />
      {/* discover */}
      <DiscoverSection />
      {/* category */}
      <CategoriesSection />

      {/* footer */}
      <footer className="px-6 py-8 bg-secondary">
        <div>
          <p className=" text-center text-lg">
            <strong className={`${oswald.className}`}>SERVI ADS.</strong> &copy;
            2025 Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
}
