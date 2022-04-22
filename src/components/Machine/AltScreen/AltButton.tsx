import useMachineStore from "../../../store";
import { MachineMode, tozziDuckNum } from "../../../utils/constants";
import { mintTozziDuck, mintCustomDuck } from "../../../utils/interact";
import "./index.scss";
import {
  UseMintTozziDuck,
  UseMintCustomDuck,
} from "../../../hooks/interactions";
import Button from "./Button";

const ButtonView = () => {
  const currState = useMachineStore((state) => state);
  const {
    address,
    currentTozziDuckId,
    ducks,
    setDucks,
    machineConfig,
    setMachineConfig,
    setProcessing,
    setTransactionStatus,
    setShowTxStatus,
    currentMode,
    setOpenBurnModal,
    DToolInst,
    setCustomDuckData,
    customDuckData,
  } = currState;

  const doMintTozziDuck = async () => {
    if (
      currentTozziDuckId < 0 ||
      (ducks[currentTozziDuckId] && !!ducks[currentTozziDuckId].owner)
    )
      return;
    setProcessing(true);
    setTransactionStatus("processing...");
    // setShowTxStatus(true);
    const res = await mintTozziDuck({
      ...ducks[currentTozziDuckId],
    });    
    if (res.success) {
      const tempDuckData = [...ducks];
      tempDuckData[currentTozziDuckId].owner = address;
      setDucks(tempDuckData);
      setMachineConfig({
        ...machineConfig,
        balance: machineConfig.balance + machineConfig.tozziDuckPrice,
      });
    }
    setTransactionStatus(res.status);
    setProcessing(false);
  };

  const doMintCustomDuck = async () => {
    setProcessing(true);
    const base64data = await DToolInst.getWebp();    
    setTransactionStatus("processing...");
    // setShowTxStatus(true);
    const res = await mintCustomDuck({
      base64data,
    });
  
    if (res.success) {
      setCustomDuckData([
        ...customDuckData,
        {
          id: tozziDuckNum + customDuckData.length,
          image: base64data,
          owner: address,
          restTimestamp: machineConfig.burnWindow,
        },
      ]);
      setMachineConfig({
        ...machineConfig,
        balance: machineConfig.balance + machineConfig.customDuckPrice,
      });
    }
    setTransactionStatus(res.status);
    setProcessing(false);
  };

  if (currentMode === MachineMode.Syncing) return <div>Syncing...</div>;

  if (currentMode === MachineMode.Shopping) {
    return <Button label="Buy Duck" onClick={doMintTozziDuck} />;
  }

  if (currentMode === MachineMode.Customization) {
    return <Button label="Mint Duck" onClick={doMintCustomDuck} />;
  }
  return <Button label="Burn Duck" onClick={() => setOpenBurnModal(true)} />;
};

const AltButton = () => {
  return (
    <div className="absolute -bottom-10 left-[22px] bg-[rgb(8,8,8)] h-12 w-[48%]">
      <ButtonView />
    </div>
  );
};

export default AltButton;
