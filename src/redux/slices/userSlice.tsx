import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth.tsx";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    try {
      const response = await authService.login(
        credentials.email,
        credentials.password
      );
      return response;
    } catch (error) {}
  }
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await authService.logout();
    return response;
  } catch (error) {}
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    cookie: null,
    isLoggedIn: false,
    status: "idle",
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(loginAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        if (action.payload.response) {
          if (action.payload.response.status !== 200) {
            state.status = "failed";
            state.error = "Login fehlgeschlagen. Überprüfe deine Eingaben.";
            state.isLoggedIn = false;
            return;
          }
        }
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.cookie = action.payload.cookie;
        state.user = action.payload.userId;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isLoggedIn = false;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoggedIn = false;
        state.cookie = null;
        state.user = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isLoggedIn = true;
      });
  },
  reducers: undefined
});

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const getLoginStatus = (state) => state.user.status;
export const getLoginError = (state) => state.user.error;
export const selectCookie = (state) => state.user.cookie;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
