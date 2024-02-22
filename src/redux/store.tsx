import { configureStore } from "@reduxjs/toolkit";
import dayReducer from "./slices/daySlice.tsx";
import exerciseReducer from "./slices/exerciseSlice.tsx";
import foodReducer from "./slices/foodSlice.tsx";
import profileReducer from "./slices/profileSlice.tsx";
import userReducer from "./slices/userSlice.tsx";


export default configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    food: foodReducer,
    exercise: exerciseReducer,
    day: dayReducer,
  },
});
