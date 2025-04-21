import ProductCard from "@/components/ui/cards/ProductCard";
import ProductCardSkeleton from "@/components/ui/cards/ProductCardSkeleton";
import Link from "@/components/ui/link/Link";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";

export default function ProductGrid() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "/featured-products?populate[products][populate]=*"
        );
        setData(data);
      } catch (error) {
        setError(error);
        console.error(
          "error happend while calling featured products api:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="mb-10 p-[32px_0_0_32px] space-y-10 lg:p-[48px_0_0_160px] lg:space-y-12">
        <div className="pr-8 flex items-end justify-between lg:pr-40">
          <h2 className="text-[34px] leading-9.5 lg:text-10 lg:leading-11">
            New
            <br /> Arrivals
          </h2>
          <div className="!hidden lg:!flex w-24 h-8 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-custom pb-12 pr-6">
          {[...Array(5)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error || data?.data[0].products.length === 0) return null;

  return (
    <div className="mb-10 p-[32px_0_0_32px] space-y-10 lg:p-[48px_0_0_160px] lg:space-y-12">
      <div className="pr-8 flex items-end justify-between lg:pr-40">
        <h2 className="text-[34px] leading-9.5 lg:text-10 lg:leading-11">
          New
          <br /> Arrivals
        </h2>
        <Link to="/products" className="!hidden lg:!flex">
          Shop Now
        </Link>
      </div>
      <div className="flex items-center gap-6 overflow-x-auto scrollbar-custom pb-12 pr-6">
        {data?.data?.[0]?.products?.map((data, index) => {
          return <ProductCard {...data} key={index} />;
        })}
      </div>
    </div>
  );
}
