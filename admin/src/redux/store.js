import { configureStore } from "@reduxjs/toolkit";
import discountSlice from "./discounts/discountSlice";
import cohortSlice from "./cohorts/cohortSlice";
import subjectSlice from "./subjects/subjectSlice";
import authSlice from "./auth/authSlice";
import userSlice from "./users/userSlice";
import courseSlice from "./courses/courseSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    users: userSlice,
    auth: authSlice,
    discounts: discountSlice,
    cohorts: cohortSlice,
    subjects: subjectSlice,
    courses: courseSlice,
  },
});

// serialize state to local storage
