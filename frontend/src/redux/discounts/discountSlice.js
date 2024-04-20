import { createSlice } from "@reduxjs/toolkit";
import { getDiscounts } from "./discountActions";

const initialState = {
  discounts: null,
  loading: false,
  error: null,
};

const discountSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    // // ...
    // setDiscounts(state, action) {
    //   state.discounts = action.payload;
    //   state.loading = false;
    // },
    // setLoading(state, action) {
    //   state.loading = action.payload;
    // },
    // setError(state, action) {
    //   state.error = action.payload;
    // },
    // clearError(state) {
    //   state.error = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDiscounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDiscounts.fulfilled, (state, action) => {
        state.discounts = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { setDiscounts, setLoading, setError, clearError } =
//   discountSlice.actions;

export default discountSlice.reducer;
