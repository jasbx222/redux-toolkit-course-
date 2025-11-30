import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalQuantity: parseInt(localStorage.getItem("totalQuantity")) || 0,
  totalPrice: parseFloat(localStorage.getItem("totalPrice")) || 0,
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

      state.totalQuantity++;


      if (!existingItem) {
        state.cartItems.push({
          ...item,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }

      state.totalPrice += item.price;
localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (!existingItem) return;

      state.totalQuantity -= existingItem.quantity;
      state.totalPrice -= existingItem.price * existingItem.quantity;

      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },

   increaseQty(state, action) {
  const item = state.cartItems.find((i) => i.id === action.payload);
  if (item) {
    item.quantity++;
    state.totalQuantity++;
    state.totalPrice += item.price;
  }
  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  localStorage.setItem("totalQuantity", state.totalQuantity.toString());
  localStorage.setItem("totalPrice", state.totalPrice.toString());
},

decreaseQty(state, action) {
  const item = state.cartItems.find((i) => i.id === action.payload);
  if (item && item.quantity > 1) {
    item.quantity--;
    state.totalQuantity--;
    state.totalPrice -= item.price;
  }
  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  localStorage.setItem("totalQuantity", state.totalQuantity.toString());
  localStorage.setItem("totalPrice", state.totalPrice.toString());
},

removeFromCart(state, action) {
  const id = action.payload;
  const existingItem = state.cartItems.find((item) => item.id === id);
  if (!existingItem) return;

  state.totalQuantity -= existingItem.quantity;
  state.totalPrice -= existingItem.price * existingItem.quantity;
  state.cartItems = state.cartItems.filter((item) => item.id !== id);

  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  localStorage.setItem("totalQuantity", state.totalQuantity.toString());
  localStorage.setItem("totalPrice", state.totalPrice.toString());
},

clearCart(state) {
  state.cartItems = [];
  state.totalQuantity = 0;
  state.totalPrice = 0;

  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  localStorage.setItem("totalQuantity", state.totalQuantity.toString());
  localStorage.setItem("totalPrice", state.totalPrice.toString());
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
