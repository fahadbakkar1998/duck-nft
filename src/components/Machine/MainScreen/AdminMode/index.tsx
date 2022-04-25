import { useState, useEffect } from "react";
import { getUFloat, getUInt } from "../../../../utils/common";
import { saveMachineSetting, withdraw } from "../../../../utils/interact";
import useMachineStore from "../../../../store";
import CheckBox from "../../../common/CheckBox";
import { MachineMode } from "../../../../utils/constants";
import { MintStatus } from "../../../../types/types";
import cn from "classnames";
import "./index.scss";

const AdminMain = () => {
  const {
    currentMode,
    machineConfig,
    setMachineConfig,
    processing,
    setProcessing,
    setTransactionStatus,
    // setShowTxStatus,
  } = useMachineStore();

  const [tozziDuckMintStatus, setTozziDuckMintStatus] = useState<number>(
    machineConfig.tozziDuckMintStatus
  );
  const [tozziDuckPrice, setTozziDuckPrice] = useState<number | string>(
    machineConfig.tozziDuckPrice
  );
  const [customDuckMintStatus, setCustomDuckMintStatus] = useState<number>(
    machineConfig.customDuckMintStatus
  );
  const [customDuckPrice, setCustomDuckPrice] = useState<number | string>(
    machineConfig.customDuckPrice
  );
  const [maxCustomDucks, setMaxCustomDucks] = useState<number | string>(
    machineConfig.maxCustomDucks
  );
  const [withdrawAmount, setWithdrawAmount] = useState<number | string>(0);

  useEffect(() => {
    setTozziDuckMintStatus(machineConfig.tozziDuckMintStatus || 0);
    setTozziDuckPrice(machineConfig.tozziDuckPrice || "");
    setCustomDuckMintStatus(machineConfig.customDuckMintStatus || 0);
    setCustomDuckPrice(machineConfig.customDuckPrice || "");
    setMaxCustomDucks(machineConfig.maxCustomDucks || "");
  }, [machineConfig]);

  return (
    <div
      className={cn(
        "AdminMain inner-shadow pixel-font py-5 px-10 relative text-sm",
        {
          active: currentMode === MachineMode.Admin,
        }
      )}
    >
      <div className="mb-2 text-lg">SYSTEM SETTINGS</div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="flex items-center justify-start">OWNER:</h2>
          <div
            className="flex-1 overflow-hidden text-ellipsis"
            title={machineConfig.owner}
          >
            {machineConfig.owner}
          </div>
        </div>
        <h2 className="flex items-center justify-start">TOZZI DUCKS:</h2>
        <div className="flex items-center justify-between ml-4">
          <div className="flex items-center h-full flex-2">
            Minting Enabled?
          </div>
          <div className="relative">
            <CheckBox
              className="w-full px-1 mr-2 text-center"
              isSelected={tozziDuckMintStatus === MintStatus.Enabled}
              onClick={() => setTozziDuckMintStatus(MintStatus.Enabled)}
              label="YES"
            />
            <CheckBox
              className="w-full px-1 mr-2 text-center"
              isSelected={tozziDuckMintStatus === MintStatus.Whitelist}
              onClick={() => setTozziDuckMintStatus(MintStatus.Whitelist)}
              label="WHITE"
            />
            <CheckBox
              className="w-full px-1 text-center"
              isSelected={tozziDuckMintStatus === MintStatus.Disabled}
              onClick={() => setTozziDuckMintStatus(MintStatus.Disabled)}
              label="NO"
            />
          </div>
        </div>
        <div className="flex items-center justify-between ml-4">
          <div className="flex items-center h-full">Mint Price:</div>
          <div className="relative">
            <input
              value={tozziDuckPrice}
              onChange={(e) => {
                setTozziDuckPrice(e.target.value);
              }}
              type="text"
              className="
                focus:outline-none
                py-1 px-2 text-left bg-white w-[148px] text-black 
              "
            />
            <div className="absolute right-2 top-1 text-[rgba(8,8,8,0.4)]">
              ETH
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-2 pb-2 mt-2 space-y-2">
        <h2 className="flex items-center justify-start">CUSTOM DUCKS:</h2>
        <div className="flex items-center justify-between ml-4">
          <div className="flex items-center h-full flex-2">
            Minting Enabled?
          </div>
          <div className="relative">
            <CheckBox
              className="w-full px-1 mr-2 text-center"
              isSelected={customDuckMintStatus === MintStatus.Enabled}
              onClick={() => setCustomDuckMintStatus(MintStatus.Enabled)}
              label="YES"
            />
            <CheckBox
              className="w-full px-1 mr-2 text-center"
              isSelected={customDuckMintStatus === MintStatus.Whitelist}
              onClick={() => setCustomDuckMintStatus(MintStatus.Whitelist)}
              label="WHITE"
            />
            <CheckBox
              className="w-full px-1 text-center"
              isSelected={customDuckMintStatus === MintStatus.Disabled}
              onClick={() => setCustomDuckMintStatus(MintStatus.Disabled)}
              label="NO"
            />
          </div>
        </div>
        <div className="flex items-center justify-between ml-4">
          <div className="flex items-center h-full flex-2">Mint Price:</div>
          <div className="relative">
            <input
              value={customDuckPrice}
              onChange={(e) => {
                setCustomDuckPrice(e.target.value);
              }}
              type="text"
              className="
                focus:outline-none
                py-1 px-2 text-left bg-white w-[148px] text-black 
              "
            />
            <div className="absolute right-2 top-1 text-[rgba(8,8,8,0.4)]">
              ETH
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between ml-4">
          <div className="flex-2">Max Custom Ducks:</div>
          <div className="relative">
            <input
              type="text"
              value={maxCustomDucks}
              onChange={(e) => {
                setMaxCustomDucks(Number(e.target.value));
              }}
              className="
                focus:outline-none
                py-1 px-2 text-left bg-white w-[148px] text-black 
              "
            />
          </div>
        </div>
      </div>
      <div
        className="w-full p-2 px-4 mt-2 text-center cursor-pointer hover:bg-white hover:text-black"
        onClick={async () => {
          if (processing) return;
          const correctTozziDuckPrice = getUFloat(tozziDuckPrice);
          const correctCustomDuckPrice = getUFloat(customDuckPrice);
          const correctMaxCustomDucks = getUInt(maxCustomDucks);
          setTozziDuckPrice(correctTozziDuckPrice);
          setCustomDuckPrice(correctCustomDuckPrice);
          setMaxCustomDucks(correctMaxCustomDucks);
          const setting = {
            tozziDuckMintStatus,
            tozziDuckPrice: correctTozziDuckPrice,
            customDuckMintStatus,
            customDuckPrice: correctCustomDuckPrice,
            maxCustomDucks: correctMaxCustomDucks,
          };
          setProcessing(true);
          setTransactionStatus("processing...");
          // setShowTxStatus(true);
          const res = await saveMachineSetting({
            machineConfig: setting,
          });
          if (res.success) {
            setMachineConfig({
              ...machineConfig,
              ...setting,
            });
          }
          setTransactionStatus(res.status);
          setProcessing(false);
        }}
      >
        SAVE
      </div>
      <div className="flex items-center justify-between mt-2">
        <h2 className="flex items-center justify-start">SYSTEM BALANCE:</h2>
        <div>{machineConfig.balance} ETH</div>
      </div>
      <div className="flex-end">
        <div
          onClick={async () => {
            if (processing) return;
            const correctWithdrawAmount = getUFloat(withdrawAmount);
            setWithdrawAmount(correctWithdrawAmount);
            if (
              correctWithdrawAmount <= 0 ||
              correctWithdrawAmount > machineConfig.balance
            )
              return;
            setProcessing(true);
            setTransactionStatus("processing...");
            // setShowTxStatus(true);
            const res = await withdraw({
              amount: correctWithdrawAmount,
            });
            if (res.success) {
              setMachineConfig({
                ...machineConfig,
                balance: machineConfig.balance - correctWithdrawAmount,
              });
            }
            setTransactionStatus(res.status);
            setProcessing(false);
          }}
        >
          WITHDRAW
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
