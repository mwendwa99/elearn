import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

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

export const updateDiscount = createAsyncThunk(
  "discounts/updateDiscount",
  async (discount, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const docRef = doc(db, "discounts", discount.discountId);
      await updateDoc(docRef, discount);
      dispatch(setDiscounts(discount));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

export const deleteDiscount = createAsyncThunk(
  "discounts/deleteDiscount",
  async (discountId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const docRef = doc(db, "discounts", discountId);
      await deleteDoc(docRef);
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
