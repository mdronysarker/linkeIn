import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slice/LoginSlice";

export const store = configureStore({
  reducer: {
    login: authSlice,
  },
});

export default store;
