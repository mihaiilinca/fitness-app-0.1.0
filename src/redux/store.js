import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './slices/foodSlice';
import exerciseReducer from './slices/exerciseSlice';
import profileReducer from './slices/profileSlice.js';
import dayReducer from './slices/daySlice.js/index.js';

export const store = configureStore({
  reducer: {
    food: foodReducer,
    exercise: exerciseReducer,
    profile: profileReducer,
    day: dayReducer,
  },
});
