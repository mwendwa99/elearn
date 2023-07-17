import { configureStore } from "@reduxjs/toolkit";
import discountSlice from "./discounts/discountSlice";
import cohortSlice from "./cohorts/cohortSlice";
import subjectSlice from "./subjects/subjectSlice";
import authSlice from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    discounts: discountSlice,
    cohorts: cohortSlice,
    subjects: subjectSlice,
  },
});
