import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { auth, db } from "../../firebaseConfig";
import {
  doc,
  setDoc,
  Timestamp,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";

const provider = new GoogleAuthProvider();

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const user = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          resolve(user);
        });
      });
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  (_, { rejectWithValue }) => {
    signInWithPopup(auth, provider);
  }
);

// get user profile from firestore
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (id, { rejectWithValue }) => {
    try {
      // Check if the user is authenticated
      // const currentUser = await auth.currentUser;
      // console.log("BACKEND", currentUser);
      if (!id) {
        throw new Error("User is not authenticated.");
      }

      // Fetch the user document from Firestore
      const userDocRef = doc(db, "users", id);
      const userDocSnapshot = await getDoc(userDocRef);

      // Check if the user document exists
      if (!userDocSnapshot.exists()) {
        throw new Error("User profile not found.");
      }

      // Return the user data
      return userDocSnapshot.data();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (
    { email, password, fullNames, type, country },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Notify successful account creation
      toast.success(
        `${userCredential.user.email} has been created successfully!`
      );

      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: userCredential.user.email,
          displayName: fullNames,
          type,
          country,
          photoURL:
            userCredential.user.photoURL ||
            "https://www.svgrepo.com/show/408476/user-person-profile-block-account-circle.svg",
          createdAt: Timestamp.fromDate(new Date()),
          updatedAt: serverTimestamp(),
        });
      }

      // Fetch user profile immediately and add to app state
      const userProfile = await dispatch(
        getUserProfile(userCredential.user.uid)
      ).unwrap(); // Use `unwrap` to handle result cleanly

      return userProfile; // Return the user profile to the app
    } catch (error) {
      return rejectWithValue(error.message || error.code);
    }
  }
);

// Action to log in with email and password
export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Await the signInWithEmailAndPassword function call
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user; // Return the user object if login is successful
    } catch (error) {
      // If an error occurs, reject the action with the error code
      return rejectWithValue(error.code);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});
