import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setLoading,
  setError,
  setUser,
  setUserProfile,
  clearUser,
  clearError,
} from "./authSlice";
import { auth, db } from "../../firebaseConfig";
import {
  doc,
  setDoc,
  Timestamp,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  (_, { rejectWithValue }) => {
    signInWithPopup(auth, provider);
  }
);

// get user profile from firestore
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  (_, { rejectWithValue }) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return user;
      } else {
        return rejectWithValue("No user found");
      }
    });
  }
);

// export const signInWithGoogle = () => async (dispatch) => {
//   try {

//     // dispatch(setLoading(true));

//     // const userCredential = await signInWithPopup(auth, provider);

//     // // add user to users collection with document id of user id if not already there
//     // const userDocRef = doc(db, "users", userCredential.user.uid);
//     // const userDoc = await getDoc(userDocRef);
//     // if (!userDoc.exists()) {
//     //   await setDoc(userDocRef, {
//     //     lastName: userCredential.user.displayName.split(" ")[1] || "",
//     //     firstName: userCredential.user.displayName.split(" ")[0],
//     //     email: userCredential.user.email,
//     //     type: "",
//     //     country: "",
//     //     photoURL: userCredential.user.photoURL,
//     //     displayName: userCredential.user.displayName,
//     //     createdAt: Timestamp.fromDate(new Date()),
//     //     updatedAt: serverTimestamp(),
//     //   });
//     // }

//     // // dispatch(setUser(userCredential.user.uid));
//     // dispatch(setUser(userCredential.user));
//     // dispatch(clearError());
//   } catch (error) {
//     dispatch(
//       setError({
//         code: error.code,
//         message: error.message,
//         origin: "signInWithGoogle",
//       })
//     );
//   }
// };

// write an action to update user profile in firestore params are uid, type, country
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ uid, type, country }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, {
        type,
        country,
        updatedAt: serverTimestamp(),
      });
      // set user profile with users data from db
      const userDoc = await getDoc(userDocRef);
      const response = userDoc.data();
      dispatch(setUserProfile(response));
      dispatch(clearError());
    } catch (error) {
      dispatch(
        setError({
          code: error.code,
          message: error.message,
          origin: "updateUserProfile",
        })
      );
    }
  }
);

// Create async action to get current user on app load
// export const getCurrentUser = () => async (dispatch) => {
//   try {
//     dispatch(setLoading(true));
//     onAuthStateChanged(auth, (user) => {
//       dispatch(setUser(user));
//     });
//   } catch (error) {
//     dispatch(setError(error.message));
//   }
// };

// export const getUserProfile = createAsyncThunk(
//   "auth/getUserProfile",
//   async (uid, { dispatch }) => {
//     try {
//       dispatch(setLoading(true));
//       const userDocRef = doc(db, "users", uid);
//       const userDoc = await getDoc(userDocRef);
//       const response = userDoc.data();
//       dispatch(setUserProfile(response));
//       dispatch(clearError());
//     } catch (error) {
//       dispatch(
//         setError({
//           code: error.code,
//           message: error.message,
//           origin: "getUserProfile",
//         })
//       );
//     }
//   }
// );

// Create async action to log out a user
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await signOut(auth);
    dispatch(clearUser());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
