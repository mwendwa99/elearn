import { createSlice } from "@reduxjs/toolkit";

export const classSlice = createSlice({
  name: "class",
  initialState: {
    classes: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    getClassesStart: (state) => {
      state.isLoading = true;
    },
    getClassesSuccess: (state, action) => {
      state.classes = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getClassesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addClassStart: (state) => {
      state.isLoading = true;
    },
    addClassSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    addClassFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getClassesStart,
  getClassesSuccess,
  getClassesFailure,
  addClassStart,
  addClassSuccess,
  addClassFailure,
} = classSlice.actions;

export default classSlice.reducer;
