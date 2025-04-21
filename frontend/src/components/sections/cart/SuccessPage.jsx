import { useWindowSize } from "@react-hook/window-size";
import { useEffect } from "react";
import Confetti from "react-confetti";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Link from "@/components/ui/link/Link";
import Button from "@/components/ui/button/Button";
import { useCart } from "@/provider/cartProvider";

export default function SuccessPage({ orderItems }) {
  const [width, height] = useWindowSize();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    if (!orderItems.length) {
      toast.error("No order items found");
      navigate("/");
    } else {
      window.scrollTo(0, 0);
      clearCart(false);
    }
  }, [navigate, orderItems.length]);

  return (
    <div className="py-10 text-center lg:py-20 px-4 lg:px-40">
      <Confetti
        width={width}
        height={height}
        numberOfPieces={150}
        recycle={false}
      />
      <h1 className="text-4xl font-bold mb-4 text-green-600">
        Purchase Completed Successfully
      </h1>
      <p className="text-lg mb-8">Thanks for using our website ❤️</p>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-left">
          Your Order Items
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {orderItems.map((item) => (
            <div
              key={
                item.documentId +
                item.selectedColor?.color +
                item.selectedSize?.size
              }
              className="relative"
            >
              <Link
                style={false}
                addArrow={false}
                className="inline-block"
                to={`/product/${item.documentId}/${item.title}`}
              >
                <div className="relative overflow-hidden bg-natural-200 rounded-lg">
                  <div className="w-full h-[180px] flex items-center justify-center">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-2 right-2 size-6 rounded-full bg-black text-white flex items-center justify-center">
                    <span className="text-xs font-bold">{item.quantity}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm font-semibold line-clamp-1 text-left">
                  {item.title}
                </p>
                <p className="text-xs text-natural-600 text-left">
                  ${item.price?.toFixed(2)}
                </p>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button onClick={() => navigate("/")}>Continue Shopping</Button>
        </div>
      </div>
    </div>
  );
}
