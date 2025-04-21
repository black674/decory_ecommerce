import ActiveTab from "@/components/sections/productDetails/ActiveTab";
import ItemOverview from "@/components/sections/productDetails/ItemOverview";
import NewsLetter from "@/layouts/NewsLetter";
import ProductProvider from "@/provider/productProvider";

export default function ProductDetails() {
  return (
    <ProductProvider>
      <ItemOverview />
      <ActiveTab />
      <NewsLetter />
    </ProductProvider>
  );
}
