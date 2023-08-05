import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "Login",
  initialState: {
    loggedIn: localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : null,
  },
  reducers: {
    loginUsers: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { loginUsers } = userSlice.actions;
export default userSlice.reducer;
