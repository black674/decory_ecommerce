import { useAuth } from "@/provider/authProvider";
import React from "react";

export default function AccountOrders() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 w-full">
      <h3 className="text-xl !font-semibold leading-8">Orders History</h3>

      <div className="max-h-[600px] overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="!font-semibold leading-6.5 border-b border-natural-300">
              <th className="text-left py-4 px-4 w-[25%] lg:w-[30%]">
                Number ID
              </th>
              <th className="text-center py-4 px-2 w-[25%]">Dates</th>
              <th className="text-center py-4 px-2 w-[25%]">Status</th>
              <th className="text-right py-4 px-4 w-[25%] lg:w-[20%]">Price</th>
            </tr>
          </thead>
          <tbody className="overflow-auto">
            {user?.orders && user.orders.length > 0 ? (
              user.orders.map((order) => (
                <tr
                  key={order.numberId}
                  className="border-b border-natural-300 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-6 px-4">
                    <span className="font-medium">{order.numberId}</span>
                  </td>
                  <td className="text-center py-6 px-2">
                    <span>{order.date}</span>
                  </td>
                  <td className="text-center py-6 px-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full 
                      ${
                        order.status === "Delivered" &&
                        "bg-green-100 text-green-800"
                      }
                      ${
                        [
                          "pending",
                          "Processing",
                          "Shipped",
                          "Out for Delivery",
                        ].includes(order.status) &&
                        "bg-yellow-100 text-yellow-800"
                      }
                      ${
                        [
                          "Failed",
                          "Cancelled",
                          "Returned",
                          "Refunded",
                        ].includes(order.status) && "bg-red-100 text-red-800"
                      }
                      `}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="!font-semibold text-lg leading-7.5 text-right py-6 px-4">
                    <span>${order.price.toFixed(2)}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-10 text-center text-natural-600">
                  <p className="font-medium">No orders found</p>
                  <p className="mt-2">
                    Your order history will appear here once you make a purchase
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
