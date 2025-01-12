import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../ReduxSlices/products/productsSlice";
import cartReducer from "../ReduxSlices/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});
