import { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { getUFloat, getUInt } from "../../../../utils/common";
import { saveMachineSetting, withdraw } from "../../../../utils/interact";
import useMachineStore from "../../../../store";
import "./index.scss";
import CheckBox from "../../../common/CheckBox";
import { MachineMode } from "../../../../utils/constants";
import cn from "classnames";

const AdminMain = (props: any) => {
  const currentState = useMachineStore((state) => state);
  const {
    currentMode,
    machineConfig,
    setMachineConfig,
    setProcessing,
    setTransactionStatus,
    setShowTxStatus,
  } = currentState;
  const [tozziDucksEnabled, setTozziDucksEnabled] = useState<boolean>(
    machineConfig.tozziDucksEnabled
  );
  const [tozziDuckPrice, setTozziDuckPrice] = useState<any>(
    machineConfig.tozziDuckPrice
  );
  const [customDucksEnabled, setCustomDucksEnabled] = useState<boolean>(
    machineConfig.customDucksEnabled
  );
  const [customDuckPrice, setCustomDuckPrice] = useState<any>(
    machineConfig.customDuckPrice
  );
  const [maxCustomDucks, setMaxCustomDucks] = useState<any>(
    machineConfig.maxCustomDucks
  );
  const [withdrawAmount, setWithdrawAmount] = useState<any>(0);

  useEffect(() => {
    setTozziDucksEnabled(machineConfig.tozziDucksEnabled || false);
    setTozziDuckPrice(machineConfig.tozziDuckPrice || 0);
    setCustomDucksEnabled(machineConfig.customDucksEnabled || false);
    setCustomDuckPrice(machineConfig.customDuckPrice || 0);
    setMaxCustomDucks(machineConfig.maxCustomDucks || 0);
  }, [machineConfig]);

  return (
    <div
      className={cn(
        "AdminMain inner-shadow pixel-font py-5 px-10 relative text-sm",
        { active: currentMode === MachineMode.Admin }
      )}
    >
      <div className="mb-2 text-lg">SYSTEM SETTINGS</div>

      <div className="tozzi-duck-settings flex flex-col space-y-2">
        <div className="flex items-center justify-between space-x-10">
          <h2 className="flex justify-start items-center">OWNER:</h2>
          <div>0x00...00</div>
          {/* <div>{machineConfig.owner}</div> */}
        </div>
        <h2 className="flex justify-start items-center">TOZZI DUCKS:</h2>
        <div className="flex items-center justify-between ml-4 space-x-10">
          <div className="flex-2 flex h-full items-center">
            Minting Enabled?
          </div>
          <div className="flex flex-1">
            <CheckBox
              className="mr-2 w-full text-center"
              isSelected={tozziDucksEnabled}
              onClick={() => setTozziDucksEnabled(true)}
              label="YES"
            />
            <CheckBox
              className="w-full text-center"
              isSelected={!tozziDucksEnabled}
              onClick={() => setTozziDucksEnabled(false)}
              label="NO"
            />
          </div>
        </div>

        <div className="flex items-center justify-between ml-4">
          <div className="flex-2 flex h-full items-center">Mint Price:</div>
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

      <div className="custom-duck-settings flex flex-col space-y-2 mt-2 pt-2 pb-2 ">
        <h2 className="flex justify-start items-center">CUSTOM DUCKS:</h2>
        <div className="flex items-center justify-between ml-4 space-x-10">
          <div className="flex-2 flex h-full items-center">
            Minting Enabled?
          </div>
          <div className="flex flex-1">
            <CheckBox
              className="mr-2 w-full text-center"
              isSelected={customDucksEnabled}
              onClick={() => setCustomDucksEnabled(true)}
              label="YES"
            />
            <CheckBox
              className="w-full text-center"
              isSelected={!customDucksEnabled}
              onClick={() => setCustomDucksEnabled(false)}
              label="NO"
            />
          </div>
        </div>

        <div className="flex items-center justify-between ml-4">
          <div className="flex-2 flex items-center h-full">Mint Price:</div>
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
                setMaxCustomDucks(e.target.value);
              }}
              className="
                focus:outline-none
                py-1 px-2 text-left bg-white w-[148px] text-black 
              "
            />
          </div>
        </div>
      </div>
      <div className="_footer">
        <div
          className="_btn px-4 p-2 mt-2 w-full text-center bg-"
          onClick={async () => {
            const correctTozziDuckPrice = getUFloat(tozziDuckPrice);
            const correctCustomDuckPrice = getUFloat(customDuckPrice);
            const correctMaxCustomDucks = getUInt(maxCustomDucks);
            setTozziDuckPrice(correctTozziDuckPrice);
            setCustomDuckPrice(correctCustomDuckPrice);
            setMaxCustomDucks(correctMaxCustomDucks);
            const setting = {
              tozziDucksEnabled,
              tozziDuckPrice: correctTozziDuckPrice,
              customDucksEnabled,
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
      </div>

      <div className="flex items-center justify-between space-x-10 mt-2">
        <h2 className="flex justify-start items-center">SYSTEM BALANCE:</h2>
        <div>{machineConfig.balance} ETH</div>
      </div>
      <div className="_row flex-end">
        <div
          className="_btn"
          onClick={async () => {
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

      {/* <div className="_group">
        <div className="_row">
          <div className="_small">Custom Duck Minting</div>
          <div className="_radio-group">
            <input
              className="_radio-group-item"
              type="radio"
              name="custom_duck_bool"
              value="off"
              defaultChecked={!customDucksEnabled}
              onChange={() => {
                setCustomDucksEnabled(false);
              }}
            ></input>
            <input
              className="_radio-group-item"
              type="radio"
              name="custom_duck_bool"
              value="on"
              defaultChecked={customDucksEnabled}
              onChange={() => {
                setCustomDucksEnabled(true);
              }}
            ></input>
          </div>
        </div>
        <div className="_row">
          <div className="_small">Custom Duck Price</div>
          <div className="_input-group">
            <input
              className="_input-group-text"
              type="text"
              value={customDuckPrice}
              onChange={(e) => {
                setCustomDuckPrice(e.target.value);
              }}
            ></input>
            <div className="_input-group-suffix">ETH</div>
          </div>
        </div>
        <div className="_row">
          <div className="_small">Max Custom Ducks</div>
          <input
            className="_input"
            type="text"
            value={maxCustomDucks}
            onChange={(e) => {
              setMaxCustomDucks(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="_group">
        <div className="_row">
          <div className="_small">Balance: {machineConfig.balance}</div>
          <div className="_row-sub">
            Withdraw:
            <div className="_input-group">
              <input
                className="_input-group-text"
                type="text"
                value={withdrawAmount}
                onChange={(e) => {
                  setWithdrawAmount(e.target.value);
                }}
              ></input>
              <div className="_input-group-suffix">ETH</div>
            </div>
          </div>
        </div>
        <div className="_row flex-end">
          <div
            className="_btn"
            onClick={async () => {
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
            Withdraw
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AdminMain;
