import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebaseConfig";
import {
  setDiscounts,
  setLoading,
  clearError,
  setError,
} from "./discountSlice";

export const getDiscounts = createAsyncThunk(
  "discounts/getDiscounts",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const querySnapshot = await getDocs(collection(db, "discounts"));
      const discounts = [];
      querySnapshot.forEach((doc) => {
        discounts.push({ ...doc.data(), discountId: doc.id });
      });
      dispatch(setDiscounts(discounts));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);
