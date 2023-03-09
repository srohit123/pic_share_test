import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoading: boolean;
  isLogin: boolean;
  error: null;
}

const initialState: AuthState = {
  isLoading: false,
  isLogin: false,
  error: null,
};

const {
  actions: { loginSuccess, loginRequest, loginFailure, logoutSuccess },
  reducer: authReducer,
} = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginRequest(state) {
      state.isLoading = true;
    },
    loginSuccess(state) {
      state.isLoading = false;
      state.isLogin = true;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.isLogin = false;
    },
  },
});

export { authReducer, loginSuccess, loginRequest, loginFailure, logoutSuccess };
