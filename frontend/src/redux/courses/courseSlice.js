import { createSlice } from "@reduxjs/toolkit";
import { getAllCourses, enrollToCourse, getUserCourses } from "./courseActions";

const initialState = {
  courses: null,
  loading: false,
  error: null,
  message: null,
  userCourses: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.error = null;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(enrollToCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(enrollToCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Enrolled in course";
        state.userCourses = action.payload;
        state.error = null;
      })
      .addCase(enrollToCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.userCourses = action.payload;
        state.error = null;
      })
      .addCase(getUserCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage, clearError } = courseSlice.actions;

export default courseSlice.reducer;
