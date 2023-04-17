import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  classes: [
    {
      title: "Intermediate React",
      tutor: "Jane Smith",
      start: new Date("2023-05-01T09:00:00"),
      end: new Date("2023-05-01T11:00:00"),
      price: "$75",
      description:
        "Build on your React knowledge and create more complex components.",
    },
    {
      title: "Advanced React",
      tutor: "Bob Johnson",
      start: new Date("2023-05-15T11:00:00"),
      end: new Date("2023-05-15T13:00:00"),
      price: "$100",
      description:
        "Take your React skills to the next level and learn about performance optimization.",
    },
    {
      title: "French",
      tutor: "Belmont Smith",
      start: new Date("2023-04-15T11:00:00"),
      end: new Date("2023-05-15T13:00:00"),
      price: "$80",
      description:
        "Learn French with a native speaker. We will cover basic grammar and vocabulary.",
    },
  ],
  status: "idle",
  error: null,
};

export const getClass = createAsyncThunk("class/getClass", async () => {
  return initialState;
});

export const addClass = createAsyncThunk(
  "class/addClass",
  async (classData) => {
    // add toexisting list of classes
    return classData;
  }
);

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    // add your reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClass.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClass.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classes = action.payload.classes;
      })
      .addCase(getClass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addClass.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.classes.push(action.payload);
      })
      .addCase(addClass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default classSlice.reducer;
