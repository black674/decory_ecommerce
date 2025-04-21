import Link from "@/components/ui/link/Link";
import React from "react";

export default function FeatureSection() {
  return (
    <div className="mb-10 flex flex-wrap flex-col lg:flex-row lg:mb-12">
      <img
        src="/assets/images/saleImage.png"
        alt="image"
        className="w-full lg:max-w-[50%] lg:h-[413px] object-cover object-center"
      />
      <div className="px-8 py-10 bg-natural-200 flex-1 flex flex-col justify-center gap-6 lg:px-18">
        <div className="space-y-4">
          <h2 className="!font-[poppins] text-xl leading-7 lg:text-[40px] lg:leading-11 lg:tracking-[-0.4px]">
            About Us
          </h2>
          <p className="leading-5.5 lg:text-lg lg:leading-6.5">
            Decory is a gift & decorations store based in HCMC, Vietnam. Est
            since 2019.
            <br />
            Our customer service is always prepared to support you 24/7
          </p>
        </div>
        <Link to="/products">Shop Now</Link>
      </div>
    </div>
  );
}
