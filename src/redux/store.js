import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './redcer/CartSlice';
import themeReducer from './redcer/ThemeSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
  },
});

export default store;
