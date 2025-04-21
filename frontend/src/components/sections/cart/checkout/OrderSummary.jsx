import { useCart } from "@/provider/cartProvider";
import CartItem from "@/components/ui/cards/CartItem";

export default function OrderSummary({ shippingCost, shippingMethod }) {
  const { cart } = useCart();

  if (!cart.cartItems?.length) {
    return null;
  }

  return (
    <div className="flex-1 order-1 lg:order-2 border h-fit w-full mx-auto px-4 lg:px-6 py-4 rounded-md">
      <h1 className="text-[28px] leading-none tracking-[-0.6px]">
        Order summary
      </h1>

      <div className="flex w-full flex-col mt-4">
        {cart?.cartItems?.map((item, index) => (
          <CartItem
            key={`${item.selectedSize}-${item.selectedColor}-${index}`}
            {...item}
          />
        ))}

        {/*<CouponField onApply={handleCouponApply} />*/}
      </div>

      <div className="w-full text-base leading-loose mt-4">
        {/*couponApplied && (
        <SummaryField
          title="JenkateMW"
          value="-$25.00"
          icon="https://cdn.builder.io/api/v1/image/assets/868e20c3dba34e79a7f755e9cd961289/07eb4fac44586c93e493595d6ea2fad65dc2314f?placeholderIfAbsent=true"
          isRemovable
          onRemove={handleRemoveCoupon}
        />
      )*/}

        <div className="py-3 flex items-center justify-between border-b border-natural-300">
          <h4 className="text-lg leading-6.5">Shipping</h4>
          <span className="text-lg leading-6.5">{shippingMethod}</span>
        </div>
        <div className="py-3 flex items-center justify-between border-b border-natural-300">
          <h4 className="text-lg leading-6.5">Subtotal</h4>
          <span className="text-lg leading-6.5">
            ${cart?.totalAmount.toFixed(2)}
          </span>
        </div>
        <div className="py-3 flex items-center justify-between border-b border-natural-300">
          <h4 className="text-xl leading-7">Total</h4>
          <span className="text-xl leading-7">
            ${(cart?.totalAmount + shippingCost).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
