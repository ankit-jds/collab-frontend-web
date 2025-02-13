import { UserRound, AlignLeft, UserRoundPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { logo } from "../assets";
import Modal from "./Modal";
import { useQRCode } from "../hooks/useQRCode";
import { useSelector } from "react-redux";

const Header = ({
  documentNameProp = "Testing",
  logo = "#626D58",
  light = "#f0f0f0",
  dark = "#E97777",
  usersList = [],
  isConnected = false,
}) => {
  const documentId = useSelector((state) => state.editor.documentId);
  const username = useSelector((state) => state.user.username);
  // const users = useSelector((state) => state.editor.users);

  // const initialOnlineUsers = users;

  // const [usersList, setUsersList] = useState(initialOnlineUsers);

  const [documentName, setDocumentName] = useState(documentNameProp);
  const [documentNameInputWidth, setDocumentNameInputWidth] = useState(
    `${documentNameProp?.length + 2}ch`
  );
  const spanRef = useRef(null);
  // update documentName input width
  useEffect(() => {
    if (spanRef.current) {
      setDocumentNameInputWidth(`${spanRef.current?.offsetWidth || 50}px`);
      // dispatch document name change
    }
  }, [documentName]);
  let iconHeight = "36px";
  let iconWidth = iconHeight;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    data: QRCodeData,
    isLoading: FetchQRCodeLoading,
    error: fetchQRCodeError,
  } = useQRCode({ documentId: documentId });

  return (
    <div className="relative flex justify-between items-center gap-4 px-3 py-2 overflow-hidden ">
      {/* below is basic user icon */}
      {!logo ? (
        <img
          className="rounded-full"
          src={logo}
          style={{ height: "40px", fill: "#64748b" }}
          alt={"logo"}
        ></img>
      ) : (
        <div
          className="flex-shrink-0 border-2 border-black "
          style={{ backgroundColor: logo }}
        >
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
          className={`px-2 rounded outline-[black]`}
          style={{
            // width: `${documentName.length + 2}ch`,
            width: documentNameInputWidth,
            minWidth: documentName === "" ? "18ch" : "1ch",
            // maxWidth: "100%",  width: "2000px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            backgroundColor: light,
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
              className={`text-black font-bold p-1 px-2 rounded`}
              style={{
                backgroundColor: light,
                cursor: isConnected ? "pointer" : "not-allowed",
              }}
              onClick={() => {
                if (isConnected) {
                  openModal();
                }
              }}
            >
              SHARE
            </div>

            <Modal show={isModalOpen} onClose={closeModal}>
              <div className={`p-5`} style={{ width: "400px" }}>
                <h2 className={`font-semibold text-xl`}>
                  Share {`"${documentName} ${documentId}"`}
                </h2>
                <div className={`py-2`}>
                  <h3>People currently active</h3>
                  {usersList?.map((user, index) => (
                    <div key={index} className={`flex items-center gap-3 my-3`}>
                      <div
                        className={`w-[${iconWidth}] h-[${iconHeight}] flex items-center justify-center text-black font-bold rounded-full cursor-pointer`}
                        style={{
                          backgroundColor: "green",
                          width: iconWidth,
                          height: iconHeight,
                        }}
                      >
                        {String(user ? user[0] : "A").toUpperCase()}
                      </div>
                      <h4 className={`text-lg`}>
                        {String(user ? user : "Ankit Tamboli")}{" "}
                        {user === username ? "(you)" : ""}
                      </h4>
                    </div>
                  ))}
                </div>

                <div className={`py-2`}>
                  <h3 className={` `}>
                    <span className="font-semibold text-xl">QR Code </span>
                    <br></br>(
                    <span className="font-normal text-base italic">
                      Scan the QR code to log in on your mobile
                    </span>
                    )
                  </h3>
                  <div className={`flex items-center gap-3 my-3`}>
                    <h4 className={`text-lg`}>
                      {FetchQRCodeLoading ? (
                        <>Loading QR Code...</>
                      ) : (
                        <>
                          <img src={QRCodeData?.data} className={`w-44 h-44`} />
                        </>
                      )}
                    </h4>
                  </div>
                </div>

                {/* <div className={`mt-5`}>
                  <button
                    className={`p-2 px-3 border-black border rounded-full`}
                    onClick={closeModal}
                  >
                    🔗 Copy link
                  </button>
                </div> */}
              </div>
            </Modal>
            {/* <div
              className={`bg-[#0c9696] p-1.5 rounded-full h-[${iconHeight}] w-[${iconWidth}] flex justify-center items-center cursor-pointer`}
              style={{ backgroundColor: light }}
            >
              <UserRoundPlus />
            </div> */}
            <div
              className={`w-[${iconWidth}] h-[${iconHeight}] flex items-center justify-center text-black font-bold bg-green-800 rounded-full cursor-pointer`}
              style={{
                backgroundColor: light,
                width: iconWidth,
                height: iconHeight,
              }}
              onClick={() => {
                alert("Storage has been purged!");
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = "/";
              }}
            >
              {String(username ? username[0] : "A").toUpperCase()}
            </div>
          </>
        ) : (
          <div
            className=" border-2 border-black rounded-full cursor-pointer"
            onClick={() => {
              alert("Storage has been purged!");
              localStorage.clear();
              sessionStorage.clear();
            }}
          >
            <UserRound />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
