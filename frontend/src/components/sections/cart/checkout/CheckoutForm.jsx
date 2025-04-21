import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "@/utils/axios";
import toast from "react-hot-toast";
import Button from "@/components/ui/button/Button";
import ContactInformation from "./ContactInformation";
import ShippingAddress from "./ShippingAddress";
import PaymentMethod from "./PaymentMethod";
import { checkoutSchema } from "./checkoutSchema";
import { useCart } from "@/provider/cartProvider";
import { useAuth } from "@/provider/authProvider";

export default function CheckoutForm({
  setActiveStep,
  shippingCost,
  setOrderItems,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      streetAddress: "",
      country: "",
      city: "",
      state: "",
      zip: "",
    },
    resolver: zodResolver(checkoutSchema),
  });
  const { cart } = useCart();
  const { createOrder } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const { data } = await axios.post(
          "/create-payment-intent",
          {
            amount: cart.totalAmount + shippingCost,
            currency: "usd",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    getClientSecret();
  }, [shippingCost, cart.totalAmount]);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      country,
      city,
      state,
      zip,
    } = data;

    setLoadingPayment(true);
    toast.loading("processing payment...", {
      id: "payment",
    });

    if (!stripe || !elements || !clientSecret) {
      toast.error("Something went wrong, please try again later", {
        id: "payment",
      });
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: firstName + " " + lastName,
            email: email,
            phone: phoneNumber,
            address: {
              line1: streetAddress,
              city: city,
              state: state,
              country: country,
              postal_code: zip,
            },
          },
        },
        shipping: {
          name: firstName + " " + lastName,
          phone: phoneNumber,
          address: {
            line1: streetAddress,
            city: city,
            state: state,
            postal_code: zip,
            country: country,
          },
        },
      }
    );

    if (error) {
      console.error(error.message);
      toast.error(error.message, {
        id: "payment",
      });
    } else if (paymentIntent.status === "succeeded") {
      await setOrderItems(cart.cartItems);
      await createOrder(cart, shippingCost);
      toast.success("Payment succeeded", {
        id: "payment",
      });
      setActiveStep(2);
    }

    setLoadingPayment(false);
  };

  if (loading) {
    return (
      <div className="flex-[1.5] flex justify-center py-10 lg:py-20">
        <div
          className="loading-spinner w-12 h-12"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-[1.5] space-y-10 order-2 lg:order-1"
    >
      <ContactInformation register={register} errors={errors} />
      <ShippingAddress register={register} errors={errors} />
      <PaymentMethod />
      <Button
        type="submit"
        disabled={!stripe || loadingPayment}
        loading={loadingPayment}
        className={`w-full ${
          !stripe || loadingPayment ? "!cursor-not-allowed hover:!bg-black" : ""
        }`}
      >
        Place Order
      </Button>
    </form>
  );
}
