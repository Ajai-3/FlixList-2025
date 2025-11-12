import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  admin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin(state, action) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.admin = action.payload.admin;
    },
    setAdminAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    adminLogout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.admin = null;
    },
  },
});

export const { setAdmin, adminLogout, setAdminAccessToken } =
  adminSlice.actions;
export default adminSlice.reducer;