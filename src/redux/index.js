import { configureStore } from "@reduxjs/toolkit";

import navigatorReducer from "./slice/navigatorSlice";

const store = configureStore({
  reducer: {
    navigator: navigatorReducer, // Add your slice reducer(s) here
  },
});

export default store;
