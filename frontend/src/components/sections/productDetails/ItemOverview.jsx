import ProductGallery from "@/components/ui/carousel/ProductGallery";
import Button from "@/components/ui/button/Button";
import Section from "@/components/ui/section/Section";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { useCart } from "@/provider/cartProvider";
import ItemOverviewSkeleton from "../../ui/skeleton/ItemOverviewSkeleton";
import { useProduct } from "@/provider/productProvider";

export default function ItemOverview() {
  const {
    productDetails,
    loading,
    loadingReviews,
    productReviews,
    totalRating,
  } = useProduct();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isOutOfStock, setIsOutOfStock] = useState(true);

  useEffect(() => {
    const firstAvailableColor = productDetails?.colors?.find(
      (color) => color.stock > 0
    );
    const firstAvailableSize = productDetails?.sizes?.find(
      (size) => size.stock > 0
    );
    if (firstAvailableColor) setSelectedColor(firstAvailableColor);
    if (firstAvailableSize) setSelectedSize(firstAvailableSize);
  }, [productDetails]);

  useEffect(() => {
    if (!selectedColor || !selectedSize) {
      setIsOutOfStock(true);
    } else {
      setIsOutOfStock(selectedColor.stock < 1 || selectedSize.stock < 1);
    }
  }, [selectedColor, selectedSize]);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      return toast.error("Please select both a color and size");
    }

    if (!selectedColor.color || !selectedSize.size) {
      return toast.error("Invalid color or size selection");
    }

    if (selectedSize.stock < 1) {
      return toast.error("Sorry, this size is currently out of stock");
    }
    if (selectedColor.stock < 1) {
      return toast.error("Sorry, this color is currently out of stock");
    }

    addToCart({
      ...productDetails,
      quantity,
      selectedColor,
      selectedSize,
    });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  if (loading) return <ItemOverviewSkeleton />;

  return (
    <Section className="py-8 flex flex-col gap-8 lg:flex-row lg:gap-15.5">
      <div className="flex-[1.1] max-w-full overflow-hidden">
        {productDetails?.images && (
          <ProductGallery images={productDetails.images} />
        )}
      </div>
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {loadingReviews ? (
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
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className="text-natural-700">
                    {index < totalRating ? (
                      <IoStar size={16} />
                    ) : (
                      <IoStarOutline size={16} />
                    )}
                  </span>
                ))}
              </div>
              <span className="text-natural-900 text-sm leading-5">
                ({productReviews?.length || 0}) Reviews
              </span>
            </div>
          )}

          <h1 className="!font-poppins text-[40px] leading-11">
            {productDetails?.title}
          </h1>
          <p className="leading-6.5 text-gray-600">{productDetails?.desc}</p>

          <div className="flex items-center gap-3">
            <span className="!font-poppins text-[28px] leading-8.5">
              ${productDetails?.price}
            </span>
            {productDetails?.discount > 0 && (
              <span className="text-xl text-gray-600 leading-7 line-through">
                $
                {Math.abs(
                  productDetails?.price / (productDetails.discount / 100 - 1)
                ).toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {selectedSize?.measurements && (
            <div className="flex flex-col gap-2">
              <span className="text-gray-700 font-medium">Measurements</span>
              <span className="text-gray-600">{selectedSize.measurements}</span>
            </div>
          )}

          {productDetails?.sizes && (
            <div className="flex flex-col gap-2">
              <span className="text-gray-700 font-medium">Choose Size</span>
              <div className="flex flex-wrap gap-4">
                {productDetails.sizes.map((size) => (
                  <button
                    key={size.documentId}
                    onClick={() => setSelectedSize(size)}
                    disabled={size.stock < 1}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize?.documentId === size.documentId
                        ? "border-black bg-natural-200"
                        : "border-gray-200 hover:border-gray-300"
                    }
                    ${
                      size.stock < 1
                        ? "cursor-not-allowed opacity-70"
                        : "cursor-pointer"
                    }`}
                  >
                    {size.size}
                    {size.stock < 1 && (
                      <span className="ml-1 text-xs text-red-500">
                        (Out of stock)
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {productDetails?.colors && (
            <div className="flex flex-col gap-2">
              <span className="text-gray-700 font-medium">Choose Color</span>
              <div className="flex flex-wrap gap-4">
                {productDetails.colors.map((color) => (
                  <button
                    key={color.documentId}
                    onClick={() => setSelectedColor(color)}
                    disabled={color.stock < 1}
                    style={{ backgroundColor: color.hex }}
                    className={`size-10 border rounded-full relative
                    ${
                      selectedColor?.documentId === color.documentId
                        ? "border-black"
                        : "border-gray-400"
                    }
                    ${
                      color.stock < 1
                        ? "cursor-not-allowed opacity-70"
                        : "cursor-pointer"
                    }`}
                  >
                    {color.stock < 1 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-0.5 bg-red-500 rotate-45 rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {productDetails?.materials && (
            <div className="flex flex-col gap-2">
              <span className="text-gray-700 font-medium">Materials</span>
              <span className="text-gray-600">{productDetails.materials}</span>
            </div>
          )}

          {productDetails?.careInstructions && (
            <div className="flex flex-col gap-2">
              <span className="text-gray-700 font-medium">
                Care Instructions
              </span>
              <span className="text-gray-600">
                {productDetails.careInstructions}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="py-3 px-4 flex items-center gap-2 bg-natural-200">
              <button
                onClick={handleDecrement}
                className="hover:cursor-pointer"
              >
                <FiMinus size={20} />
              </button>
              <span className="text-lg !font-semibold leading-6.5 w-7 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="hover:cursor-pointer"
              >
                <FiPlus size={20} />
              </button>
            </div>
            <Button variant="outline" className="grow">
              ❤️ Wishlist
            </Button>
          </div>
          <Button
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`${isOutOfStock && "opacity-70 !cursor-not-allowed"}`}
          >
            {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
          </Button>
        </div>
      </div>
    </Section>
  );
}
