import { IconButton } from "@radix-ui/themes";
import { HiOutlineTicket } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Link from "@/components/ui/link/Link";

export default function Banner() {
  const [showBanner, setShowBanner] = useLocalStorage("showBanner", true);
  return (
    <div
      className={`py-2 bg-[#F3F5F7] flex items-center justify-center gap-5.5 
        lg:p-[12px_30px] lg:justify-between ${showBanner ? "" : "hidden"}`}
    >
      <div className="flex items-center justify-center gap-2 lg:gap-3 lg:flex-1">
        <HiOutlineTicket size={18} color="black" className="lg:size-6" />
        <p className="text-xs font-semibold text-[#343839] leading-5 lg:text-base lg:leading-[26px]">
          30% off storewide — Limited time!
        </p>
        <Link to="/products" className="text-secondary-blue !hidden lg:!flex">
          Shop Now
        </Link>
      </div>
      <IconButton
        variant="ghost"
        color="gray"
        highContrast={false}
        className="!cursor-pointer"
        onClick={() => setShowBanner(false)}
      >
        <IoClose size={18} color="#343839" className="lg:size-6" />
      </IconButton>
    </div>
  );
}
