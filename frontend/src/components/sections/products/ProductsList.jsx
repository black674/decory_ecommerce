import Section from "@/components/ui/section/Section";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { buildProductsApiUrl } from "@/utils/bulidProductsApiUrl";
import FilterSection from "./FilterSection";
import SearchResultsBar from "./SearchResultsBar";
import ProductsGrid from "./ProductsGrid";
import axios from "@/utils/axios";

export default function ProductsList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(
    new URLSearchParams(location.search).get("search") || ""
  );

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadinMoreProducts, setLoadingMoreProducts] = useState(false);
  const [error, setError] = useState(null);

  const [priceFilter, setPriceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState(
    location.state?.status || "all"
  );

  const [hasMore, setHasMore] = useState(false);
  const limit = 12;

  const fetchProductsData = useCallback(
    async (start, limit) => {
      const apiUrl = buildProductsApiUrl(
        categoryFilter,
        priceFilter,
        start,
        limit
      );
      try {
        const { data } = await axios.get(apiUrl);
        return {
          productsData: data?.data,
          totalProducts: data?.meta?.pagination?.total,
        };
      } catch (error) {
        console.error("error fetching products data", error);
        setError(true);
      }
    },
    [categoryFilter, priceFilter]
  );

  useEffect(() => {
    const urlSearchQuery =
      new URLSearchParams(location.search).get("search") || "";
    setSearchQuery(urlSearchQuery);
  }, [location.search]);

  useEffect(() => {
    const loadInitialProducts = async () => {
      setLoading(true);
      const initialProducts = await fetchProductsData(0, limit);
      setData(initialProducts.productsData);
      setHasMore(
        initialProducts.totalProducts > initialProducts.productsData.length
      );
      setLoading(false);
    };

    loadInitialProducts();
  }, [categoryFilter, priceFilter, fetchProductsData, location.search]);

  const handleLoadMore = async () => {
    setLoadingMoreProducts(true);
    const newProducts = await fetchProductsData(data.length, limit);
    if (newProducts.productsData.length > 0) {
      setData((prevProducts) => [...prevProducts, ...newProducts.productsData]);
      setHasMore(
        newProducts.totalProducts >
          data.length + newProducts.productsData.length
      );
    }
    setLoadingMoreProducts(false);
  };

  const handleClearFilters = () => {
    setPriceFilter("all");
    setCategoryFilter("all");
    if (searchQuery) {
      navigate("/products");
    }
  };

  return (
    <Section className="py-8 lg:py-15 space-y-8 lg:space-y-10">
      <SearchResultsBar
        searchQuery={searchQuery}
        handleClearFilters={handleClearFilters}
      />

      <FilterSection
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
      />

      <ProductsGrid
        data={data}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        isLoading={loadinMoreProducts}
        searchQuery={searchQuery}
        handleClearFilters={handleClearFilters}
      />
    </Section>
  );
}
