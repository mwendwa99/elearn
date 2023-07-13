import { configureStore } from "@reduxjs/toolkit";
import discountSlice from "./discounts/discountSlice";

export const store = configureStore({
  reducer: {
    // ...
    discounts: discountSlice,
  },
});
