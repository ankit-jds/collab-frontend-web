import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeComponent: "login",
  isTransitioning: false,
  transitionPayload: {
    transitionComponent: "transition",
    endComponent: null,
    transitionText: `Transitioning...`,
    // delay in milliseconds (ms), not seconds.
    // 1 second = 1000 milliseconds.
    transitionTime: 1000,
  },
};

const navigatorSlice = createSlice({
  name: "navigator",
  initialState: initialState,
  reducers: {
    navigateTo: (state, action) => {
      state.activeComponent = action.payload;
      state.isTransitioning = false;
    },
    transitionTo: (state, action) => {
      const { transitionComponent, endComponent, transitionText } =
        action.payload;
      let transitionPayload = {
        ...initialState?.transitionPayload,
        transitionComponent: transitionComponent
          ? transitionComponent
          : initialState?.transitionPayload?.transitionComponent,
        endComponent: endComponent,
        transitionText: transitionText
          ? transitionText
          : initialState?.transitionPayload?.transitionText,
      };

      state.transitionPayload = transitionPayload;

      state.activeComponent =
        transitionPayload?.transitionComponent ||
        initialState?.transitionPayload?.transitionComponent;
      state.isTransitioning = true;
    },
  },
});

export const { navigateTo, transitionTo } = navigatorSlice.actions;

export default navigatorSlice.reducer;
