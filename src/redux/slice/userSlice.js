import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGuest: false,
  username: "",
  deviceId: null,
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    guestLogin: (state, action) => {
      state.isGuest = true;
      state.username = action.payload;
    },
  },
});

export const { guestLogin } = userSlice.actions;
export default userSlice.reducer;
