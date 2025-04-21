import { checkTokenExp } from "@/utils/checkTokenExp";
import axios from "@/utils/axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!checkTokenExp(token)) {
      getUser(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  const getUser = async (token) => {
    try {
      const res = await axios.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.status === 401) {
        localStorage.removeItem("jwt");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (items, shippingCost) => {
    if (!user) return;

    const { cartItems, totalAmount } = items;
    const order = {
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      numberId: `#${Math.floor(Math.random() * 10000)}_${Math.floor(
        Math.random() * 1000
      )}`,
      price: totalAmount + shippingCost,
      status: "Processing",
      orderItems: cartItems,
    };

    try {
      const { data } = await axios.put(
        `/users-permissions/user/profile`,
        {
          orders: [...(user.orders || ""), order],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(data);
    } catch (error) {
      console.error("error happend while saving order:", error);
      toast.error("error happend while saving order. please contact support");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, loading, createOrder }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
