import useMachineStore from "../../../store";
import { MachineMode } from "../../../utils/constants";

const Shopping: () => JSX.Element = () => {
  const currentMode = useMachineStore((state) => state.currentMode);
  const currentDuckId = useMachineStore((state) => state.currentDuckId);

  return (
    <div
      className={`Shopping ${
        currentMode === MachineMode.Shopping ? "fadeIn" : "fadeOut"
      }`}
    >
      {currentDuckId >= 0 && (
        <img
          className="Shopping-img"
          alt={""}
          src={require(`../../../assets/img/ducks/crypto_duck_${currentDuckId + 1}.svg`)}
        />
      )}
    </div>
  );
};

export default Shopping;
