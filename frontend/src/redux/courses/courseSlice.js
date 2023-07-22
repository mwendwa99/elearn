import { createSlice } from "@reduxjs/toolkit";
import { getAllCourses } from "./courseActions";

const initialState = {
  courses: [],
  isLoading: false,
  error: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    // add your reducers here
    setAllCourses: (state, action) => {
      state.courses = action.payload;
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
      .addCase(getAllCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setAllCourses, setError, setLoading, clearError } =
  courseSlice.actions;

export default courseSlice.reducer;
