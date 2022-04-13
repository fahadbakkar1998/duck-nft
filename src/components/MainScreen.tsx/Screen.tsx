import useMachineStore from "@/store";
import AdminMain from "../AdminMain/AdminMain";
import DrawingTool from "../DrawingTool";
import WalletConnect from "./WalletConnect";
import CardImageSection from "../HomeScreen/HomeScreen";
import { FC } from "react";

interface ScreenProps {
  isFront: boolean;
  restRoundCount: number;
}

const Screen: FC<ScreenProps> = ({isFront, restRoundCount}) => {
  const currentState = useMachineStore((state) => state);
  const { address, syncing } = currentState;

  return (    
    <>
      <WalletConnect isFront={isFront} isShow={!address || syncing} />
      { address && !syncing && (restRoundCount === 0 || restRoundCount === 2 ) && (
          <CardImageSection
            isFront={restRoundCount === 0 ? isFront : !isFront}
          ></CardImageSection>
      )}
      { address && !syncing && (restRoundCount === 1 || restRoundCount === 0) && (
          <DrawingTool
            isFront={restRoundCount === 1 ? isFront : !isFront}
          ></DrawingTool>
      )}
      { address && !syncing && (restRoundCount === 2 || restRoundCount === 1) && (
          <AdminMain
            isFront={restRoundCount === 2 ? isFront : !isFront}
          ></AdminMain>
      )}
    </>  
  );  
}


export default Screen;