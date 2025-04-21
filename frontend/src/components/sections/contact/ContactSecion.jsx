import React from "react";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import TeamLocation from "./TeamLocation";

export default function ContactSecion() {
  return (
    <div className="space-y-10">
      <h2 className="!font-[poppins] text-center text-xl leading-7 lg:text-[40px] lg:leading11 lg:tracking-[-0.4px]">
        Contact Us
      </h2>
      <ContactInfo />
      <div className="flex flex-col gap-4 lg:flex-row">
        <ContactForm />
        <TeamLocation />
      </div>
    </div>
  );
}
