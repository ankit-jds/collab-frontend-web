import apiClient from "../utils/apiClient";

export const createDocument = async (documentName) => {
  return await apiClient(`api/c/document/`, {
    method: "POST",
    body: JSON.stringify({
      document_name: documentName,
    }),
  });
};
