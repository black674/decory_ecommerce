import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/utils/ProtectedRoute";

import Banner from "@/layouts/Banner";
import NavBar from "@/layouts/NavBar";
import Footer from "@/layouts/Footer";

const HomePage = React.lazy(() => import("@/pages/HomePage"));
const ProductDetails = React.lazy(() => import("@/pages/ProductDetails"));
const ProductsPage = React.lazy(() => import("@/pages/ProductsPage"));
const CartPage = React.lazy(() => import("@/pages/CartPage"));
const ContactPage = React.lazy(() => import("@/pages/ContactPage"));
const MarkdownPage = React.lazy(() => import("@/pages/MarkdownPage"));
const ErrorPage = React.lazy(() => import("@/pages/ErrorPage"));
const AuthPage = React.lazy(() => import("@/pages/AuthPage"));
const AccountDetails = React.lazy(() =>
  import("@/pages/userAccount/AccountDetails")
);
const AccountInfo = React.lazy(() =>
  import("@/components/sections/accountDetails/AccountInfo")
);
const AccountOrders = React.lazy(() =>
  import("@/components/sections/accountDetails/AccountOrders")
);
const AccountAddresses = React.lazy(() =>
  import("@/components/sections/accountDetails/AccountAddresses")
);
const AccountWishlist = React.lazy(() =>
  import("@/components/sections/accountDetails/AccountWishlist")
);

function App() {
  const Layout = () => {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return (
      <>
        <Banner />
        <NavBar />
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/products",
          element: <ProductsPage />,
        },
        {
          path: "/product/:id/:slug",
          element: <ProductDetails />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/pages/:slug",
          element: <MarkdownPage />,
        },
      ],
    },
    {
      path: "/account",
      element: (
        <ProtectedRoute>
          <Banner />
          <NavBar />
          <AccountDetails />
          <Footer />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <AccountInfo />,
        },
        {
          path: "orders",
          element: <AccountOrders />,
        },
        {
          path: "address",
          element: <AccountAddresses />,
        },
        {
          path: "wishlist",
          element: <AccountWishlist />,
        },
      ],
    },
    {
      path: "/login",
      element: <AuthPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
