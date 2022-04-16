import useMachineStore from "../store";
import { mintTozziDuck, mintCustomDuck } from "../utils/interact";
import { tozziDuckNum } from "../utils/constants";
import React from "react";

export const UseMintTozziDuck = () => {
  console.log("useMintTozziDuck");
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
  } = currState;
  const doMint = async () => {
    if (
      currentTozziDuckId < 0 ||
      (ducks[currentTozziDuckId] && ducks[currentTozziDuckId].owner)
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
  return doMint;
};

export const UseMintCustomDuck = () => {
  const currState = useMachineStore((state) => state);
  const {
    address,
    machineConfig,
    setMachineConfig,
    setProcessing,
    setTransactionStatus,
    setShowTxStatus,
    DToolInst,
    setCustomDuckData,
    customDuckData,
  } = currState;

  const doMint = async () => {
    // console.log("before minting custom duck data: ", customDuckData);
    setProcessing(true);
    const base64data = await DToolInst.getWebp();
    // console.log("base64data: ", base64data);
    setTransactionStatus("processing...");
    // setShowTxStatus(true);
    const res = await mintCustomDuck({
      base64data,
    });
    // console.log("custom duck minting result: ", res);
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
  return doMint;
};
