import { db } from "../../firebaseConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { setSubjects, setLoading, clearError, setError } from "./subjectSlice";

export const createNewSubject = createAsyncThunk(
  "subjects/createNewSubject",
  async (subject, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      //   add created date to subject
      const docRef = await addDoc(collection(db, "subjects"), {
        ...subject,
        createdAt: serverTimestamp(),
      });
      dispatch(setSubjects({ ...subject, id: docRef.id }));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);
