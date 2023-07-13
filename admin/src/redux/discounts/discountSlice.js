import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createNewDiscount,
  updateExistingDiscount,
  deleteExistingDiscount,
} from "./discountActions";

const discountSlice = createSlice({
  name: "discount",
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
        state.loading = false;
        state.discounts.push(action.payload);
      })
      .addCase(createNewDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateExistingDiscount.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExistingDiscount.fulfilled, (state, action) => {
        state.loading = false;
        const updatedDiscount = action.payload;
        const index = state.discounts.findIndex(
          (discount) => discount.id === updatedDiscount.id
        );
        if (index !== -1) {
          state.discounts[index] = updatedDiscount;
        }
      })
      .addCase(updateExistingDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteExistingDiscount.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExistingDiscount.fulfilled, (state, action) => {
        state.loading = false;
        const discountId = action.payload;
        state.discounts = state.discounts.filter(
          (discount) => discount.id !== discountId
        );
      })
      .addCase(deleteExistingDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setDiscounts, setLoading, setError, clearError } =
  discountSlice.actions;

export default discountSlice.reducer;
