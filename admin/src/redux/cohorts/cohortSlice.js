import { createSlice } from "@reduxjs/toolkit";
import { createNewCohort, getCohorts } from "./cohortActions";

const initialState = {
  cohorts: [],
  loading: false,
  error: null,
};

const cohortSlice = createSlice({
  name: "cohorts",
  initialState,
  reducers: {
    setCohorts(state, action) {
      state.cohorts = action.payload;
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
      .addCase(createNewCohort.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewCohort.fulfilled, (state, action) => {
        state.cohorts = action.payload;
        state.loading = false;
      })
      .addCase(createNewCohort.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCohorts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCohorts.fulfilled, (state, action) => {
        state.cohorts = action.payload;
        state.loading = false;
      })
      .addCase(getCohorts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCohorts, setLoading, setError, clearError } =
  cohortSlice.actions;

export default cohortSlice.reducer;
