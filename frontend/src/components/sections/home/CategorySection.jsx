import Link from "@/components/ui/link/Link";
import Section from "@/components/ui/section/Section";

export default function CategorySection() {
  return (
    <Section className="grid grid-rows-2 md:grid-cols-2 gap-6">
      <div className="p-10 bg-[#F3F5F7] row-span-2">
        <div className="md:space-y-2 lg:space-y-3 pb-10">
          <h2 className="md:text-2xl md:leading-8 lg:leading-9.5 lg:text-[34px]">
            Living Room
          </h2>
          <Link to="/products" state={{ status: 8 }}>
            Shop Now
          </Link>
        </div>
        <img
          src="/assets/images/category/chair.png"
          alt="chair"
          className="mx-auto md:max-w-[80%]"
        />
      </div>
      <div className="p-10 relative flex justify-end bg-[#F3F5F7]">
        <img
          src="/assets/images/category/drawer.png"
          alt="chair"
          className="w-[60%] md:w-[50%] lg:w-[60%]"
        />
        <div className="absolute bottom-0 left-5 md:space-y-2 lg:space-y-3 pb-10 md:left-8 lg:left-10">
          <h2 className="md:text-2xl md:leading-8 lg:leading-9.5 lg:text-[34px]">
            Bedroom
          </h2>
          <Link to="/products" state={{ status: 10 }}>
            Shop Now
          </Link>
        </div>
      </div>
      <div className="p-10 relative flex justify-end bg-[#F3F5F7]">
        <img
          src="/assets/images/category/toaster.png"
          alt="chair"
          className="w-[60%] md:w-[50%] lg:w-[60%]"
        />
        <div className="absolute bottom-0 left-5 md:space-y-2 lg:space-y-3 pb-10 md:left-8 lg:left-10">
          <h2 className="md:text-2xl md:leading-8 lg:leading-9.5 lg:text-[34px]">
            Kitchen
          </h2>
          <Link to="/products">Shop Now</Link>
        </div>
      </div>
    </Section>
  );
}
