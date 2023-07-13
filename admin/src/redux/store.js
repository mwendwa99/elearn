import { configureStore } from "@reduxjs/toolkit";
import discountSlice from "./discounts/discountSlice";
import cohortSlice from "./cohorts/cohortSlice";
import subjectSlice from "./subjects/subjectSlice";

export const store = configureStore({
  reducer: {
    discounts: discountSlice,
    cohorts: cohortSlice,
    subjects: subjectSlice,
  },
});
