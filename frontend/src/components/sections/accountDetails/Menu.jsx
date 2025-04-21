import Link from "@/components/ui/link/Link";
import { useAuth } from "@/provider/authProvider";
import { useCart } from "@/provider/cartProvider";
import { Avatar, Select } from "@radix-ui/themes";
import { useWindowWidth } from "@react-hook/window-size";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { link: "/account", label: "Account" },
  { link: "/account/address", label: "Address" },
  { link: "/account/orders", label: "Orders" },
  { link: "/account/wishlist", label: "Wishlist" },
];

export default function Menu() {
  const widht = useWindowWidth();
  const { user } = useAuth();
  const { logout } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      className="min-w-[262px] w-full h-fit flex flex-col items-center bg-natural-200  font-semibold px-4 py-10 rounded-lg lg:max-w-[262px] "
      aria-label="User navigation"
    >
      <div className="flex flex-col items-center text-xl text-black leading-[1.6]">
        <Avatar
          size="7"
          src={user.avatar}
          alt="User avatar"
          fallback={user.name?.slice(0, 1).toUpperCase()}
          radius="full"
        />
        <div className="mt-1.5 font-semibold">{user.name}</div>
      </div>

      <div className="w-full text-natural-600 leading-loose mt-10">
        {widht > 1006 ? (
          menuItems.map((item) => (
            <Link
              style={false}
              addArrow={false}
              to={item.link}
              key={item.link}
              className={`inline-block w-full text-left whitespace-nowrap mt-3 py-2 border-b border-solid
                transition-colors duration-200 hover:text-natural-900 ${
                  item.link === pathname
                    ? "border-b-natural-900 text-natural-900"
                    : "border-b-transparent text-natural-600"
                }`}
            >
              {item.label}
            </Link>
          ))
        ) : (
          <Select.Root
            size="3"
            value={pathname}
            onValueChange={(value) => navigate(value)}
          >
            <Select.Trigger className="!w-full">
              <span>
                {menuItems.find((item) => item.link === pathname)?.label ||
                  "Account"}
              </span>
            </Select.Trigger>
            <Select.Content position="popper">
              {menuItems.map((item) => (
                <Select.Item key={item.link} value={item.link}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        )}
        <button
          onClick={logout}
          className="hidden lg:inline-block w-full text-left whitespace-nowrap mt-3 py-2
            transition-colors duration-200 hover:text-natural-900 cursor-pointer"
        >
          logout
        </button>
      </div>
    </nav>
  );
}
