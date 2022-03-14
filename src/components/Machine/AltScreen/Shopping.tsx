import useMachineStore from "../../../store";
import { MachineMode } from "../../../utils/constants";

const Shopping: () => JSX.Element = () => {
  const currentMode = useMachineStore((state) => state.currentMode);
  const currentTozziDuckId = useMachineStore((state) => state.currentTozziDuckId);

  return (
    <div
      className={`Shopping ${
        currentMode === MachineMode.Shopping ? "fadeIn" : "fadeOut"
      }`}
    >
      {currentTozziDuckId >= 0 && (
        <img
          className="Shopping-img"
          alt={""}
          src={require(`../../../assets/img/ducks/crypto_duck_${currentTozziDuckId + 1}.svg`)}
        />
      )}
    </div>
  );
};

export default Shopping;
