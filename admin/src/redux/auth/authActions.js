import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setLoading,
  setError,
  setUser,
  clearUser,
  clearError,
} from "./authSlice";
import { auth } from "../../firebaseConfig";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (loginData, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      dispatch(setUser(userCredential.user));
      dispatch(clearError());
    } catch (error) {
      dispatch(
        setError({
          code: error.code,

          message: error.message,
          origin: "signIn",
        })
      );
    }
  }
);

export const signOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await signOut(auth);
      dispatch(clearUser());
      dispatch(clearError());
    } catch (error) {
      dispatch(
        setError({
          code: error.code,
          message: error.message,
          origin: "signOutUser",
        })
      );
    }
  }
);
