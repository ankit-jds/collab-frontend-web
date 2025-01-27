import apiClient from "../utils/apiClient";

export const fetchQRCode = async (documentId) => {
  if (documentId) {
    return await apiClient(`api/c/qrcode/?document_id=${documentId}`);
  } else {
    return null;
  }
};
