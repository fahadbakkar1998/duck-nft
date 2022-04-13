import useMachineStore from "../../../store";
import { MachineMode } from "../../../utils/constants";

const Custom: () => JSX.Element = () => {
  const currentMode = useMachineStore((state) => state.currentMode);

  return (
    <div
      className={`pixel-font`}
    >
      <div className="Custom-title mb-2">DUCKSTOMIZER</div>
      <div className="Custom-content mb-2">
        Mint your own own custom duck using the drawing application 
        to the right.
      </div>
      <div className="Custom-content mb-2">
        Your custom work of duck will be stored directly on the 
        Ethereum blockchain.
      </div>
      <div className="Custom-content">
        <span className="text-red-500">BURN NOTICE:</span> the owner of this machine reserves the right to destroy any ducks that offend their arbitrary 
        standards of decency.
      </div>
    </div>
  );
};

export default Custom;
