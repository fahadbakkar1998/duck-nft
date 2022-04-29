import useMachineStore from "../../../store";
import AdminMain from "./AdminMode";
import DrawingTool from "./CustomizationMode";
import WalletConnect from "./WalletConnect/index";
import BrowsingMode from "./BrowsingMode";
import { FC } from "react";
import { Html } from "@react-three/drei";
import { MachineMode } from "../../../utils/constants";
import ModeSwitcher from "../../common/ModeSwitcher";


interface ScreenProps {
  screenInverted: boolean;
  switchModes: () => void;
}

const Screen: FC<ScreenProps> = ({ screenInverted, switchModes }) => {
  const currentState = useMachineStore((state) => state);
  const { currentMode } = currentState;

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
        <ModeSwitcher switchModes={switchModes}/>
      </div>
      {[MachineMode.Off, MachineMode.Syncing].includes(currentMode) && (
        <WalletConnect />
      )}
      <BrowsingMode />
      <DrawingTool />
      <AdminMain />
    </Html>
  );
};

export default Screen;
