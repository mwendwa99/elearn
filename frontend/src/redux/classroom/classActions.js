import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../../firebaseConfig";

import { setAllClasses, setError, setLoading, clearError } from "./classSlice";

export const getAllClasses = createAsyncThunk(
  "class/getAllClasses",
  async (_, { dispatch }) => {
    dispatch(setLoading());
    dispatch(clearError());
    try {
      const querySnapshot = await getDocs(collection(db, "classes"));
      const classes = [];
      querySnapshot.forEach((doc) => {
        classes.push({ ...doc.data(), id: doc.id });
      });
      dispatch(setAllClasses(classes));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);
