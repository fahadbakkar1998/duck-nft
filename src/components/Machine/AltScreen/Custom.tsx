import useMachineStore from "../../../store";
import { MachineMode } from "../../../types/types";

const Custom: () => JSX.Element = () => {
  const currentMode = useMachineStore((state) => state.currentMode);

  return (
    <div
      className={`Custom ${
        currentMode === MachineMode.Customization ? "fadeIn" : "fadeOut"
      }`}
    >
      <div className="Custom-title">Create-a-Duck</div>
      <div className="Custom-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
    </div>
  );
};

export default Custom;
