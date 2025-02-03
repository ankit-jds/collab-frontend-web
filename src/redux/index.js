import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage as default
import { combineReducers } from "redux";

import navigatorReducer from "./slice/navigatorSlice";
import userReducer from "./slice/userSlice";
import editorReducer from "./slice/editorSlice";

// Configuring redux-persist
const persistConfig = {
  key: "root", // Key name for persistence
  storage, // You can change the storage method (e.g., sessionStorage)
};

const rootReducer = combineReducers({
  navigator: navigatorReducer,
  user: userReducer,
  editor: editorReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Setting up the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/PURGE"], // Ignore actions from redux-persist
        ignoredPaths: ["register"], // Ignore the register path specifically
      },
    }),
});

const persistor = persistStore(store);

const persistFlag = true;

// If persistFlag is false, do not persist the state
if (!persistFlag) {
  persistor.purge(); // Clears persisted state and disables persistence
}

export { store, persistor };
