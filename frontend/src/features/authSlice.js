import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../actions/authActions";

// Create slice to hold user information
const userSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginUser.pending, (state) => {
  //       state.isLoading = true;
  //       state.error = null;
  //     })
  //     .addCase(loginUser.fulfilled, (state, action) => {
  //       const uid = action.payload;
  //       const userRef = collection(db, "users").doc(uid);
  //       onSnapshot(userRef, (doc) => {
  //         if (doc.exists()) {
  //           state.currentUser = doc.data();
  //         } else {
  //           console.log("User not found");
  //         }
  //       });
  //       state.isLoading = false;
  //     })
  //     .addCase(loginUser.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const { setUser, setLoading, setError, clearUser, clearError } =
  userSlice.actions;

export default userSlice.reducer;
