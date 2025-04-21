import { Theme } from "@radix-ui/themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "nprogress/nprogress.css";
import "./styles/nprogress-custom.css";
import "@radix-ui/themes/styles.css";
import App from "./App.jsx";
import AuthProvider from "./provider/authProvider";
import { CartProvider } from "./provider/cartProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
          <Theme>
            <App />
          </Theme>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
