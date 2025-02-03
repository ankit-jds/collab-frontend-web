import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documentId: null,
  documentName: "",
  documentContent: "",
  operations: [],
  users: [],
};

const editorSlice = createSlice({
  name: "editor",
  initialState: initialState,
  reducers: {
    setDocumentId: (state, action) => {
      state.documentId = action.payload;
    },
    setDocumentMetadata: (state, action) => {
      state.documentId = action?.payload?.documentId;
      state.documentName = action?.payload?.documentName;
    },
    setDocumentContent: (state, action) => {
      state.documentContent = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const {
  setDocumentId,
  setDocumentMetadata,
  setDocumentContent,
  setOnlineUsers,
} = editorSlice.actions;
export default editorSlice.reducer;
