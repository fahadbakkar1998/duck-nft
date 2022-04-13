import useMachineStore from "../../../store";
import { MachineMode } from "../../../utils/constants";
import "./index.scss";
import { useMintCustomDuck, useMintTozziDuck } from "../../../hooks/interactions";
import Button from "./Button";

const ButtonView = () => {
  const handleMintTozziDuck = useMintTozziDuck();
  const handleMintCustomDuck = useMintCustomDuck();
  const currState = useMachineStore((state) => state);  
  const { syncing, currentMode, setOpenBurnModal } = currState;

  if (syncing) return <div>Syncing...</div>
  
  if (currentMode === MachineMode.Shopping) {
    return <Button label="Buy Duck" onClick={handleMintTozziDuck} />;
  }

  if (currentMode === MachineMode.Customization) {
    return <Button label="Mint Duck" onClick={handleMintCustomDuck} />;
  }    
  return <Button label="Burn Duck" onClick={() => setOpenBurnModal(true)} />;
}

const AltButton = () => {
  return (
    <div className="absolute -bottom-10 left-[22px] bg-[rgb(8,8,8)] h-12 w-[48%]">  
      <ButtonView />
    </div>
  );
}

export default AltButton;