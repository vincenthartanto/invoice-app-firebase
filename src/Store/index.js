import { configureStore } from "@reduxjs/toolkit";
import { formSlice } from "./FormSlice";
import AuthSlice from "./AuthSlice";

export const store = configureStore({
  reducer: {
    formData: formSlice.reducer,
    auth: AuthSlice.reducer,
  },
});
