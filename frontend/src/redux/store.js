import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

import authReducer, { listenForAuthChanges } from "./auth/authSlice";
import classReducer from "./classroom/classSlice";
import discountReducer from "./discounts/discountSlice";
import cohortReducer from "./cohorts/cohortSlice";
import courseReducer from "./courses/courseSlice";

const persistConfig = {
  key: "root", // key for the root of the state in storage
  storage,
};

const appReducer = combineReducers({
  auth: authReducer,
  class: classReducer,
  discount: discountReducer,
  cohort: cohortReducer,
  course: courseReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  });

const store = configureStore({
  middleware,
  reducer: persistedReducer,
});

store.dispatch(listenForAuthChanges());

// Export the persisted version of the store
const persistor = persistStore(store);

export { store, persistor };
