import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "../../services/profiles.tsx";

export const fetchProfiles = createAsyncThunk(
  "profiles/fetchProfiles",
  async (data) => {
    try {
      const response = await profileService.fetchProfiles(
        data.userId,
        data.cookie
      );
      return response;
    } catch (error) {}
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    currentProfile: null,
    profiles: [],
    status: "idle",
    error: null,
  },
  reducers: {
    changeProfile: (state, action) => {
      state.currentProfile = action.payload.newProfile;
    },
    resetProfiles: (state, action) => {
      state.currentProfile = null;
      state.profiles = [];
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfiles.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { changeProfile, resetProfiles } = profileSlice.actions;

export const selectProfiles = (state) => state.profile.profiles;
export const selectProfilesStatus = (state) => state.profile.status;
export const selectProfilesError = (state) => state.profile.error;
export const selectCurrentProfile = (state) => state.profile.currentProfile;

export default profileSlice.reducer;
