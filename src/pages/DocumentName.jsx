import { useState } from "react";
import { useDispatch } from "react-redux";
import { transitionTo } from "../redux/slice/navigatorSlice";
// import { setDocumentName } from "../redux/slice/editorSlice";

export const DocumentNamePage = () => {
  const [documentNameState, setDocumentNameState] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <label htmlFor="documentName">DOCUMENT NAME</label>
      <input
        id="documentName"
        type="text"
        value={documentNameState}
        onChange={(e) => {
          setDocumentNameState(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          // dispatch(setDocumentName(documentNameState));
          dispatch(
            transitionTo({
              endComponent: "editor",
              transitionText: "Setting up the document...",
            })
          );
        }}
      >
        Next
      </button>
    </div>
  );
};
