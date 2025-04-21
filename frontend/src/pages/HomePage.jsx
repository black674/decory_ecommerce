import ArticlesSection from "@/components/sections/home/ArticlesSection";
import CategorySection from "@/components/sections/home/CategorySection";
import FeaturesSection from "@/components/sections/home/FeaturesSection";
import HeroSection from "@/components/sections/home/HeroSection";
import ProductGrid from "@/components/sections/home/ProductGrid";
import SaleSection from "@/components/sections/home/SaleSection";
import NewsLetter from "@/layouts/NewsLetter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <ProductGrid />
      <FeaturesSection />
      <SaleSection />
      <ArticlesSection />
      <NewsLetter />
    </>
  );
}
