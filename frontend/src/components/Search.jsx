import { TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Search({ setIsSearchOpen }) {
  const [mounted, setMounted] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchText.length > 1) {
      navigate(`products?search=${searchText}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <div
      className={`hidden lg:inline-block opacity-0 bg-white rounded-b-xl p-4 mx-40 z-2 absolute right-0 left-0 bottom-0.5 translate-y-[10vh] transition-all duration-300 ${
        mounted ? "translate-y-full opacity-100" : ""
      }`}
    >
      <div>
        <TextField.Root
          size="3"
          autoFocus
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search the products…"
        >
          <TextField.Slot>
            <GoSearch size={24} color="black" />
          </TextField.Slot>
          <TextField.Slot>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="cursor-pointer"
            >
              <IoClose size={24} color="#343839" className="lg:size-6" />
            </button>
          </TextField.Slot>
        </TextField.Root>
      </div>
    </div>
  );
}
