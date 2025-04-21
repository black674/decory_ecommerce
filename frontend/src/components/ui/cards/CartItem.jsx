import { useCart } from "@/provider/cartProvider";
import { IconButton } from "@radix-ui/themes";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function CartItem({
  documentId,
  title,
  selectedColor,
  selectedSize,
  price,
  quantity,
  images,
}) {
  const { updateCartItemQuantity, removeFromCart } = useCart();

  const handleRrmoveItem = () => {
    removeFromCart({
      id: documentId,
      colorId: selectedColor.documentId,
      sizeId: selectedSize.documentId,
    });
  };

  const handleIncreaseQuantity = () => {
    updateCartItemQuantity({
      id: documentId,
      colorId: selectedColor.documentId,
      sizeId: selectedSize.documentId,
      quantity: quantity + 1,
    });
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateCartItemQuantity({
        id: documentId,
        colorId: selectedColor.documentId,
        sizeId: selectedSize.documentId,
        quantity: quantity - 1,
      });
    }
  };
  return (
    <div className="p-4 flex gap-4 border-b border-natural-300">
      <img
        src={images[0]}
        alt={title}
        className="w-20 h-24 object-cover rounded-lg"
      />
      <div className="flex-1 flex flex-col justify-between gap-1">
        <div className="flex items-center justify-between">
          <h4 className="!font-semibold text-sm leading-5.5 line-clamp-1">
            {title}
          </h4>
          <span className="!font-semibold text-sm leading-5.5">
            ${price.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-natural-600 leading-5">
              Color: {selectedColor.color}
            </p>
            <p className="text-xs text-natural-600 leading-5">
              Size: {selectedSize.size}
            </p>
          </div>
          <IconButton
            variant="ghost"
            color="gray"
            highContrast={false}
            radius="full"
            onClick={handleRrmoveItem}
            className="!cursor-pointer"
          >
            <IoClose size={24} color="#6C7275" />
          </IconButton>
        </div>

        <div className="w-fit py-1.5 px-2 flex items-center gap-1 border border-natural-600 rounded-lg">
          <button
            onClick={handleDecreaseQuantity}
            className="hover:cursor-pointer"
          >
            <FiMinus size={16} color="black" />
          </button>
          <span className="!font-semibold text-xs leading-5 inline-block w-5 text-center">
            {quantity}
          </span>
          <button
            onClick={handleIncreaseQuantity}
            className="hover:cursor-pointer"
          >
            <FiPlus size={16} color="black" />
          </button>
        </div>
      </div>
    </div>
  );
}
