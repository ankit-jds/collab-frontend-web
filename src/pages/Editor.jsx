import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import { useDocumentAPI } from "../hooks/useDocumentAPI";
import { useCreateDocument } from "../hooks/useCreateDocument";
import useWebSocket from "../hooks/useWebSocket";
import {
  setDocumentContent,
  setDocumentMetadata,
} from "../redux/slice/editorSlice";

export const EditorPage = () => {
  const dispatch = useDispatch();

  const documentId = useSelector((state) => state.editor.documentId);
  const documentName = useSelector((state) => state.editor.documentName);
  const documentContent = useSelector((state) => state.editor.documentContent);
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
    }
  }, []);

  useEffect(() => {
    if (res || documentData) {
      let r = res || documentData;

      dispatch(
        setDocumentMetadata({
          documentName: r?.data?.name,
          documentId: r?.data?.id,
        })
      );
    }
  }, [res, documentData]);

  // const storedValue = localStorage.getItem("content");
  const initialContentState = documentContent;

  const [content, setContent] = useState(initialContentState);
  const inputRef = useRef(null);

  const deltasValue = localStorage.getItem("delta");
  const deltasRef = useRef(deltasValue ? JSON.parse(deltasValue) : []);
  const timeoutRef = useRef([]);
  const user = 12;
  const DEBOUNCE_DELAY = 500;

  function insertAt(str, char, position) {
    return str.slice(0, position) + char + str.slice(position);
  }

  function deleteAt(str, position) {
    return str.slice(0, position) + str.slice(position + 1);
  }
  const [wsurl, setWsurl] = useState(null);
  // const wsurl = documentId
  //   ? `ws://192.168.1.16:8420/ws/document/${documentId}/`
  //   : null;
  useEffect(() => {
    if (documentId)
      setWsurl(
        documentId ? `ws://192.168.1.16:8420/ws/document/${documentId}/` : null
      );
  }, [documentId]);

  const { isConnected, sendMessage } = useWebSocket(wsurl, {
    onOpen: () => console.log("websocket connected"),
    onClose: () => console.log("websocket disconnected"),
    onMessage: (message) => {
      try {
        if (Array.isArray(message)) {
          function setTextHelper(prev, message) {
            prev = [(undefined, null, 0)].includes(prev) === true ? "" : prev;

            message.forEach((value, index) => {
              if (value?.operation == "INSERT") {
                prev = insertAt(prev, value?.character, value?.position);
              }
              if (value?.operation == "DELETE") {
                prev = deleteAt(prev, value?.position);
              }
            });

            return prev;
          }
          setContent((prev) => setTextHelper(prev, message));
        }
        console.log(message, "mesese");

        if (message?.content) {
          setContent(message ? message?.content : "");
        }
      } catch {
        console.error("Error while parsing the message data...");
      }

      // if (
      //   typeof message === "object" &&
      //   Array.isArray(deltasRef.current) &&
      //   deltasRef.current.length === 0
      // ) {
      //   console.log("yeh bhi run hora hai...");

      //   setContent(message?.content);
      //   console.log("kyu run hora hai...");
      // } else {
      //   // apply operations code here...
      //   console.log(message, "operations has arrived");
      // }
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
    if (content !== documentContent) {
      localStorage.setItem("content", JSON.stringify(content));
      dispatch(setDocumentContent(content));
    }
  }, [content, documentContent, dispatch]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const prevValue = content || "";
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
  // colors
  var text_area_enabled = "#FFFAD7";
  var text_area_disabled = "#FCDDB0";
  var toast = "#E97777";
  var header = "#FF9F9F";
  //
  return (
    <div className="flex flex-col h-lvh" style={{ backgroundColor: header }}>
      {/* <div onClick={() => dispatch(navigateTo("login"))}>GO TO LOGIN</div> */}
      <div
        style={{
          backgroundColor: header,
          // boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Header documentNameProp={documentName} />
      </div>
      <div className="relative h-full flex flex-col">
        {isConnected ? (
          ""
        ) : (
          <div
            className="w-max inline p-2 text-black rounded self-center absolute"
            style={{ backgroundColor: toast }}
          >
            Trying to reconnect🔄
          </div>
        )}
        <div className="flex-grow p-10 pt-4">
          <textarea
            className={`h-full w-full border p-2 resize-none rounded ${
              isConnected ? "" : ""
            }`}
            style={{
              backgroundColor: isConnected
                ? text_area_enabled
                : text_area_disabled,
            }}
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
