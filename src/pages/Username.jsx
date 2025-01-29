import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { guestLogin } from "../redux/slice/userSlice";
import { transitionTo } from "../redux/slice/navigatorSlice";

export const UsernamePage = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  let transitionTextStyles = `font-mono font-bold text-2xl`;

  useEffect(() => {
    // Create a style element
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";

    // Define keyframes
    const keyframes = `
    .loading-animation-wrapper {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  overflow: hidden;
}
 
    `;

    // Append keyframes to the style element
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);

    return () => {
      // Cleanup on component unmount
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="" onClick={() => {}}>
      <div className="loading-animation-wrapper">
        <div className={`bg-[#c6d0d3] rounded-md p-16`} style={{}}>
          <label className={`${transitionTextStyles}`}>USERNAME</label>
          <br></br>
          <input
            className="px-2 py-1 mb-1 rounded border outline-black outline-1"
            id="username"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <br></br>
          <button
            className="p-2 rounded bg-gray-950 text-white font-semibold outline-3 outline-red-500 hover:bg-gray-800 transition-colors float-right"
            onClick={() => {
              dispatch(guestLogin(name));

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
      </div>
    </div>
    // <div
    //   className={`bg-[#c6d0d3] rounded-md relative`}
    //   style={{ height: "100vh" }}
    // >
    //   <button
    //           className="p-2 rounded bg-gray-950 text-white font-semibold outline-3 outline-red-500 hover:bg-gray-800 transition-colors"
    //           onClick={() => {
    //             console.log("lplp");
    //             // mutate({ documentName: "DUMMY" });
    //             dispatch(
    //               transitionTo({
    //                 endComponent: "username",
    //                 transitionText: "Logging you in...",
    //               })
    //             );
    //           }}
    //         >
    //           {"Log In as Guest"}
    //         </button>
    //   <label htmlFor="username" className={`font-semibold`}>USERNAME</label>
    //   <input
    //     id="username"
    //     type="text"
    //     value={name}
    //     onChange={(e) => {
    //       setName(e.target.value);
    //     }}
    //   ></input>
    //   <button
    //     onClick={() => {
    //       dispatch(guestLogin(name));

    //       dispatch(
    //         transitionTo({
    //           endComponent: "editor",
    //           transitionText: "Setting up the document...",
    //         })
    //       );
    //     }}
    //   >
    //     Next
    //   </button>
    // </div>
  );
};
