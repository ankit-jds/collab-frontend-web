import apiClient from "../utils/apiClient";

export const fetchDocument = async ({ documentId }) => {
  return await apiClient(`api/c/document/?document_id=${documentId}`);
};
