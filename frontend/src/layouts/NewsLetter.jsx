import { TextField } from "@radix-ui/themes";
import { GoSearch } from "react-icons/go";

export default function NewsLetter() {
  return (
    <div className="bg-natural-200 py-23.5 px-8 flex flex-col items-center justify-center gap-8 lg:bg-[url(/assets/images/newsLetterImage.png)] lg:bg-cover lg:bg-center">
      <div className="space-y-2 lg:space-y-8 text-center">
        <h2 className="!font-poppins text-[28px] leading-8.5 lg:text-[40px] lg:leading-11">
          Join Our Newsletter
        </h2>
        <p className="text-sm text-natural-900 leading-7 lg:text-lg lg:leading-7.5">
          Sign up for deals, new products and promotions
        </p>
      </div>
      <TextField.Root
        size="3"
        placeholder="Enter your email"
        type="email"
        className="w-full max-w-[488px]"
      >
        <TextField.Slot>
          <GoSearch size={24} className="text-primary" />
        </TextField.Slot>
        <TextField.Slot>
          <button className="cursor-pointer text-lg">Sign Up</button>
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
}
