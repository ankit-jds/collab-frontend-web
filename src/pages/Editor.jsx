import { useState } from "react";
import Header from "../components/Header";
import { useDocumentAPI } from "../hooks/useDocumentAPI";
import useWebSocket from "../hooks/useWebsocket";

const Editor = () => {
  const {
    data: documentData,
    isLoading: isLoading1,
    error: error1,
  } = useDocumentAPI({ documentId: 5 });
  console.log("hahaha......ahahahahah..... infinite reloading hori hai");
  const [content, setContent] = useState("");
  const wsurl = documentData ? `ws://127.0.0.1:8420/ws/document/5/` : null;
  const { isConnected, sendMessage } = useWebSocket(wsurl, {
    onOpen: () => console.log("websocket connected"),
    onClose: () => console.log("websocket disconnected"),
    onMessage: (message) => {
      console.log(message, typeof message, "websocket message aaya hai");
      if (typeof message === "object") {
        setContent(message?.content);
      } else {
        // apply operations code here...
        console.log(message, "operations has arrived");
      }
    },
    onError: (error) => console.log(error, "websocket error"),
  });
  if (isLoading1) return <div>Loading...</div>;
  if (error1) return <div>Error in API 1: {error1.message}</div>;
  console.log(isConnected, "mlml");

  return (
    <div className="flex flex-col h-lvh">
      <Header documentNameProp={documentData?.data?.name} />
      <div>websocket : {isConnected ? "CONNECTED✅" : "DISCONNECTED❌"}</div>
      <div className="flex-grow p-10">
        <textarea
          className="h-full w-full border p-2 resize-none"
          value={content}
        ></textarea>
      </div>
    </div>
  );
};

export default Editor;
