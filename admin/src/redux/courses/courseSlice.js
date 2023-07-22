import { createSlice } from "@reduxjs/toolkit";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "./courseActions";

const initialState = {
  courseList: [],
  course: {},
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourseList: (state, action) => {
      state.courseList = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
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
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courseList = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCourseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courseList = action.payload;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courseList = action.payload;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courseList = action.payload;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCourseList, setCourse, setLoading, setError, clearError } =
  courseSlice.actions;

export default courseSlice.reducer;
