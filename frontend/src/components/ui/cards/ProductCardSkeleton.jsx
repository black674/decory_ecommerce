export default function ProductCardSkeleton() {
  return (
    <div className="group min-w-[231px] max-w-[231px] space-y-4 xl:min-w-[262px] xl:max-w-[262px] animate-pulse">
      <div className="relative">
        <div className="relative overflow-hidden bg-gray-200 rounded-lg">
          <div className="w-full h-[307px] flex items-center justify-center xl:h-[340px]">
            {/* Placeholder for product image */}
          </div>
          {/* Placeholder for heart button */}
          <div className="absolute top-4 right-4 size-10 bg-gray-300 rounded-full"></div>
          {/* Placeholder for add to cart button */}
          <div className="absolute bottom-3 left-4 right-4 h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {/* Placeholder for NEW tag */}
          <div className="w-14 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>

      <div className="space-y-2 mt-2">
        {/* Placeholder for rating stars */}
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-4 h-4 bg-gray-300 rounded-full"
              ></div>
            ))}
          </div>
          <div className="w-8 h-4 bg-gray-300 rounded ml-1"></div>
        </div>

        {/* Placeholder for title */}
        <div className="w-full h-6 bg-gray-300 rounded"></div>

        {/* Placeholder for price */}
        <div className="flex items-center gap-2">
          <div className="w-16 h-5 bg-gray-300 rounded"></div>
          <div className="w-12 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
