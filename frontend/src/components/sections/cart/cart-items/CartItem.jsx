import { useCart } from "@/provider/cartProvider";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function CartItem(data) {
  const { removeFromCart, updateCartItemQuantity } = useCart();

  const handleRrmoveItem = () => {
    removeFromCart({
      id: data.documentId,
      colorId: data.selectedColor.documentId,
      sizeId: data.selectedSize.documentId,
    });
  };

  const handleIncreaseQuantity = () => {
    updateCartItemQuantity({
      id: data.documentId,
      colorId: data.selectedColor.documentId,
      sizeId: data.selectedSize.documentId,
      quantity: data.quantity + 1,
    });
  };
  const handleDecreaseQuantity = () => {
    if (data.quantity > 1) {
      updateCartItemQuantity({
        id: data.documentId,
        colorId: data.selectedColor.documentId,
        sizeId: data.selectedSize.documentId,
        quantity: data.quantity - 1,
      });
    }
  };

  const EditQuentity = ({ className }) => (
    <div
      className={`${className} w-fit py-1.5 px-2 items-center gap-1 border border-natural-600 rounded-lg`}
    >
      <button onClick={handleDecreaseQuantity} className="hover:cursor-pointer">
        <FiMinus size={16} color="black" />
      </button>
      <span className="!font-semibold text-xs leading-5 inline-block w-5 text-center">
        {data.quantity}
      </span>
      <button onClick={handleIncreaseQuantity} className="hover:cursor-pointer">
        <FiPlus size={16} color="black" />
      </button>
    </div>
  );
  const RemoveProduct = ({ className, text = false }) => (
    <button
      onClick={handleRrmoveItem}
      className={`${className} text-natural-600 !font-semibold text-sm leading-5.5 cursor-pointer`}
    >
      <IoClose size={24} />
      {text && text}
    </button>
  );

  return (
    <tr className="border-b border-natural-300">
      <td className="py-6 w-[60%]">
        <div className="flex justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-20 h-24 bg-natural-200">
              <img
                src={data.images[0]}
                alt="image"
                width={80}
                height={96}
                className="h-full min-w-20 max-w-20 object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-1 max-w-[70%]">
              <p className="!font-smeibold text-sm leading-5.5 line-clamp-2">
                {data.title}
              </p>
              <div>
                <p className="text-xs text-natural-600 leading-5">
                  Color: {data.selectedColor.color}
                </p>
                <p className="text-xs text-natural-600 leading-5">
                  Size: {data.selectedSize.size}
                </p>
              </div>
              <RemoveProduct
                text="Remove"
                className="hidden lg:flex items-center"
              />
              <EditQuentity className="inline-flex lg:hidden" />
            </div>
          </div>
          <div className="lg:hidden space-y-2 text-end">
            <h3 className="text-sm !font-semibold leading-5.5 min-w-[60px] inline-block">
              ${data.price.toFixed(2)}
            </h3>
            <RemoveProduct />
          </div>
        </div>
      </td>
      <td className="hidden lg:table-cell text-center w-[15%]">
        <EditQuentity className="inline-flex" />
      </td>
      <td className="hidden lg:table-cell text-lg leading-7.5 text-center w-[15%]">
        <div className="min-w-[60px]">${data.price.toFixed(2)}</div>
      </td>
      <td className="hidden lg:table-cell !font-semibold text-lg leading-7.5 text-right w-[10%]">
        <div className="min-w-[80px]">
          ${(data.price * data.quantity).toFixed(2)}
        </div>
      </td>
    </tr>
  );
}
