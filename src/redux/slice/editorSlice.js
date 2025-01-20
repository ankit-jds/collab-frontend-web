import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documentId: null,
  documentName: null,
  operations: [],
};

const editorSlice = createSlice({
  name: "editor",
  initialState: initialState,
  reducers: {
    setDocumentId: (state, action) => {
      state.documentId = action.payload;
    },
    setDocumentMetadata: (state, action) => {
      console.log(action, "789");

      // state.documentId = action?.payload?.documentId;
      // state.documentName = action?.payload?.documentName;
    },
  },
});

export const { setDocumentId, setDocumentMetadata } = editorSlice.actions;
export default editorSlice.reducer;
