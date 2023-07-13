import { createSlice } from "@reduxjs/toolkit";
import { createNewSubject } from "./subjectActions";

const initialState = {
  subjects: [],
  loading: false,
  error: null,
};

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    setSubjects(state, action) {
      state.subjects = action.payload;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewSubject.fulfilled, (state, action) => {
        state.subjects = action.payload;
        state.loading = false;
      })
      .addCase(createNewSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSubjects, setLoading, setError, clearError } =
  subjectSlice.actions;

export default subjectSlice.reducer;
