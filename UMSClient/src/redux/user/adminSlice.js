import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    admin: null,
    isLogged: false,
  }
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login: (state, action) => {
      state.admin = action.payload;
      state.isLogged = true;
    },
    loginfailure: (state) => {
      state.admin = null;
      state.isLogged = false;
    },
    loggedOut: (state) => {
      state.admin = null;
      state.isLogged = false;
    },
  },
});

export default adminSlice.reducer;
export const { login, loggedOut, loginfailure } = adminSlice.actions;
