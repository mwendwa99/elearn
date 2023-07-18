import { createSlice } from "@reduxjs/toolkit";
import { getCohorts } from "./cohortActions";

const initialState = {
  cohorts: [],
  isLoading: false,
  error: null,
};

const cohortSlice = createSlice({
  name: "cohorts",
  initialState,
  reducers: {
    setCohorts(state, action) {
      state.cohorts = action.payload;
      state.isLoading = false;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
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
      .addCase(getCohorts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCohorts.fulfilled, (state, action) => {
        state.cohorts = action.payload;
        state.isLoading = false;
      })
      .addCase(getCohorts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCohorts, setLoading, setError, clearError } =
  cohortSlice.actions;

export default cohortSlice.reducer;
