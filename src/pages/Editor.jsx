import Header from "../components/Header";
import { useDocumentAPI } from "../hooks/useDocumentAPI";

const Editor = () => {
  const {
    data: documentData,
    isLoading: isLoading1,
    error: error1,
  } = useDocumentAPI({ documentId: 5 });
  if (isLoading1) return <div>Loading...</div>;
  if (error1) return <div>Error in API 1: {error1.message}</div>;

  return (
    <div className="flex flex-col h-lvh">
      <Header documentNameProp={documentData?.data?.name} />
      <div className="flex-grow p-10">
        <textarea className="h-full w-full border p-2 resize-none"></textarea>
      </div>
    </div>
  );
};

export default Editor;
