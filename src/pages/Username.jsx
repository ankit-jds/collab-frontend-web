import { useState } from "react";
import { useDispatch } from "react-redux";
import { guestLogin } from "../redux/slice/userSlice";
import { transitionTo } from "../redux/slice/navigatorSlice";

export const UsernamePage = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <label htmlFor="username">USERNAME</label>
      <input
        id="username"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <button
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
  );
};
