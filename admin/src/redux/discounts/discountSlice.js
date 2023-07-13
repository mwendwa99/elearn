import { createSlice } from "@reduxjs/toolkit";
import { createNewDiscount } from "./discountActions";

const initialState = {
  discounts: [],
  loading: false,
  error: null,
};

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
        state.discounts.push(action.payload);
        state.loading = false;
      })
      .addCase(createNewDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setDiscounts, setLoading, setError, clearError } =
  discountSlice.actions;

export default discountSlice.reducer;
