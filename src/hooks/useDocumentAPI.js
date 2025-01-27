import { useQuery } from "react-query";
import { fetchDocument } from "../api/fetchDocument";

export const useDocumentAPI = ({ documentId, documentName }) => {
  return useQuery(
    ["document", documentId, documentName],
    () => fetchDocument(documentId, documentName),
    {
      enabled: !!documentId,
    }
  );
};
