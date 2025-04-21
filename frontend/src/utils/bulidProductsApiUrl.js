export const buildProductsApiUrl = (
  categoryFilter,
  priceFilter,
  start,
  limit
) => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search");

  let apiUrl = `/products?populate=*&pagination[start]=${start}&pagination[limit]=${limit}`;

  if (categoryFilter !== "all") {
    apiUrl += `&filters[categories][id][$eq]=${categoryFilter}`;
  }

  if (searchQuery) {
    apiUrl += `&filters[title][$containsi]=${searchQuery}`;
  }

  if (priceFilter !== "all") {
    switch (priceFilter) {
      case "under-500":
        apiUrl += `&filters[price][$lt]=500`;
        break;
      case "500-1000":
        apiUrl += `&filters[price][$gte]=500&filters[price][$lte]=1000`;
        break;
      case "1000-2000":
        apiUrl += `&filters[price][$gte]=1000&filters[price][$lte]=2000`;
        break;
      case "above-2000":
        apiUrl += `&filters[price][$gt]=2000`;
        break;
      default:
        break;
    }
  }

  return apiUrl;
};
