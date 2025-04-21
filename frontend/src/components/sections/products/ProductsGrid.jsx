import Button from "@/components/ui/button/Button";
import ProductCard from "@/components/ui/cards/ProductCard";
import { ProductsSkeleton } from "../../ui/skeleton/ProductsListSkeleton";
import { useNavigate } from "react-router-dom";
import NoProductsFound from "./NoProductsFound";

export default function ProductsGrid({
  data,
  hasMore,
  onLoadMore,
  isLoading,
  loading,
  error,
  searchQuery,
  handleClearFilters,
}) {
  const navigate = useNavigate();

  if (loading) return <ProductsSkeleton />;
  if (error) return navigate("/error");

  if (data.length === 0 && loading === false)
    return (
      <NoProductsFound
        searchQuery={searchQuery}
        onClearFilters={handleClearFilters}
      />
    );

  return (
    <>
      <div className="mx-auto w-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:pb-10">
        {data.map((product) => (
          <ProductCard key={product.documentId} {...product} />
        ))}
      </div>

      <Button
        variant="outline"
        onClick={onLoadMore}
        disabled={isLoading}
        loading={isLoading}
        className={`!rounded-full !px-10 mx-auto ${
          hasMore ? "block" : "hidden"
        }`}
      >
        Show More
      </Button>
    </>
  );
}
