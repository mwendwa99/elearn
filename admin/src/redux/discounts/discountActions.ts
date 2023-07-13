import {
  collection,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig.js";

type DiscountData = {
  id: string;
  description: string;
  title: string;
  discountId: string;
  percentage: number;
  subjectId: string;
  startDate: string;
  endDate: string;
};

// Fetch a discount by ID
export const fetchDiscountById = createAsyncThunk(
  "discount/fetchDiscountById",
  async (discountId: string, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "discounts", discountId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("Discount not found");
      }
    } catch (error) {
      console.error("Error fetching discount:", error);
      return rejectWithValue("Failed to fetch discount");
    }
  }
);

export const createNewDiscount = createAsyncThunk(
  "discount/createNewDiscount",
  async (discountData: Discount, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "discounts"), discountData);
      return { id: docRef.id, ...discountData };
    } catch (error) {
      console.error("Error creating discount:", error);
      return rejectWithValue("Failed to create discount");
    }
  }
);

export const updateExistingDiscount = createAsyncThunk(
  "discount/updateExistingDiscount",
  async (
    {
      discountId,
      discountData,
    }: { discountId: string; discountData: Discount },
    { rejectWithValue }
  ) => {
    try {
      const docRef = doc(db, "discounts", discountId);
      await updateDoc(docRef, discountData);
      return { id: discountId, ...discountData };
    } catch (error) {
      console.error("Error updating discount:", error);
      return rejectWithValue("Failed to update discount");
    }
  }
);

export const deleteExistingDiscount = createAsyncThunk(
  "discount/deleteExistingDiscount",
  async (discountId: string, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "discounts", discountId);
      await deleteDoc(docRef);
      return discountId;
    } catch (error) {
      console.error("Error deleting discount:", error);
      return rejectWithValue("Failed to delete discount");
    }
  }
);
