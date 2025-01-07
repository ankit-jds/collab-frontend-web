import { useRef, useState } from "react";
import Header from "../components/Header";
import { useDocumentAPI } from "../hooks/useDocumentAPI";
import useWebSocket from "../hooks/useWebsocket";

const Editor = () => {
  const {
    data: documentData,
    isLoading: isLoading1,
    error: error1,
  } = useDocumentAPI({ documentId: 5 });
  const [content, setContent] = useState("");
  const inputRef = useRef(null);
  const deltasRef = useRef([]);
  const timeoutRef = useRef([]);
  const user = 12;
  const DEBOUNCE_DELAY = 500;

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

  // useEffect(() => {
  //   let timeoutId;
  //   if (content) {
  //     const delay = 500;
  //     timeoutId = setTimeout(() => {
  //       setDebouncedText(content);
  //     }, delay);
  //   }

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [content]);

  // useEffect(() => {
  //   if (isConnected && debouncedText) {
  //     sendMessage({
  //       userid: "user",
  //       message: debouncedText,
  //     });
  //   }
  // }, [debouncedText]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const prevValue = content;
    const cursorPosition = inputRef.current.selectionStart;
    let delta = null;

    if (newValue.length > prevValue.length) {
      // inserted
      const char = newValue[cursorPosition - 1];
      delta = {
        operation: "INSERT",
        character: char,
        position: cursorPosition - 1,
        userid: user,
      };
      console.log(delta, "here it is...");

      // sendDelta(delta);
    } else if (newValue.length < prevValue.length) {
      // Text deleted
      const deletedChar = prevValue[cursorPosition]; // Get deleted character
      delta = {
        operation: "DELETE",
        position: cursorPosition,
        character: deletedChar,
        userid: user,
      };
      // sendDelta(delta);
    }

    if (delta) {
      // Store the delta in the ref (batched)
      deltasRef.current.push(delta);

      // Clear the existing timeout if there's already one (debouncing)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout to send the batched deltas after the debounce delay
      timeoutRef.current = setTimeout(() => {
        // event for segregating websocket message at the backend

        sendMessage({
          type: "document_update",
          message: deltasRef.current,
        }); // Send all collected deltas
        deltasRef.current = []; // Clear the deltas after sending
      }, DEBOUNCE_DELAY);
    }

    setContent(newValue);
  };

  if (isLoading1) return <div>Loading...</div>;
  if (error1) return <div>Error in API 1: {error1.message}</div>;

  return (
    <div className="flex flex-col h-lvh">
      <Header documentNameProp={documentData?.data?.name} />
      <div>websocket : {isConnected ? "CONNECTED✅" : "DISCONNECTED❌"}</div>
      <div className="flex-grow p-10">
        <textarea
          className="h-full w-full border p-2 resize-none"
          type="text"
          value={content}
          placeholder={"Start Typing..."}
          ref={inputRef}
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  );
};

export default Editor;
