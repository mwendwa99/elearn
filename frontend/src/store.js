import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";

// Create store with userSlice reducer
const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    auth: authReducer,
  },
});

export default store;
