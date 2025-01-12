import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    orderedItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        toast.warn("Product already in cart!", { position: "top-right" });
      } else {
        state.items.push({ ...product, quantity: 1 });
        toast.success(`${product.title} added to cart!`, {
          position: "top-right",
        });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const product = state.items.find((item) => item.id === productId);

      if (product) {
        toast.info(`${product.title} removed from cart!`, {
          position: "top-right",
        });
      }

      return state.items.filter((item) => item.id !== productId);
    },
    incrementQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload);

      if (product) {
        product.quantity += 1;
        toast.info(`Increased quantity of ${product.title}!`, {
          position: "top-right",
        });
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
        toast.info(`Decreased quantity of ${product.title}!`, {
          position: "top-right",
        });
      } else if (product && product.quantity === 1) {
        toast.warn(`Minimum quantity of ${product.title} reached!`, {
          position: "top-right",
        });
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    checkoutCart: (state) => {
      state.orderedItems = [...state.items];
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  checkoutCart,
} = cartSlice.actions;

export default cartSlice.reducer;
