import { useQuery } from "react-query";
import { fetchQRCode } from "../api/fetchQRCode";

export const useQRCode = ({ documentId }) => {
  return useQuery(["qrcode", documentId], () => fetchQRCode(documentId));
};
