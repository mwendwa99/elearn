import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/auth/authSlice";
import classReducer from "./redux/classroom/classSlice";
import discountReducer from "./redux/discounts/discountSlice";
import cohortReducer from "./redux/cohorts/cohortSlice";

// Create store with userSlice reducer
const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    auth: authReducer,
    class: classReducer,
    discounts: discountReducer,
    cohorts: cohortReducer,
  },
});

export default store;
