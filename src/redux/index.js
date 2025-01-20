import { configureStore } from "@reduxjs/toolkit";

import navigatorReducer from "./slice/navigatorSlice";
import userReducer from "./slice/userSlice";
import editorReducer from "./slice/editorSlice";

const store = configureStore({
  reducer: {
    navigator: navigatorReducer, // Add your slice reducer(s) here
    user: userReducer,
    editor: editorReducer,
  },
});

export default store;
