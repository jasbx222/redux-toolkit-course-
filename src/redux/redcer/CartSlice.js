import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalQuantity: Number(localStorage.getItem("totalQuantity")) || 0,
  totalPrice: Number(localStorage.getItem("totalPrice")) || 0,
};

const recalcTotals = (state) => {
  state.totalQuantity = state.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  state.totalPrice = state.cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
};

const saveToLocalStorage = (state) => {
  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  localStorage.setItem("totalQuantity", state.totalQuantity.toString());
  localStorage.setItem("totalPrice", state.totalPrice.toString());
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (product) => product.id === item.id
      );

      if (!existingItem) {
        state.cartItems.push({ ...item, quantity: 1 });
      } else {
        existingItem.quantity++;
      }

      recalcTotals(state);
      saveToLocalStorage(state);
    },

    increaseQty(state, action) {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        item.quantity++;
      }

      recalcTotals(state);
      saveToLocalStorage(state);
    },

    decreaseQty(state, action) {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }

      recalcTotals(state);
      saveToLocalStorage(state);
    },

    removeFromCart(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);

      recalcTotals(state);
      saveToLocalStorage(state);
    },

    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalQuantity");
      localStorage.removeItem("totalPrice");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
