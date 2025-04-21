import Link from "@/components/ui/link/Link";
import Section from "@/components/ui/section/Section";

export default function BannerSection() {
  return (
    <Section>
      <div
        className="relative flex flex-col items-center justify-center w-full min-h-[309px] bg-center bg-cover bg-no-repeat lg:min-h-[392px]
        bg-[url(/assets/images/productsBannerMobile.webp)] sm:bg-[url(/assets/images/productsBanner.webp)]"
      >
        <div className="absolute inset-0 bg-black/5" />

        <div className="relative space-y-6 w-full text-center z-10">
          <nav className="mb-3 text-gray-600 text-sm">
            <Link
              style={false}
              addArrow={false}
              to="/"
              className="hover:underline"
            >
              Home
            </Link>{" "}
            /{" "}
            <Link
              style={false}
              addArrow={false}
              to="/products"
              className="hover:underline"
            >
              Products
            </Link>
          </nav>

          <h1 className="!font-poppins text-[40px] leading-11 lg:text-[54px] lg:leading-14.5">
            Products Page
          </h1>
          <p className="leading-6.5 lg:text-xl lg:leading-8">
            Let’s design the place you always imagined...
          </p>
        </div>
      </div>
    </Section>
  );
}
