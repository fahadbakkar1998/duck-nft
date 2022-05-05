import useMachineStore from "../../../store";
import AdminMain from "./AdminMode";
import DrawingTool from "./CustomizationMode";
import WalletConnect from "./WalletConnect/index";
import BrowsingMode from "./BrowsingMode";
import { FC } from "react";
import { MachineMode } from "../../../utils/constants";
import ModeSwitcher from "../../common/ModeSwitcher";
import { Html } from "@react-three/drei";


interface ScreenProps {
  screenInverted: boolean;
  switchModes: (direction: string) => void;
}

const MainScreen: FC<ScreenProps> = ({ screenInverted, switchModes }) => {
  const { currentMode } = useMachineStore();

  return (
    <Html
      style={{ pointerEvents: "auto" }}
      distanceFactor={2.4}
      position={[0.0, 0.0, 0.0]}
      rotation={
        screenInverted
          ? [Math.PI / 2, -Math.PI * 2, Math.PI / 2]
          : [Math.PI / 2, Math.PI, Math.PI / 2]
      }
      transform
      occlude
    > 
      <div className="bottom">
        <ModeSwitcher nextMode={() => switchModes('next')} prevMode={() => switchModes('prev')}/>
      </div>
      {[MachineMode.Off, MachineMode.Syncing].includes(currentMode) && (
        <WalletConnect />
      )}
      { currentMode === MachineMode.Shopping && <BrowsingMode /> }
      { currentMode === MachineMode.Customization && <DrawingTool /> }
      { currentMode === MachineMode.Admin && <AdminMain /> }
    </Html>
  );
};

export default MainScreen;
