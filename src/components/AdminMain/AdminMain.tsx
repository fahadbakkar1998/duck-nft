import { useState } from "react";
import { Html } from "@react-three/drei";
import { getUFloat, getUInt } from "../../utils/common";
import { saveMachineSetting, withdraw } from "../../utils/interact";
import useMachineStore from "../../store";
import "./AdminMain.scss";

const AdminMain = (props: any) => {
  const machineSetting = useMachineStore((state) => state.machineSetting);
  const setMachineSetting = useMachineStore((state) => state.setMachineSetting);
  const [tozziDucksEnabled, setTozziDucksEnabled] = useState<boolean>(
    machineSetting.tozziDucksEnabled
  );
  const [tozziDuckPrice, setTozziDuckPrice] = useState<any>(
    machineSetting.tozziDuckPrice
  );
  const [customDucksEnabled, setCustomDucksEnabled] = useState<boolean>(
    machineSetting.customDucksEnabled
  );
  const [customDuckPrice, setCustomDuckPrice] = useState<any>(
    machineSetting.customDuckPrice
  );
  const [maxCustomDucks, setMaxCustomDucks] = useState<any>(
    machineSetting.maxCustomDucks
  );
  const [withdrawAmount, setWithdrawAmount] = useState<any>(0);
  const setProcessing = useMachineStore((state) => state.setProcessing);
  const setTransactionStatus = useMachineStore(
    (state) => state.setTransactionStatus
  );
  const setShowTxStatus = useMachineStore((state) => state.setShowTxStatus);

  return (
    <Html
      style={{ pointerEvents: "auto" }}
      distanceFactor={2.4}
      position={props.isFront ? [0.0, 0.1, 0.0] : [0.0, -0.1, 0.0]}
      rotation={
        props.isFront
          ? [Math.PI / 2, Math.PI, Math.PI / 2]
          : [Math.PI / 2, -Math.PI * 2, Math.PI / 2]
      }
      transform
      occlude
    >
      <div className="AdminMain scanlines">
        <div className="_group _title">Admin Stuff</div>
        <div className="_group">
          <div className="_row">
            <div className="_small">Tozzi Duck Minting</div>
            <div className="_radio-group">
              <input
                className="_radio-group-item"
                type="radio"
                name="tozzi_duck_bool"
                value="off"
                defaultChecked={!tozziDucksEnabled}
                onChange={() => {
                  setTozziDucksEnabled(false);
                }}
              ></input>
              <input
                className="_radio-group-item"
                type="radio"
                name="tozzi_duck_bool"
                value="on"
                defaultChecked={tozziDucksEnabled}
                onChange={() => {
                  setTozziDucksEnabled(true);
                }}
              ></input>
            </div>
          </div>
          <div className="_row">
            <div className="_small">Tozzi Duck Price</div>
            <div className="_input-group">
              <input
                className="_input-group-text"
                type="text"
                value={tozziDuckPrice}
                onChange={(e) => {
                  setTozziDuckPrice(e.target.value);
                }}
              ></input>
              <div className="_input-group-suffix">ETH</div>
            </div>
          </div>
        </div>
        <div className="_group">
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
            <div className="_small">Balance: {machineSetting.balance}</div>
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
                  correctWithdrawAmount > machineSetting.balance
                )
                  return;
                setProcessing(true);
                setTransactionStatus("processing...");
                setShowTxStatus(true);
                const res = await withdraw({
                  amount: correctWithdrawAmount,
                });
                if (res.success) {
                  setMachineSetting({
                    ...machineSetting,
                    balance: machineSetting.balance - correctWithdrawAmount,
                  });
                }
                setTransactionStatus(res.status);
                setProcessing(false);
              }}
            >
              Withdraw
            </div>
          </div>
        </div>
        <div className="_footer">
          <div
            className="_btn"
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
              setShowTxStatus(true);
              const res = await saveMachineSetting({
                machineSetting: setting,
              });
              if (res.success) {
                setMachineSetting({
                  ...machineSetting,
                  ...setting,
                });
              }
              setTransactionStatus(res.status);
              setProcessing(false);
            }}
          >
            Save
          </div>
        </div>
      </div>
    </Html>
  );
};

export default AdminMain;
