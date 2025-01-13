import { useSelector } from "react-redux";
import { Components } from ".";

export const Routing = () => {
  const ActiveComponent =
    Components[useSelector((state) => state.navigator.activeComponent)];

  return (
    <div>
      <ActiveComponent />
    </div>
  );
};
