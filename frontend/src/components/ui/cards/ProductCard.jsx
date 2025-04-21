import { FiHeart } from "react-icons/fi";
import { IoStar, IoStarOutline } from "react-icons/io5";
import Button from "../button/Button";
import Link from "../link/Link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useCart } from "@/provider/cartProvider";
import { useAuth } from "@/provider/authProvider";

export default function ProductCard(data) {
  const [isOutOfStock, setIsOutOfStock] = useState(true);
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const selectedColor = data?.colors?.find((color) => color.stock > 0);
    const selectedSize = data?.sizes?.find((size) => size.stock > 0);

    if (!selectedColor || !selectedSize) {
      setIsOutOfStock(true);
    } else {
      setIsOutOfStock(selectedColor.stock < 1 || selectedSize.stock < 1);
    }
  }, [data]);

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) toast.error("Please login to add to wishlist");
    toast.success("Coming Soon...");
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const selectedColor = data?.colors?.find((color) => color.stock > 0);
    const selectedSize = data?.sizes?.find((size) => size.stock > 0);

    if (!selectedColor || !selectedSize) {
      return toast.error("Please select both a color and size");
    } else if (!selectedColor.color || !selectedSize.size) {
      return toast.error("Invalid color or size selection");
    } else if (selectedSize.stock < 1) {
      return toast.error("Sorry, this size is currently out of stock");
    } else if (selectedColor.stock < 1) {
      return toast.error("Sorry, this color is currently out of stock");
    }
    addToCart({
      ...data,
      quantity: 1,
      selectedColor,
      selectedSize,
    });
  };

  return (
    <Link
      style={false}
      addArrow={false}
      to={`/product/${data?.documentId}/${data?.title}`}
      className="group min-w-[231px] max-w-[231px] space-y-4 cursor-pointer xl:min-w-[262px] xl:max-w-[262px]"
    >
      <div className="relative">
        <div className="relative overflow-hidden bg-natural-200 rounded-lg">
          <div className="w-full h-[307px] flex items-center justify-center xl:h-[340px]">
            <img
              src={data?.images?.[0]}
              alt={data?.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <button
            onClick={handleAddToWishlist}
            className={`z-100 top-4 right-4 size-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 hover:bg-gray-100 shadow-sm cursor-pointer ${
                user ? "absolute" : "hidden"
              }`}
          >
            <FiHeart size={20} />
          </button>
          <Button
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`!py-2 absolute z-100 bottom-3 left-4 right-4 translate-y-14.5 group-hover:translate-y-0 transition-transform duration-300
              ${isOutOfStock && "opacity-70 !cursor-not-allowed"}`}
          >
            {isOutOfStock ? "Out of stock" : "Add to cart"}
          </Button>
        </div>
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {data?.isNew && (
            <span className="text-center py-1 px-3.5 bg-natural-300 rounded !font-bold leading-4">
              NEW
            </span>
          )}
          {data?.discount > 0 && (
            <span className="py-1 px-3.5 bg-secondary-green text-white rounded !font-bold leading-4">
              -{data?.discount}%
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 mt-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="text-natural-700">
              {index < 5 ? <IoStar size={16} /> : <IoStarOutline size={16} />}
            </span>
          ))}
          <span className="text-natural-600 text-sm leading-5">(11)</span>
        </div>

        <h3 className="!font-semibold leading-6.5 group-hover:text-secondary-blue transition-colors duration-300 line-clamp-1">
          {data?.title}
        </h3>

        <div className="flex items-center gap-2">
          <span className="!font-semibold text-sm leading-5.5">
            ${data?.price}
          </span>
          {data?.discount > 0 && (
            <span className="text-sm text-natural-600 leading-5.5 line-through">
              ${Math.abs(data?.price / (data?.discount / 100 - 1)).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
