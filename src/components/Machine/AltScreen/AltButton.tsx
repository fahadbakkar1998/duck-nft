import useMachineStore from "../../../store";
import { MachineMode, tozziDuckNum } from "../../../utils/constants";
import {
  mintTozziDuck,
  mintCustomDuck,
  getLastTokenId,
} from "../../../utils/interact";
import "./index.scss";
import Button from "./Button";
import { BuyIcon } from "../../common/SvgIcon";

const ButtonView = () => {
  const currState = useMachineStore((state) => state);
  const {
    address,
    currentDuckId,
    ducks,
    setDucks,
    machineConfig,
    setMachineConfig,
    setProcessing,
    setTransactionStatus,
    currentMode,
    setOpenBurnModal,
    DToolInst,
    // setShowTxStatus,
  } = currState;

  const doMintTozziDuck = async () => {
    if (
      currentDuckId < 0 ||
      (ducks[currentDuckId] && !!ducks[currentDuckId].owner)
    )
      return;
    setProcessing(true);
    setTransactionStatus("processing...");
    // setShowTxStatus(true);
    const res = await mintTozziDuck({
      ...ducks[currentDuckId],
    });
    if (res.success) {
      const tempDuckData = [...ducks];
      tempDuckData[currentDuckId].owner = address;
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
      setDucks([
        ...ducks,
        {
          id: await getLastTokenId(),
          proof: [],
          webp: "",
          owner: address,
          salePrice: 0,
          isCustom: true,
          restTimestamp: machineConfig.burnWindow,
          image: base64data,
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
    return (
      <Button onClick={doMintTozziDuck}>
        <div className="flex space-x-2 justify-center items-center transition-all lcd-font text-black opacity-80">
          <div>buy duck</div>
          <BuyIcon  wrapperClassName="w-5 mb-[3px]" className="stroke-black"/>
        </div>
      </Button>
    );
  }

  if (currentMode === MachineMode.Customization) {
    return (
      <Button onClick={doMintCustomDuck}>
        mint duck
      </Button>
    );
  }
  return (
    <Button onClick={() => setOpenBurnModal(true)}>
      burn duck
    </Button>
  );
};

const AltButton = () => {
  return (
    <div className="inner-shadow absolute rounded-sm -bottom-[10.25%] left-[5.75%] graph-bg h-[12.5%] w-[48.75%]">
      <ButtonView />
    </div>
  );
};

export default AltButton;
