import { useProductsFilter } from "@/hooks/useProductFilters";
import { Flex, Select } from "@radix-ui/themes";
import { FilterSkeleton } from "../../ui/skeleton/ProductsListSkeleton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function FilterSection({
  categoryFilter,
  setCategoryFilter,
  priceFilter,
  setPriceFilter,
}) {
  const navigate = useNavigate();
  const {
    categories,
    priceRanges,
    loading: categoriesLoading,
    error: categoriesError,
  } = useProductsFilter();

  useEffect(() => {
    if (categoriesError) {
      navigate("/error");
    }
  }, [categoriesError, navigate]);

  if (categoriesLoading) {
    return <FilterSkeleton />;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-5">
      <div className="flex flex-1 flex-wrap items-center gap-6">
        <Flex direction="column" gap="2" width="260px">
          <label className="!font-semibold text-natural-600 leading-6.5">
            CATEGORIES
          </label>
          <Select.Root
            size="3"
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <Select.Trigger radius="large">
              {categories.find((cat) => cat.id === categoryFilter)?.label}
            </Select.Trigger>
            <Select.Content position="popper">
              {categories.map((cat) => (
                <Select.Item key={cat.id} value={cat.id}>
                  {cat.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>
        <Flex direction="column" gap="2" width="260px">
          <label className="!font-semibold text-natural-600 leading-6.5">
            Price
          </label>
          <Select.Root
            size="3"
            value={priceFilter}
            onValueChange={setPriceFilter}
          >
            <Select.Trigger radius="large">
              {priceRanges.find((price) => price.value === priceFilter)?.label}
            </Select.Trigger>
            <Select.Content position="popper">
              {priceRanges.map((price) => (
                <Select.Item key={price.value} value={price.value}>
                  {price.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label className="!font-semibold text-natural-600 leading-6.5">
          Sort By:
        </label>
        <div className="flex items-center flex-wrap border border-natural-300">
          <div className="p-1 bg-natural-200">
            <img
              src="/assets/icons/grid-3x3.png"
              alt="grid icon"
              width={22}
              height={22}
              className="size-5.5 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
