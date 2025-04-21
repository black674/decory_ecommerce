import React from "react";

const info = [
  {
    title: "address",
    description: "234 Hai Trieu, Ho Chi Minh City, Viet Nam",
    icon: "/assets/icons/address.png",
  },
  {
    title: "contact us",
    description: "+012 345 67890",
    icon: "/assets/icons/call-2.png",
  },
  {
    title: "email",
    description: "hello@Decory.com",
    icon: "/assets/icons/mail.png",
  },
];

export default function ContactInfo() {
  return (
    <div className="grid gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {info.map((item, index) => (
        <div
          key={index}
          className="p-4 bg-natural-200 flex flex-col items-center gap-4 lg:p-[16px_32px]"
        >
          <img
            src={item.icon}
            alt={item.title}
            width={32}
            height={32}
            className="size-8"
          />
          <div className="space-y-2 text-center">
            <h4 className="text-natural-600 !font-bold leading-4 uppercase">
              {item.title}
            </h4>
            <p className="!font-semibold leading-6 max-w-[250px]">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
