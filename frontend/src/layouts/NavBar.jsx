import { HiMenu } from "react-icons/hi";
import { RiShoppingBag4Line } from "react-icons/ri";
import { GoSearch } from "react-icons/go";
import { useState } from "react";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import CartSidebar from "@/components/ui/sidebar/CartSidebar";
import Link from "@/components/ui/link/Link";
import { useLocation } from "react-router-dom";
import AccountDropdownMenu from "@/components/AccountDropdownMenu";
import Search from "@/components/Search";

const links = [
  { name: "Home", link: "/" },
  //{ name: "Shop", link: "/shop" }, 
  { name: "Products", link: "/products" },
  { name: "Contct Us", link: "/contact" },
];

export default function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { pathname } = useLocation();

  return (
    <>
      <header className="relative p-[16px_32px] flex items-center justify-between lg:px-40">
        <div className="flex items-center gap-1">
          <HiMenu
            size={24}
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          />
          <Link to="/" style={false} addArrow={false}>
            <h3 className="!font-poppins leading-6 lg:text-3xl">Decory.</h3>
          </Link>
        </div>

        <ul className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                style={false}
                addArrow={false}
                className={pathname !== link.link && "!text-natural-600"}
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <GoSearch
            size={24}
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="hidden lg:inline-block cursor-pointer"
          />
          <AccountDropdownMenu />
          <CartSidebar />
        </div>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {isSearchOpen && <Search setIsSearchOpen={setIsSearchOpen} />}
      </header>
    </>
  );
}
