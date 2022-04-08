import { Html } from "@react-three/drei";
import useMachineStore from "../../../store";
import {
  MachineMode,
  aspectRatio,
  tozziDuckNum,
  minViewLength,
} from "../../../utils/constants";
import { mintTozziDuck, mintCustomDuck } from "../../../utils/interact";
import Shopping from "./Shopping";
import Custom from "./Custom";
import Admin from "./Admin";
import { useThree } from "react-three-fiber";
import "./index.scss";
import NotConnected from "./NotConnected";

const AltScreen: () => JSX.Element = () => {
  const currentMode = useMachineStore((state) => state.currentMode);
  const DToolInst = useMachineStore((state) => state.DToolInst);
  const address = useMachineStore((state) => state.address);
  const syncing = useMachineStore((state) => state.syncing);

  const currentTozziDuckId = useMachineStore(
    (state) => state.currentTozziDuckId
  );
  const tozziDuckData = useMachineStore((state) => state.tozziDuckData);
  const setTozziDuckData = useMachineStore((state) => state.setTozziDuckData);

  const machineSetting = useMachineStore((state) => state.machineSetting);
  const setMachineSetting = useMachineStore((state) => state.setMachineSetting);

  const currentCustomDuckId = useMachineStore(
    (state) => state.currentCustomDuckId
  );
  const customDuckData = useMachineStore((state) => state.customDuckData);
  const setCustomDuckData = useMachineStore((state) => state.setCustomDuckData);

  const currentAdminDuckId = useMachineStore(
    (state) => state.currentAdminDuckId
  );

  const processing = useMachineStore((state) => state.processing);
  const setProcessing = useMachineStore((state) => state.setProcessing);
  const transactionStatus = useMachineStore((state) => state.transactionStatus);
  const setTransactionStatus = useMachineStore(
    (state) => state.setTransactionStatus
  );
  const showTxStatus = useMachineStore((state) => state.showTxStatus);
  const setShowTxStatus = useMachineStore((state) => state.setShowTxStatus);
  const setOpenBurnModal = useMachineStore((state) => state.setOpenBurnModal);

  const { viewport } = useThree();
  // const min = Math.min(viewport.width, viewport.height);
const min = viewport.width;

  return (
    <Html
      scale={[
        (0.165 * min) / minViewLength,
        (0.165 * min) / minViewLength,
        (0.165 * min) / minViewLength,
      ]}
      position={[-0.225 * min, -0.045 * min, 0]}
      rotation={[0.0, 0.0, 0.0]}
      transform
    >
      <div className="AltScreen ">        
        {!address && (
          <NotConnected />
        )}
        {address && !syncing && (
          <>
            <div className="content  relative">
              <div className="w-full h-full inner-shadow absolute z-10"></div>
              {showTxStatus ? (
                <div className="processing">
                  <div className="processing-status">{transactionStatus}</div>
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
              ) : currentTozziDuckId >= 0 &&
                tozziDuckData[currentTozziDuckId] &&
                tozziDuckData[currentTozziDuckId].owner ? (
                <div className="duck-info">
                  <div className="owner-address">
                    {tozziDuckData[currentTozziDuckId].owner}
                  </div>
                </div>
              ) : currentCustomDuckId >= tozziDuckNum &&
                customDuckData[currentCustomDuckId - tozziDuckNum] &&
                customDuckData[currentCustomDuckId - tozziDuckNum].owner ? (
                <div className="duck-info">
                  <div className="owner-address">
                    {customDuckData[currentCustomDuckId - tozziDuckNum].owner}
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
                  currentMode === MachineMode.Shopping &&
                  currentTozziDuckId >= 0
                    ? "fadeIn"
                    : "fadeOut"
                } ${
                  currentTozziDuckId >= 0 &&
                  tozziDuckData[currentTozziDuckId] &&
                  tozziDuckData[currentTozziDuckId].owner &&
                  "white"
                } `}
                onClick={async () => {
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
                  // console.log("mintTozziDuck status", res);
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
                }}
                id="mint_tozzi_duck"
              >
                Buy Duck
              </div>
              <div
                className={`btn bg-yellow ${
                  currentMode === MachineMode.Customization
                    ? "fadeIn"
                    : "fadeOut"
                }`}
                onClick={async () => {
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
                }}
              >
                Mint
              </div>
              <div
                className={`btn bg-danger ${
                  currentMode === MachineMode.Admin &&
                  currentAdminDuckId >= tozziDuckNum
                    ? "fadeIn"
                    : "fadeOut"
                }`}
                onClick={() => {
                  // console.log("openBurnModal");
                  setOpenBurnModal(true);
                }}
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
