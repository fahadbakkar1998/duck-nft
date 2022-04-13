import useMachineStore from "../../store";
import AdminMain from "../AdminMain/AdminMain";
import DrawingTool from "../DrawingTool";
import WalletConnect from "./WalletConnect";
import BrowsingMode from "../BrowsingScreen/BrowsingScreen";
import { FC } from "react";
import { Html } from "@react-three/drei";
import ColorPicker from "../DrawingTool/ColorPicker";
import { MachineMode } from "../../utils/constants";

interface ScreenProps {
  isFront: boolean;
  restRoundCount: number;
}

const Screen: FC<ScreenProps> = ({isFront, restRoundCount}) => {
  const currentState = useMachineStore((state) => state);
  const { address, currentMode } = currentState;

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
      { [MachineMode.Off, MachineMode.Syncing].includes(currentMode) && <WalletConnect /> }
      { currentMode === MachineMode.Shopping && <BrowsingMode /> }
      { currentMode === MachineMode.Customization && (
        <>
          {/* <ColorPicker /> */}
          <DrawingTool />
        </>
      )}
      { currentMode === MachineMode.Admin && <AdminMain /> }
    </Html>
  );  
}


export default Screen;