import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import { CustomerProvider } from "./context/CustomerContext";
import { ReviewProvider } from "./context/ReviewContext";
import { MessageProvider } from "./context/MessageContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/animations.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <OrderProvider>
          <CustomerProvider>
            <ReviewProvider>
              <MessageProvider>
                <CartProvider>
                  <WishlistProvider>
                    <App />
                  </WishlistProvider>
                </CartProvider>
              </MessageProvider>
            </ReviewProvider>
          </CustomerProvider>
        </OrderProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
);