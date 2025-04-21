import Link from "@/components/ui/link/Link";

export default function SaleSection() {
  return (
    <div className="flex flex-wrap flex-col lg:flex-row">
      <img
        src="/assets/images/saleImage.png"
        loading="lazy"
        alt="image"
        className="w-full flex-1"
      />
      <div className="px-8 py-10 bg-natural-200 flex-1 flex flex-col justify-center gap-6 lg:px-18">
        <div className="space-y-4">
          <h4 className="!font-bold text-secondary-blue leading-4">
            SALE UP TO 35% OFF
          </h4>
          <h3 className="!font-poppins text-[34px] leading-9.5 lg:text-[40px] lg:leading-11">
            HUNDREDS of
            <br /> New lower prices!
          </h3>
          <p className="max-w-[450px] leading-6.5 lg:text-xl lg:leading-8">
            It’s more affordable than ever to give every room in your home a
            stylish makeover
          </p>
        </div>
        <Link to="/products">Shop Now</Link>
      </div>
    </div>
  );
}
