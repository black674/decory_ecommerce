import { CardElement } from "@stripe/react-stripe-js";

export default function PaymentMethod() {
  return (
    <div className="py-6 px-4 border rounded-lg">
      <h4 className="leading-6.5 !font-semibold mb-6">Payment Method</h4>
      <hr className="mb-6" />
      <div className="space-y-6">
        <CardElement className="border border-[#ccc] rounded-lg p-2.5" />
      </div>
    </div>
  );
}
