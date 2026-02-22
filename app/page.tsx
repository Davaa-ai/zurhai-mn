import Navbar from "@/components/landing/navbar";
import HeroSection from "@/components/landing/hero-section";
import CategoriesSection from "@/components/landing/categories-section";
import AncestralKarmaSection from "@/components/landing/ancestral-karma-section";
import FeaturesSection from "@/components/landing/features-section";
import FormSection from "@/components/landing/form-section";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      <Navbar />

      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Categories — Western / Eastern / Tarot etc. */}
      <CategoriesSection />

      {/* Section 3: Ancestral Karma / Tree of Life */}
      <AncestralKarmaSection />

      {/* Section 4: Features */}
      <FeaturesSection />

      {/* Section 5: Form — celestial framed */}
      <FormSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
