import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  setLoading,
  setError,
  setUser,
  setUserProfile,
  clearUser,
  clearError,
} from "../features/authSlice";
import { auth, db } from "../firebase";
import {
  doc,
  setDoc,
  Timestamp,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export const signInWithGoogle = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    // add user to users collection with document id of user id if not already there
    const userDocRef = doc(db, "users", userCredential.user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        lastName: userCredential.user.displayName.split(" ")[1] || "",
        firstName: userCredential.user.displayName.split(" ")[0],
        email: userCredential.user.email,
        type: "",
        country: "",
        photoURL: userCredential.user.photoURL,
        displayName: userCredential.user.displayName,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: serverTimestamp(),
      });
    }

    // dispatch(setUser(userCredential.user.uid));
    dispatch(setUser(userCredential.user));
    dispatch(clearError());
  } catch (error) {
    dispatch(
      setError({
        code: error.code,
        message: error.message,
        origin: "signInWithGoogle",
      })
    );
  }
};

// write an action to update user profile in firestore params are uid, type, country
export const updateUserProfile = (uid, type, country) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
      type: type,
      country: country,
      updatedAt: serverTimestamp(),
    });

    // Fetch the updated user profile from Firestore
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(setUserProfile(docSnap.data()));
      console.log("Document data:", docSnap.data());
    } else {
      dispatch(
        setError({
          code: "user-not-found",
          message: "No such document!",
          origin: "updateUserProfileDatabase",
        })
      );
    }
  } catch (error) {
    dispatch(
      setError({
        code: error.code,
        message: error.message,
        origin: "updateUserProfile",
      })
    );
  } finally {
    dispatch(setLoading(false));
  }
};

// Create async action to get current user on app load
export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getUserProfile = (uid) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // const response = await axios.get(`http://localhost:3000/user/${uid}`);
    // const response = auth.currentUser;
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    const response = userDoc.data();
    dispatch(setUserProfile(response));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

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
