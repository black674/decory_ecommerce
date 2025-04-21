import Button from "@/components/ui/button/Button";

export default function NoProductsFound({ searchQuery, onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-natural-600">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 7.5V6.5C21 5.4 20.1 4.5 19 4.5H5C3.9 4.5 3 5.4 3 6.5V7.5"
            stroke="#6C7275"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 16.5V17.5C21 18.6 20.1 19.5 19 19.5H5C3.9 19.5 3 18.6 3 17.5V16.5"
            stroke="#6C7275"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 12H16"
            stroke="#6C7275"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h4 className="text-lg font-medium mb-2">No products found</h4>
      <p className="text-natural-600 mb-6">
        {searchQuery
          ? `We couldn't find any products matching "${searchQuery}". Try a different search term or clear your search.`
          : "We couldn't find any products matching your current filters. Try adjusting your selection or check back later for new arrivals."}
      </p>
      <Button onClick={onClearFilters} className="!rounded-full !px-10">
        {searchQuery ? "Clear Search" : "Clear Filters"}
      </Button>
    </div>
  );
}
