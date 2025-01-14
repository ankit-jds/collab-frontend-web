import { useDispatch } from "react-redux";
import { useCreateDocument } from "../hooks/useCreateDocument";
import { navigateTo, transitionTo } from "../redux/slice/navigatorSlice";
import { hero } from "../assets";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const background = "#123123";
  const { mutate, isLoading, isError, error, isSuccess } = useCreateDocument();

  return (
    <div className="">
      {/* <div onClick={() => dispatch(navigateTo("editor"))}>GO TO EDITOR</div>
      <div
        className="text-lg bg-red-800"
        onClick={() => dispatch(transitionTo({ endComponent: "end" }))}
      >
        GO TO EDITOR BY TRANSTION
      </div> */}
      <div className="flex">
        <div className="overflow-hidden flex justify-center items-center">
          <img
            className="w-auto h-dvh"
            src={hero}
            style={{}}
            alt={"hero"}
          ></img>
        </div>
        <div className="flex flex-col justify-center w-1/2 mx-auto px-32 mb-20">
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
              disabled={isLoading}
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
                    endComponent: "end",
                    transitionText: "Logging you in...",
                  })
                );
              }}
            >
              {isLoading ? "Logging..." : "Log In as Guest"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
