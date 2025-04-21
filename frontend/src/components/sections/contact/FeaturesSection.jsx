const features = [
  {
    icon: "/assets/icons/fast-delivery.png",
    title: "Fast Shipping",
    description: "Order above $200",
  },
  {
    icon: "/assets/icons/money.png",
    title: "Money-back",
    description: "30 days guarantee",
  },
  {
    icon: "/assets/icons/lock-01.png",
    title: "Secure Payments",
    description: "Secured by Stripe",
  },
  {
    icon: "/assets/icons/call.png",
    title: "24/7 Support",
    description: "Phone and Email support",
  },
];

export default function FeaturesSection() {
  return (
    <div className="py-4 grid place-items-center grid-cols-2 gap-2 bg-natural-200 lg:grid-cols-4 lg:gap-6">
      {features.map((feature, index) => (
        <div key={index} className="p-[32px_16px] space-y-4 lg:p-[48px_32px]">
          <img
            src={feature.icon}
            alt={feature.title}
            width={48}
            height={48}
            className="size-12"
          />
          <div className="space-y-1">
            <h3 className="!font-semibold text-sm text-natural-900 leading-5.5 lg:text-xl lg:!font-medium lg:!font-poppins lg:leading-7">
              {feature.title}
            </h3>
            <p className="text-sm text-natural-700 leading-5.5 lg:!font-poppins">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
