import React from "react";

export default function CartItemSkeleton() {
  return Array(3)
    .fill(0)
    .map((_, index) => (
      <tr key={index} className="border-b border-natural-300 animate-pulse">
        <td className="py-6 w-[60%]">
          <div className="flex justify-between gap-4">
            {/* Product image and details */}
            <div className="flex gap-4">
              <div className="w-20 h-24 bg-natural-200 rounded-md"></div>
              <div className="flex flex-col justify-between gap-1 max-w-[70%]">
                <div className="h-5 bg-natural-200 rounded w-40"></div>
                {/* Color and size */}
                <div className="space-y-1">
                  <div className="h-4 bg-natural-200 rounded w-24"></div>
                  <div className="h-4 bg-natural-200 rounded w-20"></div>
                </div>
                {/* Remove button (desktop) and quantity control (mobile) */}
                <div className="hidden lg:block h-5 bg-natural-200 rounded w-16"></div>
                <div className="block lg:hidden w-20 h-8 bg-natural-200 rounded-lg"></div>
              </div>
            </div>
            {/* Mobile price and remove */}
            <div className="lg:hidden space-y-2 text-end">
              <div className="h-5 bg-natural-200 rounded w-16"></div>
              <div className="h-6 bg-natural-200 rounded w-6 ml-auto"></div>
            </div>
          </div>
        </td>
        {/* Desktop quantity */}
        <td className="hidden lg:table-cell text-center">
          <div className="h-8 bg-natural-200 rounded-lg w-24 mx-auto"></div>
        </td>
        {/* Desktop price */}
        <td className="hidden lg:table-cell text-center">
          <div className="h-5 bg-natural-200 rounded w-16 mx-auto"></div>
        </td>
        {/* Desktop subtotal */}
        <td className="hidden lg:table-cell text-right">
          <div className="h-5 bg-natural-200 rounded w-20 ml-auto"></div>
        </td>
      </tr>
    ));
}
