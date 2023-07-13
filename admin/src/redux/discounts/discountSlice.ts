import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createNewDiscount,
  updateExistingDiscount,
  deleteExistingDiscount,
} from "./discountActions";

type DiscountData = {
  id: string;
  description: string;
  title: string;
  discountId: string;
  percentage: number;
  subjectId: string;
  startDate: string;
  endDate: string;
};

interface DiscountState {
  discounts: DiscountData[];
  loading: boolean;
  error: string | null;
}

const initialState: DiscountState = {
  discounts: [],
  loading: false,
  error: null,
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewDiscount.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createNewDiscount.fulfilled,
        (state, action: PayloadAction<DiscountData>) => {
          state.loading = false;
          state.discounts.push(action.payload);
        }
      )
      .addCase(createNewDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateExistingDiscount.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateExistingDiscount.fulfilled,
        (state, action: PayloadAction<DiscountData>) => {
          state.loading = false;
          const updatedDiscount = action.payload;
          const index = state.discounts.findIndex(
            (discount) => discount.id === updatedDiscount.id
          );
          if (index !== -1) {
            state.discounts[index] = updatedDiscount;
          }
        }
      )
      .addCase(updateExistingDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteExistingDiscount.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteExistingDiscount.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          const discountId = action.payload;
          state.discounts = state.discounts.filter(
            (discount) => discount.id !== discountId
          );
        }
      )
      .addCase(deleteExistingDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default discountSlice.reducer;
