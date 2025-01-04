import { useQuery } from "react-query";
import { fetchDocument } from "../api/fetchDocument";

export const useDocumentAPI = (documentId) => {
  return useQuery(["document", documentId], () => fetchDocument(documentId));
};
