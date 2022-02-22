import { Html } from "@react-three/drei";
import useMachineStore from "../../../store";
import { MachineMode } from "../../../utils/types";
import Shopping from "./Shopping";
import Custom from "./Custom";
import Admin from "./Admin";
import { useThree } from "react-three-fiber";
import { aspectRatio } from "../../../utils/constants";
import "./index.scss";

const AltScreen: () => JSX.Element = () => {
  const currentMode = useMachineStore((state) => state.currentMode);
  const { viewport } = useThree();

  return (
    <Html
      scale={[
        viewport.width / 24 / aspectRatio,
        viewport.width / 40,
        viewport.width / 44,
      ]}
      position={[
        (-229 * viewport.width) / 1000,
        (40 * viewport.width) / 1000,
        0.2,
      ]}
      rotation={[0.0, 0.0, 0.0]}
      transform
    >
      <div className="AltScreen">
        <div className="content scanlines">
          <Shopping></Shopping>
          <Custom></Custom>
          <Admin></Admin>
        </div>
        <div className="footer">
          <div className="webp">Export Webp</div>
          <div
            className={`btn bg-info ${
              currentMode === MachineMode.Shopping ? "fadeIn" : "fadeOut"
            }`}
          >
            Buy Duck
          </div>
          <div
            className={`btn bg-info ${
              currentMode === MachineMode.Customization ? "fadeIn" : "fadeOut"
            }`}
          >
            Mint it
          </div>
          <div
            className={`btn bg-danger ${
              currentMode === MachineMode.Admin ? "fadeIn" : "fadeOut"
            }`}
          >
            Burn
          </div>
        </div>
      </div>
    </Html>
  );
};

export default AltScreen;
