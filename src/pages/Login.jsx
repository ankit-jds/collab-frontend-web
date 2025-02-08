import { useDispatch } from "react-redux";
import { useState } from "react";

import { transitionTo } from "../redux/slice/navigatorSlice";
import { hero } from "../assets";
import Modal from "../components/Modal";

export const LoginPage = () => {
  const dispatch = useDispatch();
  // const background = "#123123";
  // const { mutate, isLoading, isError, error, isSuccess } = useCreateDocument();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="">
      <div className="flex flex-col md:flex-row min-h-screen items-center">
        <div className="overflow-hidden hidden md:flex  justify-center items-center">
          <img
            className="w-auto h-dvh"
            src={hero}
            style={{}}
            alt={"hero"}
          ></img>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center md:items-start w-full md:w-1/2 mx-auto px-12 md:px-32 mb-20">
          <div className="font-mono font-bold text-5xl mb-20">Login</div>
          <div className="flex flex-col w-full mx-auto gap-2">
            <input
              className="px-2 py-1 mb-1 rounded border outline-black outline-1"
              type={"text"}
              placeholder="name@example.com"
              // onChange={(e) => {
              //   var input = e.target.value;
              //   var regex = /^[a-zA-Z0-9@.]*$/;
              //   if (!regex.test(input)) {
              //     alert(
              //       "Invalid input. Only letters (a-z, A-Z), numbers, '@', and '.' are allowed."
              //     );
              //     e.preventDefault();
              //     e.target.value = ""; // Clear the input field if invalid
              //   }
              // }}
              onInput={(e) => {
                var input = e.target.value;
                var regex = /^[a-zA-Z0-9@.]*$/;
                if (!regex.test(input)) {
                  alert(
                    "Invalid input. Only letters (a-z, A-Z), numbers, '@', and '.' are allowed."
                  );
                  e.target.value = input.replace(/[^a-zA-Z0-9@.]/g, "");
                }
              }}
            />
            <button
              className="p-2 rounded bg-white text-black font-semibold  border   hover:bg-slate-50 transition-colors"
              onClick={() => {
                console.log("lplp");
                alert("Working on this...");
              }}
              // disabled={isLoading}
            >
              LOG IN
            </button>
            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span
                  className={` bg-[${"#dddeee"}] bg-white px-2 text-muted-foreground`}
                >
                  OR CONTINUE WITH
                </span>
              </div>
            </div>
            <button
              className="p-2 rounded bg-gray-950 text-white font-semibold outline-3 outline-red-500 hover:bg-gray-800 transition-colors"
              onClick={() => {
                console.log("lplp");
                // mutate({ documentName: "DUMMY" });
                dispatch(
                  transitionTo({
                    endComponent: "username",
                    transitionText: "Logging you in...",
                  })
                );
              }}
            >
              {"Log In as Guest"}
            </button>
          </div>
        </div>
      </div>

      <Modal show={isModalOpen} onClose={closeModal}>
        <div className={`p-5`} style={{ width: "400px" }}>
          <h2 className={`font-semibold text-xl`}></h2>
          <div className={`py-2`}>
            <h3>
              {/* <p style={{ textAlign: "justify" }}>
                I built this <strong>realtime collaboration tool</strong> (like
                Google Docs) to explore how{" "}
                <strong>realtime communication</strong> works at scale.
                <br />
                
                The goal was to learn about <strong>WebSockets</strong>,
                managing <strong>Redis</strong> for high performance, and
                tackling challenges like <strong>data synchronization</strong>{" "}
                and <strong>latency</strong>.
                <br />
                This project reflects my curiosity for solving{" "}
                <strong>complex problems</strong> and my drive to understand the
                tech behind <strong>seamless user experiences</strong>.
                <br />
                It’s been a great learning journey, and I’m excited to bring
                these skills to new challenges.
                <br />
                Thanks for checking it out!
              </p> */}

              <p style={{ textAlign: "justify" }}>
                I built this <strong>realtime collaboration tool</strong> (like
                Google Docs) to explore <strong>realtime communication</strong>{" "}
                at scale, learning about <strong>WebSockets</strong>, managing{" "}
                <strong>Redis</strong> for performance, and tackling challenges
                like <strong>data synchronization</strong> and{" "}
                <strong>latency</strong>. This project reflects my drive to
                solve <strong>complex problems</strong> and create{" "}
                <strong>seamless user experiences</strong>, and I’m excited to
                bring these skills to new challenges.
              </p>
            </h3>
          </div>
        </div>
      </Modal>
    </div>
  );
};
