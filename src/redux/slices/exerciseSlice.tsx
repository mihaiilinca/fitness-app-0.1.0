import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import exerciseService from "../../services/exercises.tsx";

export const fetchExercises = createAsyncThunk(
  "exercises/fetchExercises",
  async (data) => {
    try {
      const response = await exerciseService.fetchExercises();
      return response;
    } catch (error) {}
  }
);

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState: {
    currentExercise: null,
    exercises: null,
    status: "idle",
    error: null,
  },

  reducers: {
    changeExercise: (state, action) => {
      state.currentExercise = action.payload.newExercise;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchExercises.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { changeExercise } = exerciseSlice.actions;

export const selectExercises = (state) => state.exercise.exercises;
export const selectCurrentExercise = (state) => state.exercise.currentExercise;
export const selectExerciseStatus = (state) => state.exercise.status;
export const selectExerciseError = (state) => state.exercise.error;

export default exerciseSlice.reducer;
