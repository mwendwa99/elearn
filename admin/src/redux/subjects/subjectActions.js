import { db } from "../../firebaseConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
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

export const getSubjects = createAsyncThunk(
  "subjects/getSubjects",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const querySnapshot = await getDocs(collection(db, "subjects"));
      const subjects = [];
      querySnapshot.forEach((doc) => {
        subjects.push({ ...doc.data(), subjectId: doc.id });
      });
      dispatch(setSubjects(subjects));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

export const updateSubject = createAsyncThunk(
  "subjects/updateSubject",
  async (subject, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const docRef = doc(db, "subjects", subject.subjectId);
      await updateDoc(docRef, subject);
      dispatch(setSubjects(subject));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

export const deleteSubject = createAsyncThunk(
  "subjects/deleteSubject",
  async (subjectId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const docRef = doc(db, "subjects", subjectId);
      await deleteDoc(docRef);
      const querySnapshot = await getDocs(collection(db, "subjects"));
      const subjects = [];
      querySnapshot.forEach((doc) => {
        subjects.push({ ...doc.data(), subjectId: doc.id });
      });
      dispatch(setSubjects(subjects));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);
