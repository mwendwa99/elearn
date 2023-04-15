import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import classReducer from "./features/classSlice";

// Create store with userSlice reducer
const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    auth: authReducer,
    class: classReducer,
  },
});

export default store;
