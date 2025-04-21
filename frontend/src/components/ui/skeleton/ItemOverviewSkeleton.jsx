import Section from "@/components/ui/section/Section";

export default function ItemOverviewSkeleton() {
  return (
    <Section className="py-8 flex flex-col gap-8 lg:flex-row lg:gap-15.5 animate-pulse min-h-[90vh]">
      {/* Product Gallery Skeleton */}
      <div className="flex-[1.1] max-w-full overflow-hidden">
        <div className="aspect-square bg-gray-200 rounded-md"></div>
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {[...Array(4)].map((_, index) => (
            <div 
              key={index} 
              className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded-md"
            ></div>
          ))}
        </div>
      </div>

      {/* Product Details Skeleton */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Rating and Title */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </div>

          <div className="w-3/4 h-10 bg-gray-200 rounded"></div>
          <div className="w-full h-20 bg-gray-200 rounded"></div>

          <div className="flex items-center gap-3">
            <div className="w-20 h-8 bg-gray-200 rounded"></div>
            <div className="w-16 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Product Options */}
        <div className="flex flex-col gap-4">
          {/* Measurements */}
          <div className="flex flex-col gap-2">
            <div className="w-32 h-5 bg-gray-200 rounded"></div>
            <div className="w-48 h-4 bg-gray-200 rounded"></div>
          </div>

          {/* Size Selection */}
          <div className="flex flex-col gap-2">
            <div className="w-28 h-5 bg-gray-200 rounded"></div>
            <div className="flex flex-wrap gap-4">
              {[...Array(4)].map((_, index) => (
                <div 
                  key={index} 
                  className="w-12 h-10 bg-gray-200 rounded-md"
                ></div>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="flex flex-col gap-2">
            <div className="w-28 h-5 bg-gray-200 rounded"></div>
            <div className="flex flex-wrap gap-4">
              {[...Array(4)].map((_, index) => (
                <div 
                  key={index} 
                  className="size-10 bg-gray-200 rounded-full"
                ></div>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div className="flex flex-col gap-2">
            <div className="w-24 h-5 bg-gray-200 rounded"></div>
            <div className="w-full h-4 bg-gray-200 rounded"></div>
          </div>

          {/* Care Instructions */}
          <div className="flex flex-col gap-2">
            <div className="w-36 h-5 bg-gray-200 rounded"></div>
            <div className="w-full h-12 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="py-3 px-4 w-32 h-12 bg-gray-200 rounded"></div>
            <div className="grow h-12 bg-gray-200 rounded"></div>
          </div>
          <div className="w-full h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </Section>
  );
}