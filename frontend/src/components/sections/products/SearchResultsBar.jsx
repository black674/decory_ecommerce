import Button from "@/components/ui/button/Button";

export default function SearchResultsBar({ searchQuery, handleClearFilters }) {
  if (!searchQuery) return null;

  return (
    <div className="w-full bg-natural-100 p-4 rounded-lg flex justify-between items-center">
      <p className="text-natural-800">
        Showing search results for:{" "}
        <span className="font-semibold">"{searchQuery}"</span>
      </p>
      <Button
        variant="outline"
        onClick={handleClearFilters}
        className="!rounded-full !px-6"
      >
        Clear Search
      </Button>
    </div>
  );
}
