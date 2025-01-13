import { createSlice } from "@reduxjs/toolkit";

const navigatorSlice = createSlice({
  name: "navigator",
  initialState: {
    activeComponent: "login",
  },
  reducers: {
    navigateTo: (state, action) => {
      state.activeComponent = action.payload;
    },
  },
});

export const { navigateTo } = navigatorSlice.actions;

export default navigatorSlice.reducer;
