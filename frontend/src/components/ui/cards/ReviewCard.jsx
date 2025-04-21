import { Avatar } from "@radix-ui/themes";
import React from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";

export default function ReviewCard({ title, description, rating, avatar }) {
  return (
    <div className="pb-6 border-b border-natural-200 flex gap-10 max-w-7xl">
      <Avatar
        size="5"
        src={avatar}
        fallback={avatar}
        radius="full"
        className="!hidden lg:!inline-block"
      />
      <div className="space-y-4">
        <div className="flex gap-6">
          <Avatar
            size="5"
            src={avatar}
            fallback={avatar}
            radius="full"
            className="!inline-block lg:!hidden"
          />
          <div className="space-y-1">
            <h4 className="text-xl !font-semibold leading-8">{title}</h4>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <span key={index} className="text-natural-700">
                  {index < rating ? (
                    <IoStar size={16} />
                  ) : (
                    <IoStarOutline size={16} />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-[#353945] leading-6.5">{description}</p>
      </div>
    </div>
  );
}
