import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  useContext,
} from "react";
import axios from "@/utils/axios";
import toast from "react-hot-toast";
import { checkTokenExp } from "@/utils/checkTokenExp";
import nProgress from "nprogress";
import { cartReducer } from "@/reducers/cartReducer";
import { useAuth } from "./authProvider";

const initialCartState = JSON.parse(localStorage.getItem("cart")) || {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

function saveCartToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuth();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/users/me?populate=cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.cart) {
          dispatch({ type: "SET_CART", payload: data.cart });
          setIsLoggedIn(!!data.cart);
        }
      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setLoading(false);
      }
    };

    if (!checkTokenExp(token)) {
      fetchCartData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const updateServerCart = async (cartState) => {
    if (!isLoggedIn) {
      toast.error("User cart not found in the server.");
      return;
    }

    const { data } = await axios.put(
      `/carts/${state.documentId}`,
      {
        data: {
          cartItems: cartState.cartItems,
          totalQuantity: cartState.totalQuantity,
          totalAmount: cartState.totalAmount,
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const updatedCart = data.data;
    return updatedCart;
  };

  const updateCartAction = async (
    actionType,
    payload,
    useProgressBar = true
  ) => {
    if (useProgressBar) {
      nProgress.start();
    }
    const previousState = { ...state };
    const newState = cartReducer(state, { type: actionType, payload });

    dispatch({ type: "SET_CART", payload: newState });

    if (isLoggedIn) {
      try {
        await updateServerCart(newState);
      } catch (err) {
        toast.error("Error updating cart. Please try again later.");
        console.error(
          `Error updating server cart with ${actionType}. Reverting change.`,
          err
        );
        dispatch({ type: "SET_CART", payload: previousState });
      }
    } else {
      saveCartToLocalStorage(newState);
    }
    if (useProgressBar) {
      nProgress.done();
    }
  };

  const setCart = (cart) => {
    dispatch({ type: "SET_CART", payload: cart });
  };

  const addToCart = async (item) => {
    await updateCartAction("ADD_TO_CART", item);
  };

  const removeFromCart = async (itemDetails) => {
    await updateCartAction("REMOVE_FROM_CART", itemDetails);
  };

  const updateCartItemQuantity = async (updateDetails) => {
    await updateCartAction("UPDATE_CART_ITEM_QUANTITY", updateDetails);
  };

  const clearCart = async (useProgressBar = true) => {
    await updateCartAction("CLEAR_CART", null, useProgressBar);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    setIsLoggedIn(false);
    setCart(
      JSON.parse(localStorage.getItem("cart")) || {
        cartItems: [],
        totalQuantity: 0,
        totalAmount: 0,
      }
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        isLoggedIn,
        loading,
        setCart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
