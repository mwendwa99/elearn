import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
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
import { auth } from "../firebase";

// Create async action to register a user
export const registerUser =
  (email, password, firstName, lastName, type, country) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post("http://localhost:3000/signup/users", {
        email,
        password,
        firstName,
        lastName,
        country,
        type,
      });
      dispatch(setUser(response.data.user));
    } catch (error) {
      dispatch(setError(error.message));
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
    const response = await axios.get(`http://localhost:3000/user/${uid}`);
    dispatch(setUserProfile(response.data));
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
  ({ firstName, lastName, country, type }) =>
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
