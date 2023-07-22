import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  collection,
  updateDoc,
  deleteDoc,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import {
  clearError,
  setError,
  setLoading,
  setUsers,
  setTutor,
} from "./userSlice";
import { db } from "../../firebaseConfig";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), userId: doc.id });
      });
      dispatch(setUsers(users));
    } catch (error) {
      dispatch(
        setError({
          message: error.message,
          code: error.code,
          origin: "getUsers",
        })
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const docRef = doc(db, "users", userId);
      await deleteDoc(docRef);
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), userId: doc.id });
      });
      dispatch(setUsers(users));
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
        origin: "deleteUser",
      });
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const docRef = doc(db, "users", user.userId);
      await updateDoc(docRef, user);
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), userId: doc.id });
      });
      dispatch(setUsers(users));
    } catch (error) {
      dispatch(
        setError({
          code: error.code,
          message: error.message,
          origin: "updateUser",
        })
      );
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (user, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const docRef = await addDoc(collection(db, "users"), {
        ...user,
        createdAt: serverTimestamp(),
      });
      dispatch(setUsers({ ...docRef.data(), userId: docRef.id }));
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
        origin: "createUser",
      });
    }
  }
);

export const getTutors = createAsyncThunk(
  "users/getTutors",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const q = query(collection(db, "users"), where("type", "==", "Tutor"));
      const querySnapshot = await getDocs(q);
      const tutors = [];
      querySnapshot.forEach((doc) => {
        tutors.push({ ...doc.data(), userId: doc.id });
      });
      dispatch(setTutor(tutors));
    } catch (error) {
      dispatch(
        setError({
          message: error.message,
          code: error.code,
          origin: "getTutors",
        })
      );
    }
  }
);
