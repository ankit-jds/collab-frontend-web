import apiClient from "../utils/apiClient";

export const fetchDocument = async ({ documentId, documentName }) => {
  if (documentName === "") {
    return await apiClient(`api/c/document/?document_id=${documentId}`);
  } else return null;
};
