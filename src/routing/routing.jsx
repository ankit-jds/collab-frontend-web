import { useDispatch, useSelector } from "react-redux";
import { Components } from ".";
import { navigateTo, transitionTo } from "../redux/slice/navigatorSlice";
import { useEffect } from "react";
import { setDocumentId } from "../redux/slice/editorSlice";

export const Routing = () => {
  let ac = useSelector((state) => state.navigator.activeComponent);
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get("id");
    if (id) {
      console.log(id, "lplplplplp");

      dispatch(setDocumentId(id));
      dispatch(
        transitionTo({
          endComponent: "username",
          transitionText: "Logging you in...",
        })
      );
      // window.location.href = "/";
    }
  }, []);

  const ActiveComponent = Components[ac];

  const isTransitioning = useSelector(
    (state) => state.navigator.isTransitioning
  );
  const transitionPayload = useSelector(
    (state) => state.navigator.transitionPayload
  );
  if (isTransitioning) {
    // console.log(transitionPayload, "....");
    setTimeout(() => {
      console.log("hy inside settimeout...");

      dispatch(navigateTo(transitionPayload?.endComponent));
    }, [transitionPayload?.transitionTime]);
  }

  return (
    <div>
      <ActiveComponent />
    </div>
  );
};
