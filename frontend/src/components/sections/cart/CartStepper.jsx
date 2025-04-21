import Section from "@/components/ui/section/Section";
import { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import ShoppingCart from "./ShoppingCart";
import Checkout from "./Checkout";
import SuccessPage from "./SuccessPage";
import { useLocation } from "react-router-dom";

export default function CartStepper() {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(location.state?.activeStep || 0);
  const [orderItems, setOrderItems] = useState([]);
  const [shippingMethod, setShippingMethod] = useState("free");
  const [shippingCost, setShippingCost] = useState(0);

  const steps = [
    {
      label: "Shopping Cart",
      component: (
        <ShoppingCart
          setActiveStep={setActiveStep}
          setShippingCost={setShippingCost}
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
        />
      ),
    },
    {
      label: "Checkout Details",
      component: (
        <Checkout
          setActiveStep={setActiveStep}
          shippingCost={shippingCost}
          shippingMethod={shippingMethod}
          setOrderItems={setOrderItems}
        />
      ),
    },
    {
      label: "Order Complete",
      component: (
        <SuccessPage orderItems={orderItems} setOrderItems={setOrderItems} />
      ),
    },
  ];

  return (
    <Section className="py-10 lg:py-20 min-h-[80vh]">
      <div className="space-y-6 text-center lg:space-y-10">
        <h2 className="!font-poppins text-[40px] leading-11 lg:text-[54px] lg:leading-14.5">
          Cart
        </h2>
        <Stepper
          activeStep={activeStep}
          styleConfig={{
            activeBgColor: "#141718",
            completedBgColor: "#38CB89",
            inactiveBgColor: "#B1B5C3",
            size: "2.5rem",
            circleFontSize: "1rem",
            borderRadius: "50%",
            fontWeight: 500,
          }}
          className="lg:w-[830px] mx-auto overflow-auto !p-0"
        >
          {steps.map((step, index) => (
            <Step key={index} label={step.label} />
          ))}
        </Stepper>
      </div>
      <div>{steps[activeStep].component}</div>
    </Section>
  );
}
