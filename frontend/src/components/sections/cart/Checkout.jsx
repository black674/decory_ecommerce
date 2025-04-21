import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkout/CheckoutForm";
import OrderSummary from "./checkout/OrderSummary";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Checkout({
  setActiveStep,
  shippingCost,
  shippingMethod,
  setOrderItems
}) {
  return (
    <Elements stripe={stripePromise}>
      <div className="py-10 lg:py-20 flex flex-col lg:flex-row gap-10 lg:gap-16">
        <CheckoutForm
          setActiveStep={setActiveStep}
          shippingCost={shippingCost}
          setOrderItems={setOrderItems}
        />
        <OrderSummary
          shippingCost={shippingCost}
          shippingMethod={shippingMethod}
        />
      </div>
    </Elements>
  );
}
