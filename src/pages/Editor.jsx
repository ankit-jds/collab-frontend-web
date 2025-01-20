import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import { useDocumentAPI } from "../hooks/useDocumentAPI";
import { useCreateDocument } from "../hooks/useCreateDocument";
import useWebSocket from "../hooks/useWebsocket";
import { navigateTo } from "../redux/slice/navigatorSlice";
import { setDocumentMetadata } from "../redux/slice/editorSlice";

export const EditorPage = () => {
  const dispatch = useDispatch();

  const documentId = useSelector((state) => state.editor.documentId);
  const documentName = useSelector((state) => state.editor.documentName);
  const {
    data: documentData,
    isLoading: FetchDocumentLoading,
    error: fetchDocumentError,
  } = useDocumentAPI({ documentId: documentId, documentName: documentName });

  const {
    mutate: createDocument,
    isLoading: createDocumentLoading,
    // isError,
    // error,
    // isSuccess,
    data: res,
  } = useCreateDocument();

  useEffect(() => {
    if (documentId === null && !createDocumentLoading) {
      createDocument();
      console.log(res, documentId, "res");

      dispatch(setDocumentMetadata({ documentName: "123", documentId: "456" }));
    }
  }, []);

  const storedValue = localStorage.getItem("content");
  const initialContentState = storedValue ? JSON.parse(storedValue) : "";

  const [content, setContent] = useState(initialContentState);
  const inputRef = useRef(null);

  const deltasValue = localStorage.getItem("delta");
  const deltasRef = useRef(deltasValue ? JSON.parse(deltasValue) : []);
  const timeoutRef = useRef([]);
  const user = 12;
  const DEBOUNCE_DELAY = 500;

  const wsurl = documentData ? `ws://127.0.0.1:8420/ws/document/5/` : null;
  const { isConnected, sendMessage } = useWebSocket(wsurl, {
    onOpen: () => console.log("websocket connected"),
    onClose: () => console.log("websocket disconnected"),
    onMessage: (message) => {
      if (
        typeof message === "object" &&
        Array.isArray(deltasRef.current) &&
        deltasRef.current.length === 0
      ) {
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

  useEffect(() => {
    if (content) {
      localStorage.setItem("content", JSON.stringify(content));
    }
  }, [content]);

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
      if (deltasRef.current) {
        localStorage.setItem("delta", JSON.stringify(deltasRef.current));
      }

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
        console.log("why this printing....");

        if (deltasRef.current && isConnected) {
          deltasRef.current = []; // Clear the deltas after sending
          localStorage.setItem("delta", JSON.stringify(deltasRef.current));
        }
      }, DEBOUNCE_DELAY);
    }

    setContent(newValue);
  };

  if (FetchDocumentLoading) return <div>Fetching Document...</div>;
  if (fetchDocumentError)
    return <div>Error in Fetching Document: {fetchDocumentError.message}</div>;
  if (createDocumentLoading) return <div>Creating Document...</div>;

  return (
    <div className="flex flex-col h-lvh">
      <div onClick={() => dispatch(navigateTo("login"))}>GO TO LOGIN</div>
      <div>
        <Header documentNameProp={documentData?.data?.name} />
      </div>
      <div className="relative h-full flex flex-col">
        {isConnected ? (
          ""
        ) : (
          <div className="w-max inline p-2 text-white bg-slate-800 rounded self-center absolute">
            Trying to reconnect🔄
          </div>
        )}
        <div className="flex-grow p-10 pt-4">
          <textarea
            className={`h-full w-full border p-2 resize-none rounded ${
              isConnected ? "" : "bg-gray-300"
            }`}
            type="text"
            value={content}
            placeholder={"Start Typing..."}
            ref={inputRef}
            onChange={handleChange}
            disabled={isConnected ? false : true}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
