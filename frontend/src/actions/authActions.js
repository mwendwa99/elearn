import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  setLoading,
  setError,
  setUser,
  clearUser,
  clearError,
} from "../features/authSlice";
import { auth } from "../firebase";

// Create async action to register a user
export const registerUser = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(setUser(userCredential.user));
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
// // authActions.js
// export const loginUser = createAsyncThunk("auth/login", async (payload) => {
//   const { email, password } = payload;
//   const response = await auth.signInWithEmailAndPassword(auth, email, password);
//   const tokenResult = await response.user.getIdTokenResult();
//   const userType = tokenResult.claims.usertype;
//   return response.user.uid; // return only the uid
// });

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
