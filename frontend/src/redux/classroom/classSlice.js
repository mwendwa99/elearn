import { createSlice } from "@reduxjs/toolkit";
import { getAllClasses } from "./classActions";

const initialState = {
  classes: [],
  isLoading: false,
  error: null,
};

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    // add your reducers here
    setAllClasses: (state, action) => {
      state.classes = action.payload;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes = action.payload;
      })
      .addCase(getAllClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setAllClasses, setError, setLoading, clearError } =
  classSlice.actions;

export default classSlice.reducer;
