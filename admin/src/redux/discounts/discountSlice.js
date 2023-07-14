import { createSlice } from "@reduxjs/toolkit";
import {
  createNewDiscount,
  getDiscounts,
  updateDiscount,
  deleteDiscount,
} from "./discountActions";

const initialState = {
  discounts: [],
  loading: false,
  error: null,
};

const discountSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    // ...
    setDiscounts(state, action) {
      state.discounts = action.payload;
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
      .addCase(createNewDiscount.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewDiscount.fulfilled, (state, action) => {
        state.discounts = action.payload;
        state.loading = false;
      })
      .addCase(createNewDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDiscounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDiscounts.fulfilled, (state, action) => {
        state.discounts = action.payload;
        state.loading = false;
      })
      .addCase(getDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDiscount.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.discounts = action.payload;
        state.loading = false;
      })
      .addCase(deleteDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDiscount.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDiscount.fulfilled, (state, action) => {
        state.discounts = action.payload;
        state.loading = false;
      })
      .addCase(updateDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setDiscounts, setLoading, setError, clearError } =
  discountSlice.actions;

export default discountSlice.reducer;
