import { Html } from "@react-three/drei";
import useMachineStore from "../../../store";
import { MachineMode, aspectRatio } from "../../../utils/constants";
import { mintTozziDuck } from "../../../utils/interact";
import Shopping from "./Shopping";
import Custom from "./Custom";
import Admin from "./Admin";
import { useThree } from "react-three-fiber";
import { useState } from "react";
import "./index.scss";

const AltScreen: () => JSX.Element = () => {
  const currentMode = useMachineStore((state) => state.currentMode);
  const customStep = useMachineStore((state) => state.customStep);
  const setCustomStep = useMachineStore((state) => state.setCustomStep);
  const DToolInst = useMachineStore((state) => state.DToolInst);
  const address = useMachineStore((state) => state.address);
  const currentDuckId = useMachineStore((state) => state.currentDuckId);
  const duckData = useMachineStore((state) => state.duckData);
  const setDuckData = useMachineStore((state) => state.setDuckData);
  const processing = useMachineStore((state) => state.processing);
  const setProcessing = useMachineStore((state) => state.setProcessing);
  const { viewport } = useThree();
  const [showTxStatus, setShowTxStatus] = useState(false);
  const [status, setStatus] = useState<any>("");

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
        {address && (
          <>
            <div className="content scanlines">
              {showTxStatus ? (
                <div className="processing">
                  <div className="processing-status">{status}</div>
                  <div
                    className="processing-end"
                    onClick={() => {
                      if (processing) return;
                      setShowTxStatus(false);
                    }}
                  >
                    Go Back
                  </div>
                </div>
              ) : duckData[currentDuckId].owner ? (
                <div className="duck-info">
                  <div className="owner-address">
                    {duckData[currentDuckId].owner}
                  </div>
                </div>
              ) : (
                <>
                  <Shopping></Shopping>
                  <Custom></Custom>
                  <Admin></Admin>
                </>
              )}
            </div>
            <div className="footer">
              <div
                className={`btn bg-info ${
                  currentMode === MachineMode.Shopping ? "fadeIn" : "fadeOut"
                } ${duckData[currentDuckId].owner && "white"} `}
                onClick={async () => {
                  if (duckData[currentDuckId].owner) return;
                  setProcessing(true);
                  setStatus("processing...");
                  setShowTxStatus(true);
                  const res = await mintTozziDuck({
                    ...duckData[currentDuckId],
                    address,
                  });
                  const tempDuckData = [...duckData];
                  tempDuckData[currentDuckId].owner = address;
                  setDuckData(tempDuckData);
                  setStatus(res.status);
                  setProcessing(false);
                }}
              >
                Buy Duck
              </div>
              <div
                className={`btn bg-yellow ${
                  currentMode === MachineMode.Customization && customStep === 0
                    ? "fadeIn"
                    : "fadeOut"
                }`}
                onClick={() => {
                  setCustomStep(1);
                  DToolInst.saveToWebp();
                }}
              >
                Export Webp
              </div>
              <div
                className={`btn bg-info ${
                  currentMode === MachineMode.Customization && customStep === 1
                    ? "fadeIn"
                    : "fadeOut"
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
          </>
        )}
      </div>
    </Html>
  );
};

export default AltScreen;
