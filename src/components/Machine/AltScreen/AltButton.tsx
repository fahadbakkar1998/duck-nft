import useMachineStore from "../../../store";
import { MachineMode, tozziDuckNum } from "../../../utils/constants";
import {
  mintTozziDuck,
  mintCustomDuck,
  getLastTokenId,
} from "../../../utils/interact";
import "./index.scss";
import Button from "./Button";
import { BuyIcon, ProfileIcon, ProfileOpenIcon } from "../../common/SvgIcon";
import { connectWallet } from "../../../utils/interact";

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
    setAddress,
    showDuckProfile,
    setShowDuckProfile,
    // setShowTxStatus,
  } = currState;

  const selectedDuck = ducks[currentDuckId];

  const onConnectWallet = async () => {
    const { address, status } = await connectWallet();
    setAddress(address);    
  };


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

  if (currentMode === MachineMode.Off) {
    return (
      <Button onClick={onConnectWallet}>
        <div className="flex space-x-2 justify-center items-center lcd-font opacity-80 text-base mt-1">
          connect wallet
        </div>
      </Button>
    );
  }

  if (currentMode === MachineMode.Syncing) return <div>Syncing...</div>;

  if (currentMode === MachineMode.Shopping) {    
    if (selectedDuck.owner) {
      return (
        <Button onClick={() => setShowDuckProfile(!showDuckProfile)}>
          <div className="flex space-x-2 justify-center items-center lcd-font text-black opacity-80 ">
            <div>profile</div>
            { showDuckProfile ? (
                <ProfileOpenIcon wrapperClassName="w-5 mb-[1px]" className="stroke-black"/>
              ) : (
                <ProfileIcon  wrapperClassName="w-5 mb-[1px]" className="stroke-black"/> 
            )}
          </div>
        </Button>
      );  
    }
    return (
      <Button onClick={doMintTozziDuck}>
        <div className="flex space-x-2 justify-center items-center lcd-font text-black opacity-80">
          <div>buy duck</div>
          <BuyIcon  wrapperClassName="w-5 mb-[3px]" className="stroke-black"/>
        </div>
      </Button>
    );
  }

  if (currentMode === MachineMode.Customization) {
    return (
      <Button onClick={doMintCustomDuck}>
        <div className="flex space-x-2 justify-center items-center lcd-font text-black opacity-80">
          mint duck
        </div>
      </Button>
    );
  }
  return (
    <Button onClick={() => setOpenBurnModal(true)}>
      <div className="flex space-x-2 justify-center items-center lcd-font text-black opacity-80">
        burn duck
      </div>
    </Button>
  );
};

const AltButton = () => {
  return (
    <div className="inner-shadow absolute rounded-sm -bottom-[25.5%] left-[5.75%] graph-bg h-[14.75%] w-[48.75%]">
      <ButtonView />
    </div>
  );
};

export default AltButton;
