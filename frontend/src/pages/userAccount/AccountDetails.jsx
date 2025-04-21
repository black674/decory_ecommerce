import Menu from "@/components/sections/accountDetails/Menu";
import Section from "@/components/ui/section/Section";
import React from "react";
import { Outlet } from "react-router-dom";

export default function AccountDetails() {
  return (
    <Section className="min-h-[90vh] py-10 flex flex-col gap-16 lg:flex-row lg:py-20">
      <Menu />
      <Outlet />
    </Section>
  );
}
