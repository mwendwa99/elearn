import { configureStore } from "@reduxjs/toolkit";
import discountSlice from "./discounts/discountSlice";
import cohortSlice from "./cohorts/cohortSlice";

export const store = configureStore({
  reducer: {
    discounts: discountSlice,
    cohorts: cohortSlice,
  },
});
