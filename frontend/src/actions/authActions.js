import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";

import {
  setLoading,
  setError,
  setUser,
  setUserProfile,
  clearUser,
  clearError,
} from "../features/authSlice";
import { auth, storage, db } from "../firebase";
import { doc, setDoc, Timestamp, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

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
      });
    }

    // dispatch(setUser(userCredential.user.uid));
    dispatch(setUser(userCredential.user.uid));
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

export const registerUser =
  (email, password, lastName, firstName, type, country, photoURL) =>
  async (dispatch) => {
    try {
      // Register user with email and password
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get user ID
      const userId = user.uid;

      // // Upload profile image to Firebase Storage
      // const storageRef = ref(storage, `users/${userId}/${profileImage.name}`);
      // await uploadString(storageRef, profileImage, "data_url");

      // // Get the download URL of the uploaded image
      // const downloadURL = await getDownloadURL(storageRef);

      // Save user details to Firestore
      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, {
        lastName,
        firstName,
        email,
        type,
        country,
        photoURL: photoURL || null,
        displayName: `${firstName} ${lastName}`,
        createdAt: Timestamp.fromDate(new Date()),
      });

      // Dispatch any additional actions or update state as needed
      dispatch(setUser(user.uid));

      // Return success or any relevant data
      return { success: true };
    } catch (error) {
      // Handle and log any errors
      console.error("Error registering user:", error);

      // Return failure or any relevant data
      return { success: false, error: error.message };
    }
  };

// Action to update user profile, document, and password
export const updateUserProfileAndPassword = async (
  uid,
  profileData,
  newPassword
) => {
  try {
    const auth = getAuth();
    const firestore = getFirestore();

    // Update user profile
    await updateDoc(doc(firestore, "users", uid), profileData);

    // Update document in the collection
    await updateDoc(doc(firestore, "user_documents", uid), {
      ...profileData,
    });

    // Update user password
    const user = auth.currentUser;
    await updatePassword(user, newPassword);

    // Return success response if needed
    // return { success: true };
  } catch (error) {
    // Return error response if needed
    // return { success: false, error };
  }
};

// Create async action to log in a user
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(setUser(userCredential.user.uid));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError(error.message));
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

export const updateUserProfile =
  ({ email, password, lastName, firstName, type, country, photoURL }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const { uid } = getState().auth.user;
      const response = await axios.put(
        `http://localhost:3000/user/${uid}`,
        { firstName, lastName, country, type },
        {
          headers: {
            Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
          },
        }
      );
      dispatch(setUser(response.data.user));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
