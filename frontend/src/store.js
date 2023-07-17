import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/auth/authSlice";
import classReducer from "./redux/classroom/classSlice";

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
