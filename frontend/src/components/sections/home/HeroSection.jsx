import ImageCarousel from "@/components/ui/carousel/ImageCarousel";
import Section from "@/components/ui/section/Section";

export default function HeroSection() {
  return (
    <Section className="space-y-8 pb-10">
      <ImageCarousel>
        <img
          src="/assets/images/mainImage.webp"
          loading="eager"
          alt="hero"
          className="w-full"
        />
        <img
          src="/assets/images/mainImage.webp"
          loading="eager"
          alt="hero"
          className="w-full"
        />
        <img
          src="/assets/images/mainImage.webp"
          loading="eager"
          alt="hero"
          className="w-full"
        />
      </ImageCarousel>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <h1 className="text-[40px] leading-11 flex-[1.5] xl:text-7xl xl:leading-19">
          Simply Unique<span className="text-[#6C7275]">/</span>
          <br />
          Simply Better<span className="text-[#6C7275]">.</span>
        </h1>
        <p className="leading-5.5 text-[#6C7275] flex-1 xl:leading-8">
          <span className="font-semibold text-black">Decory</span> is a gift &
          decorations store based in HCMC, Vietnam. Est since 2019.
        </p>
      </div>
    </Section>
  );
}
