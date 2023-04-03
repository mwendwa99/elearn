import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const login = createAsyncThunk("auth/login", async (payload) => {
  const { email, password } = payload;
  const response = await signInWithEmailAndPassword(auth, email, password);
  const tokenResult = await response.user.getIdTokenResult();
  const userType = tokenResult.claims.usertype;
  return { user: response.user, userType };
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut();
});

export const register = createAsyncThunk("auth/register", async (payload) => {
  const { email, password } = payload;
  const response = await createUserWithEmailAndPassword(auth, email, password);
  const tokenResult = await response.user.getIdTokenResult();
  const userType = tokenResult.claims.usertype;
  return { user: response.user, userType };
});
