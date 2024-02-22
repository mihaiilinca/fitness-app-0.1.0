import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dayService from "../../services/day.tsx";

export const fetchDays = createAsyncThunk("day/fetchDays", async (data) => {
  try {
    const response = await dayService.fetchDays(data.profileId, data.cookie);
    return response;
  } catch (error) {}
});

export const daySlice = createSlice({
  name: "day",
  initialState: {
    days: [],
    selectedDate: new Date().toDateString(),
    currentDay: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetDays: (state, action) => {
      state.days = null;
      state.currentDay = null;

      state.status = "idle";
      state.error = null;
    },
    changeSelectedDate: (state, action) => {
      state.selectedDate = action.payload.newSelectedDate;
    },
    changeDay: (state, action) => {
      state.currentDay = action.payload.newDay;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDays.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchDays.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.days = action.payload;
      })
      .addCase(fetchDays.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { changeDay, resetDays, changeSelectedDate } = daySlice.actions;

export const selectDays = (state) => state.day.days;
export const selectSelectedDate = (state) => state.day.selectedDate;
export const selectCurrentDay = (state) => state.day.currentDay;
export const selectDayStatus = (state) => state.day.status;
export const selectDayError = (state) => state.day.error;

export default daySlice.reducer;
