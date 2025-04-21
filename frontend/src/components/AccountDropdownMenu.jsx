import { useAuth } from "@/provider/authProvider";
import { useCart } from "@/provider/cartProvider";
import { Avatar, DropdownMenu, Flex } from "@radix-ui/themes";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function AccountDropdownMenu() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { logout } = useCart();

  if (loading)
    return (
      <div className="block size-8 rounded-full bg-gray-200 animate-pulse" />
    );

  if (user)
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="outline-none border-none">
            <Avatar
              size="2"
              src={user.avatar}
              alt="User avatar"
              fallback={user.name?.slice(0, 1).toUpperCase()}
              radius="full"
              className="lg:inline-block cursor-pointer hover:opacity-80 transition-opacity"
            />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          align="end"
          color="gray"
          highContrast
          className="lg:min-w-[180px]"
        >
          <DropdownMenu.Item
            onClick={() => navigate("/account")}
            className="lg:!text-base"
          >
            <Flex align="center" gap="2">
              <FiUser size={16} />
              <span>Account</span>
            </Flex>
          </DropdownMenu.Item>
          {/*<DropdownMenu.Item
            onClick={() => navigate("/account")}
            className="lg:!text-base"
          >
            <Flex align="center" gap="2">
              <FiSettings size={16} />
              <span>Settings</span>
            </Flex>
          </DropdownMenu.Item>*/}
          <DropdownMenu.Separator />
          <DropdownMenu.Item
            onClick={logout}
            className="lg:!text-base text-red-500"
          >
            <Flex align="center" gap="2">
              <FiLogOut size={16} />
              <span>Log out</span>
            </Flex>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );

  if (!user)
    return (
      <MdAccountCircle
        size={26}
        color="black"
        cursor="pointer"
        onClick={() => navigate("/login")}
      />
    );
}
