const Login = () => {
  const background = "#123123";
  return (
    <div className="">
      <div className="flex flex-col w-1/2 mx-auto">
        <div className="font-mono font-bold text-5xl mb-10">Login</div>
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
          {/* <input /> */}
          <button className="p-2 rounded bg-white text-black font-semibold  border   hover:bg-slate-50 transition-colors">
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
          <button className="p-2 rounded bg-gray-950 text-white font-semibold outline-3 outline-red-500 hover:bg-gray-800 transition-colors">
            Log In as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
