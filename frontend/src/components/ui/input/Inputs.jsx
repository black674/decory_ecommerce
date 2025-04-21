import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function Inputs({ label, type = "text", error, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2 relative">
      {label && <label>{label}</label>}
      <div className="flex items-center">
        <input
          type={showPassword ? "text" : type}
          {...rest}
          className="w-full !font-normal leading-[26px] text-natural-600 border-b border-natural-300 py-2 px-1 outline-none focus:border-primary"
        />
        {type == "password" &&
          (showPassword ? (
            <IoEyeOffOutline
              size={20}
              className="absolute right-1 cursor-pointer hover:text-gray-700"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEyeOutline
              size={20}
              className="absolute right-1 cursor-pointer hover:text-gray-700"
              onClick={() => setShowPassword(true)}
            />
          ))}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
