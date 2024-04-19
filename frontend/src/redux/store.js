import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

import authReducer from "./auth/authSlice";
import classReducer from "./classroom/classSlice";
import discountReducer from "./discounts/discountSlice";
import cohortReducer from "./cohorts/cohortSlice";
import courseReducer from "./courses/courseSlice";

const persistConfig = {
  key: "root", // key for the root of the state in storage
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  class: classReducer,
  discount: discountReducer,
  cohort: cohortReducer,
  course: courseReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  });

export const store = configureStore({
  middleware,
  reducer: persistedReducer,
});

// Export the persisted version of the store
export const persistor = persistStore(store);
