import CartItem from "./cart-items/CartItem";
import { useMemo, useEffect } from "react";
import Button from "@/components/ui/button/Button";
import { RadioGroup } from "@radix-ui/themes";
import { useCart } from "@/provider/cartProvider";
import CartItemSkeleton from "./cart-items/CartItemSkeleton";

export default function ShoppingCart({
  setActiveStep,
  setShippingCost,
  shippingMethod,
  setShippingMethod,
}) {
  const { cart, loading } = useCart();

  const shippingMethods = [
    {
      label: "Free shipping",
      value: "free",
      cost: "$0.00",
    },
    {
      label: "Express shipping",
      value: "express",
      cost: "$15.00",
    },
    {
      label: "Pick Up",
      value: "pickup",
      cost: "%21.00",
    },
  ];

  const getShippingCost = useMemo(() => {
    switch (shippingMethod) {
      case "express":
        return 15.0;
      case "pickup":
        return cart.totalAmount * 0.21;
      default:
        return 0;
    }
  }, [shippingMethod, cart.totalAmount]);

  useEffect(() => {
    setShippingCost(getShippingCost);
  }, [getShippingCost, setShippingCost]);

  const goToCheckout = async () => {
    setActiveStep(1);
  };

  return (
    <div className="py-10 flex flex-col gap-10 lg:py-20 lg:flex-row lg:gap-16">
      <div className="flex-[1.7]">
        <table className="w-full">
          <thead>
            <tr className="!font-semibold leading-6.5 border-b border-natural-600">
              <th className="text-left py-4">Product</th>
              <th className="hidden lg:table-cell text-center">Quantity</th>
              <th className="hidden lg:table-cell text-center">Price</th>
              <th className="hidden lg:table-cell text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <CartItemSkeleton />
            ) : cart?.cartItems?.length > 0 ? (
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
              <tr>
                <td colSpan="4" className="py-10 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-lg font-medium text-natural-700">
                      Your shopping cart is empty
                    </p>
                    <p className="text-natural-600">
                      Add some products to your cart to see them here!
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="h-fit p-4 space-y-4 flex-[1.1] border border-natural-600 rounded-lg lg:p-6">
        <h4 className="!font-semibold text-xl leading-6.5 lg:!font-medium lg:leading-7">
          Cart summary
        </h4>
        <RadioGroup.Root
          size="3"
          defaultValue={shippingMethod}
          name="shippingMethod"
          onValueChange={(value) => setShippingMethod(value)}
          className="!space-y-3"
        >
          {shippingMethods.map((item) => (
            <div
              key={item.value}
              className={`px-4 border rounded-lg flex items-center justify-between gap-2 ${
                item.value === shippingMethod && "bg-natural-200"
              }`}
            >
              <RadioGroup.Item value={item.value} className="py-[13px] !w-full">
                <h4 className="text-sm !font-semibold leading-5.5 lg:text-base lg:leading-6.5 lg:!font-medium">
                  {item.label}
                </h4>
              </RadioGroup.Item>
              <h4 className="text-sm !font-semibold leading-5.5 lg:text-base lg:leading-6.5 lg:!font-medium">
                {item.cost}
              </h4>
            </div>
          ))}
        </RadioGroup.Root>
        <div className="flex flex-col gap-3 pt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${cart.totalAmount.toFixed(2)}</span>
          </div>
          <hr className="text-natural-200" />
          <div className="flex justify-between">
            <span>Total</span>
            <span>${(cart.totalAmount + getShippingCost).toFixed(2)}</span>
          </div>
          <Button
            disabled={cart.totalAmount < 1}
            className={`w-full mt-4 ${
              cart.totalAmount < 1 && "opacity-70 !cursor-not-allowed"
            }`}
            onClick={goToCheckout}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
