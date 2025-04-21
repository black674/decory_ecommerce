import ContactSecion from "@/components/sections/contact/ContactSecion";
import FeatureSection from "@/components/sections/contact/FeatureSection";
import FeaturesSection from "@/components/sections/contact/FeaturesSection";
import HeroSection from "@/components/sections/contact/HeroSection";
import Section from "@/components/ui/section/Section";

export default function ContactPage() {
  return (
    <>
      <Section className="py-10 lg:py-20">
        <HeroSection />
        <FeatureSection />
        <ContactSecion />
      </Section>
      <FeaturesSection />
    </>
  );
}
