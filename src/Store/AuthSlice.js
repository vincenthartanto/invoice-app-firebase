import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: undefined,
  },
  reducers: {
    login(state, action) {
      state.currentUser = action.payload.email;
    },
    logout(state) {
      state.currentUser = null;
      localStorage.clear();
    },
  },
});

export default AuthSlice;

export const AuthSliceActions = AuthSlice.actions;
