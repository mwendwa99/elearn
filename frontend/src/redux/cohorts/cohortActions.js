import { collection, getDocs } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../../firebaseConfig";
import { setCohorts, setLoading, clearError, setError } from "./cohortSlice";

export const getCohorts = createAsyncThunk(
  "dispatch/getCohorts",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const querySnapshot = await getDocs(collection(db, "cohorts"));
      const cohorts = [];
      querySnapshot.forEach((doc) => {
        cohorts.push({ ...doc.data(), cohortId: doc.id });
      });
      dispatch(setCohorts(cohorts));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);
