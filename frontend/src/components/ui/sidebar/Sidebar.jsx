import { IconButton, TextField } from "@radix-ui/themes";

import { IoClose } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { RiShoppingBag4Line } from "react-icons/ri";
import { FiFacebook, FiHeart } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import Button from "../button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "../link/Link";
import { useCart } from "@/provider/cartProvider";
import { useAuth } from "@/provider/authProvider";

export default function Sidebar({ isOpen, onClose }) {
  const [searchText, setSearchText] = useState("");
  const { cart, loading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const links = [
    { name: "Home", link: "/" },
    //{ name: "Shop", link: "/shop" },
    { name: "Product", link: "/products" },
    { name: "Contct Us", link: "/contact" },
  ];

  const handelSeachQuery = () => {
    if (searchText.length > 1) {
      navigate(`products/1?search=${searchText}`);
      setSearchText("");
      onClose();
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-40`}
      />
      <div
        className={`p-6 fixed inset-y-0 left-0 w-full max-w-[345px] bg-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 flex flex-col gap-4`}
      >
        <div className="flex items-center justify-between">
          <h3 className="leading-6">Decory.</h3>
          <IconButton
            variant="ghost"
            color="gray"
            highContrast={false}
            className="!cursor-pointer"
            onClick={onClose}
          >
            <IoClose size={24} color="#6C7275" />
          </IconButton>
        </div>

        <TextField.Root
          size="3"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search the products…"
        >
          <TextField.Slot>
            <button onClick={handelSeachQuery} className="cursor-pointer">
              <GoSearch size={24} color="black"></GoSearch>
            </button>
          </TextField.Slot>
        </TextField.Root>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.name} className="border-b border-natural-300">
                <Link
                  style={false}
                  addArrow={false}
                  to={link.link}
                  className="pb-4 block leading-6 hover:text-gray-600"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4">
          <Link
            style={false}
            addArrow={false}
            to="/cart"
            className="flex items-center justify-between pb-4 border-b border-natural-300"
          >
            <span className="text-[#6C7275]">Cart</span>
            {loading ? (
              <div className="flex items-center gap-1">
                <RiShoppingBag4Line size={24} />
                <div className="size-5 rounded-full bg-gray-200 animate-pulse" />
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <RiShoppingBag4Line size={24} />
                <span className="bg-black text-white size-5 rounded-full flex items-center justify-center text-xs">
                  {cart.cartItems.length}
                </span>
              </div>
            )}
          </Link>
          {user && (
            <Link
              style={false}
              addArrow={false}
              to="/account/wishlist"
              className="flex items-center justify-between pb-4 border-b border-natural-300"
            >
              <span className="text-[#6C7275]">Wishlist</span>
              <div className="flex items-center gap-1">
                <FiHeart size={24} />
                <span className="bg-black text-white size-5 rounded-full flex items-center justify-center text-xs">
                  0
                </span>
              </div>
            </Link>
          )}
        </div>

        {!user && (
          <Button onClick={() => navigate("/login")} className="!py-2">
            Sign In
          </Button>
        )}

        <div className="p-4 flex justify-center gap-6">
          <a href="https://instagram.com">
            <FaInstagram color="black" size={24} />
          </a>
          <a href="https://facebook.com">
            <FiFacebook color="black" size={24} />
          </a>
          <a href="https://youtube.com">
            <AiOutlineYoutube color="black" size={25} />
          </a>
        </div>
      </div>
    </>
  );
}
