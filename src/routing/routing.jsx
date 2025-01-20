import { useDispatch, useSelector } from "react-redux";
import { Components } from ".";
import { navigateTo } from "../redux/slice/navigatorSlice";

export const Routing = () => {
  let ac = useSelector((state) => state.navigator.activeComponent);
  const dispatch = useDispatch();

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
