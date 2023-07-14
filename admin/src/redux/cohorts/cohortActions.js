import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
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

export const updateCohort = createAsyncThunk(
  "dispatch/updateCohort",
  async (cohort, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const docRef = doc(db, "cohorts", cohort.cohortId);
      await updateDoc(docRef, cohort);
      dispatch(setCohorts(cohort));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

export const deleteCohort = createAsyncThunk(
  "dispatch/deleteCohort",
  async (cohortId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const docRef = doc(db, "cohorts", cohortId);
      await deleteDoc(docRef);
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
