import { configureStore } from "@reduxjs/toolkit";
import discountSlice from "./discounts/discountSlice";

export const store = configureStore({
  reducer: {
    // ...
    discounts: discountSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
