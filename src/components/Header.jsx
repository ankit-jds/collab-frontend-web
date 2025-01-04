import { UserRound, AlignLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Header = ({ documentNameProp = "Testing" }) => {
  const [documentName, setDocumentName] = useState(documentNameProp);
  const [documentNameInputWidth, setDocumentNameInputWidth] = useState(
    `${documentNameProp.length + 2}ch`
  );
  const spanRef = useRef(null);
  // update documentName input width
  useEffect(() => {
    if (spanRef.current) {
      setDocumentNameInputWidth(`${spanRef.current?.offsetWidth || 50}px`);
    }
  }, [documentName]);
  return (
    <div className="relative flex justify-between gap-4 p-3 overflow-hidden">
      {/* below is basic user icon */}
      <div className="flex-shrink-0 border-2 border-black cursor-pointer">
        <AlignLeft />
      </div>
      <>
        <span
          ref={spanRef}
          className="px-2"
          style={{
            visibility: "hidden",
            position: "absolute",
            // whiteSpace: "pre",
            font: "inherit",
            whiteSpace: "nowrap",
            // overflow: "hidden",
          }}
        >
          {documentName || "Placeholder"} {/* Fallback for empty input */}
        </span>
        <input
          className={`px-2`}
          style={{
            // width: `${documentName.length + 2}ch`,
            width: documentNameInputWidth,
            minWidth: documentName === "" ? "18ch" : "1ch",
            // maxWidth: "100%",  width: "2000px",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          placeholder="Untitled Document"
          value={documentName}
          onChange={(e) => {
            console.log(spanRef.current?.offsetWidth, "jol");

            setDocumentName(e.target.value);
          }}
        />
      </>

      {/* this div is left side of the header */}
      <div className="ms-auto">
        {/* below is basic user icon */}
        <div className=" border-2 border-black rounded-full cursor-pointer">
          <UserRound />
        </div>
      </div>
    </div>
  );
};

export default Header;
