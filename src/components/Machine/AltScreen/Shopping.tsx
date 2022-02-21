import useMachineStore from "../../../store";
import { MachineMode } from "../../../types/types";

const Shopping: () => JSX.Element = () => {
  const currentMode = useMachineStore((state) => state.currentMode);
  const currentDuckID = useMachineStore((state) => state.currentDuckID);

  return (
    <div
      className={`Shopping ${
        currentMode === MachineMode.Shopping ? "fadeIn" : "fadeOut"
      }`}
    >
      {currentDuckID !== 0 && (
        <img
          className="Shopping-img"
          alt={""}
          src={require(`../../../assets/img/ducks/crypto_duck_${currentDuckID}.svg`)}
        />
      )}
    </div>
  );
};

export default Shopping;
