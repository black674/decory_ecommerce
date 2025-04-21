import { IoClose } from "react-icons/io5";
import Button from "../button/Button";
import Link from "../link/Link";
import { IconButton } from "@radix-ui/themes";
import CartItem from "../cards/CartItem";
import { useCart } from "@/provider/cartProvider";
import { useState } from "react";
import { RiShoppingBag4Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function CartSidebar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, loading } = useCart();
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex items-center gap-1 cursor-pointer">
        <RiShoppingBag4Line size={24} />
        <div className="size-5 rounded-full bg-gray-200 animate-pulse" />
      </div>
    );

  return (
    <>
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => setIsCartOpen(true)}
      >
        <RiShoppingBag4Line size={24} />
        <span
          className={`${
            cart.cartItems.length > 0 ? "opacity-100" : "opacity-0"
          } text-xs font-bold leading-2.5 flex items-center justify-center size-5 rounded-full bg-black text-white`}
        >
          {cart.cartItems.length}
        </span>
      </div>

      {/* open,close sidebar */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-40`}
      />
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-[345px] bg-white transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          <h3 className="!font-poppins text-[28px] leading-8.5">Cart</h3>
          <IconButton
            variant="ghost"
            color="gray"
            highContrast={false}
            radius="full"
            className="!cursor-pointer"
            onClick={() => setIsCartOpen(false)}
          >
            <IoClose size={24} color="#6C7275" />
          </IconButton>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cart.cartItems.length > 0 ? (
            cart.cartItems.map((item) => (
              <CartItem
                key={
                  item.documentId +
                  item.selectedColor.color +
                  item.selectedSize.size
                }
                {...item}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="mb-4 text-natural-600">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001"
                    stroke="#6C7275"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 22H15C19.02 22 19.74 20.39 19.95 18.43L20.7 12.43C20.97 9.99 20.27 8 16 8H8C3.73 8 3.03 9.99 3.3 12.43L4.05 18.43C4.26 20.39 4.98 22 9 22Z"
                    stroke="#6C7275"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.4955 12H15.5045"
                    stroke="#6C7275"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.49451 12H8.50349"
                    stroke="#6C7275"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">Your cart is empty</h4>
              <p className="text-natural-600 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button onClick={() => setIsCartOpen(false)} className="w-full">
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        <div className="p-4 border-t space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total</span>
            <span className="font-medium">${cart.totalAmount.toFixed(2)}</span>
          </div>
          <Button
            onClick={() => {
              navigate("/cart", { state: { activeStep: 1 } })
              setIsCartOpen(false);
            }}
            disabled={cart.totalAmount < 1}
            className={`w-full ${
              cart.totalAmount < 1 ? "!cursor-not-allowed opacity-70" : ""
            }`}
          >
            Checkout
          </Button>
          <Link to="/cart" addArrow={false} className="mx-auto">
            View Cart
          </Link>
        </div>
      </div>
    </>
  );
}
