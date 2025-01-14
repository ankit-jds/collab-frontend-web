import { UserRound, AlignLeft, UserRoundPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { logo } from "../assets";
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
  let iconHeight = "32px";
  let iconWidth = iconHeight;
  return (
    <div className="relative flex justify-between items-center gap-4 px-3 py-2 overflow-hidden ">
      {/* below is basic user icon */}
      {logo ? (
        <img
          className="rounded-full"
          src={logo}
          style={{ height: "40px", fill: "#64748b" }}
          alt={"logo"}
        ></img>
      ) : (
        <div className="flex-shrink-0 border-2 border-black cursor-pointer">
          <AlignLeft />
        </div>
      )}
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
          className={`px-2 rounded outline-[#0c9696]`}
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
      <div className="ms-auto flex justify-center items-center gap-3">
        {/* below is basic user icon */}
        {0 === 0 ? (
          <>
            <div
              className={`bg-[#0c9696] p-1.5 rounded-full h-[${iconHeight}] w-[${iconWidth}] flex justify-center items-center`}
            >
              <UserRoundPlus />
            </div>
            <div
              className={`w-[${iconWidth}] h-[${iconHeight}] flex items-center justify-center text-white bg-green-800 rounded-full `}
            >
              A
            </div>
          </>
        ) : (
          <div className=" border-2 border-black rounded-full cursor-pointer">
            <UserRound />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
