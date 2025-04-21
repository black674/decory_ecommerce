import ProductCardSkeleton from "@/components/ui/cards/ProductCardSkeleton";
import { Flex } from "@radix-ui/themes";

export const FilterSkeleton = () => (
  <div className="flex flex-wrap items-center justify-between gap-5">
    <div className="flex flex-1 flex-wrap items-center gap-6">
      <Flex direction="column" gap="2" width="260px">
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
      </Flex>
      <Flex direction="column" gap="2" width="260px">
        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
      </Flex>
    </div>
    <div className="flex flex-wrap items-center gap-6">
      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

export const ProductsSkeleton = () => (
  <div className="mx-auto w-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:pb-10">
    {Array.from({ length: 12 }, (_, index) => {
      return <ProductCardSkeleton key={index} />;
    })}
  </div>
);
