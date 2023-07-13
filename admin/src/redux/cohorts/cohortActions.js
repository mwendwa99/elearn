import { addDoc, collection } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../../firebaseConfig";
import { setCohorts, setLoading, clearError, setError } from "./cohortSlice";

export const createNewCohort = createAsyncThunk(
  "dispatch/createNewCohort",
  async (cohort, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const docRef = await addDoc(collection(db, "cohorts"), cohort);
      dispatch(setCohorts({ ...cohort, id: docRef.id }));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);
