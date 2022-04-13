import useMachineStore from "../store";
import { mintTozziDuck, mintCustomDuck } from "../utils/interact";
import { tozziDuckNum } from "@/utils/constants";


export const useMintTozziDuck = () => {
  const currState = useMachineStore((state) => state);  
  const { 
    address,     
    currentTozziDuckId,
    tozziDuckData,
    setTozziDuckData,
    machineSetting,
    setMachineSetting,    
    setProcessing,
    setTransactionStatus,
    setShowTxStatus,    
  } = currState;
  const doMint = async () => {
    if (
      currentTozziDuckId < 0 ||
      (tozziDuckData[currentTozziDuckId] &&
        tozziDuckData[currentTozziDuckId].owner)
    )
      return;
    setProcessing(true);
    setTransactionStatus("processing...");
    setShowTxStatus(true);
    const res = await mintTozziDuck({
      ...tozziDuckData[currentTozziDuckId],
    });    
    if (res.success) {
      const tempDuckData = [...tozziDuckData];
      tempDuckData[currentTozziDuckId].owner = address;
      setTozziDuckData(tempDuckData);
      setMachineSetting({
        ...machineSetting,
        balance:
          machineSetting.balance + machineSetting.tozziDuckPrice,
      });
    }
    setTransactionStatus(res.status);
    setProcessing(false);  
  }
  return doMint;
}

export const useMintCustomDuck = () => {
  const currState = useMachineStore((state) => state);  
  const { 
    address, 
    machineSetting,
    setMachineSetting,    
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
    setShowTxStatus(true);
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
          restTimestamp: machineSetting.burnWindow,
        },
      ]);
      setMachineSetting({
        ...machineSetting,
        balance:
          machineSetting.balance + machineSetting.customDuckPrice,
      });
    }
    setTransactionStatus(res.status);
    setProcessing(false);
  }
  return doMint;
}
