import useMachineStore from "../../store";
import AdminMain from "../AdminMain/AdminMain";
import DrawingTool from "../DrawingTool";
import WalletConnect from "./WalletConnect";
import CardImageSection from "../BrowsingScreen/BrowsingScreen";
import { FC } from "react";
import { Html } from "@react-three/drei";
import ColorPicker from "../DrawingTool/ColorPicker";

interface ScreenProps {
  isFront: boolean;
  restRoundCount: number;
}

const Screen: FC<ScreenProps> = ({isFront, restRoundCount}) => {
  const currentState = useMachineStore((state) => state);
  const { address, syncing } = currentState;

  return (    
    <Html
      style={{ pointerEvents: "auto" }}
      distanceFactor={2.4}
      position={isFront ? [0.0, 0.1, 0.0] : [0.0, -0.1, 0.0]}
      rotation={
        isFront
          ? [Math.PI / 2, Math.PI, Math.PI / 2]
          : [Math.PI / 2, -Math.PI * 2, Math.PI / 2]
      }
      transform
      occlude
    >
      <WalletConnect isFront={isFront} isShow={!address || syncing} />
      { address && !syncing && (restRoundCount === 0 || restRoundCount === 2 ) && (
          <CardImageSection
            isFront={restRoundCount === 0 ? isFront : !isFront}
          ></CardImageSection>
      )}
      {/* `{ address && !syncing && (restRoundCount === 1 || restRoundCount === 0) && (
          <>
            <ColorPicker />
            <DrawingTool isFront={restRoundCount === 1 ? isFront : !isFront} />
          </>
      )} */}
      {/* { address && !syncing && (restRoundCount === 2 || restRoundCount === 1) && (
          <AdminMain
            isFront={restRoundCount === 2 ? isFront : !isFront}
          ></AdminMain>
      )}` */}
    </Html>
  );  
}


export default Screen;