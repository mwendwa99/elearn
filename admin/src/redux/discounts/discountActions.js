import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";

import { db } from "../../firebaseConfig";
import {
  setDiscounts,
  setLoading,
  clearError,
  setError,
} from "./discountSlice";

export const createNewDiscount = createAsyncThunk(
  "discounts/createNewDiscount",
  async (discount, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const docRef = await addDoc(collection(db, "discounts"), discount);
      dispatch(setDiscounts({ ...discount, id: docRef.id }));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);
