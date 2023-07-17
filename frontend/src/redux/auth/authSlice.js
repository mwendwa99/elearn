import { createSlice } from "@reduxjs/toolkit";

// Create slice to hold user information
const userSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isLoading: false,
    error: null,
    userProfile: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
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
});

export const {
  setUser,
  setUserProfile,
  setLoading,
  setError,
  clearUser,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
