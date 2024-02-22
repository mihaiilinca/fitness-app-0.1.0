import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import foodService from "../../services/food.tsx";

export const fetchFood = createAsyncThunk("food/fetchFood", async (data) => {
  try {
    const response = await foodService.fetchFood();
    return response;
  } catch (error) {}
});

export const foodSlice = createSlice({
  name: "food",
  initialState: {
    foods: null,
    currentFood: null,
    status: "idle",
    error: null,
  },
  reducers: {
    changeFood: (state, action) => {
      state.currentFood = action.payload.newFood;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFood.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchFood.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.food = action.payload;
      })
      .addCase(fetchFood.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { changeFood } = foodSlice.actions;

export const selectFood = (state) => state.food.food;
export const selectCurrentFood = (state) => state.food.currentFood;
export const selectFoodStatus = (state) => state.food.status;
export const selectFoodError = (state) => state.food.error;

export default foodSlice.reducer;
