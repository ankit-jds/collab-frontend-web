import apiClient from "../utils/apiClient";

export const fetchQRCode = async (documentId) => {
  if (documentId) {
    return await apiClient(`api/c/qrcode/`, {
      method: "GET",
      params: { document_id: documentId, base_url: window.location.origin },
    });
  } else {
    return null;
  }
};
