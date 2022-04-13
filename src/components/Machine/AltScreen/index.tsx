import { Html } from "@react-three/drei";
import useMachineStore from "../../../store";
import {
  MachineMode,  
  minViewLength,
} from "../../../utils/constants";

import Shopping from "./Shopping";
import Custom from "./Custom";
import Admin from "./Admin";
import { useThree } from "react-three-fiber";
import "./index.scss";
import NotConnected from "./NotConnected";
import AltButton from "./AltButton";

const AltScreen: () => JSX.Element = () => {
  const currentMode = useMachineStore((state) => state.currentMode);  
  const { viewport } = useThree();  
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
      <div>
        <div       
          className={`
            border-[#348476] border mb-11 
            w-[336px] h-[324px] relative rounded-lg  z-0
            bg-[rgb(8,8,8)] text-white overflow-hidden
          `}    
        >            
          <div className={`absolute pointer-events-none h-full w-full inner-shadow  rounded-lg opacity-70`} />
          { [MachineMode.Off, MachineMode.Syncing].includes(currentMode) && <NotConnected /> }
          { currentMode === MachineMode.Shopping && <Shopping /> }
          { currentMode === MachineMode.Customization && <Custom /> }
          { currentMode === MachineMode.Admin && <Admin /> }
        </div>
        <AltButton />      
      </div>
    </Html>
  );
};

export default AltScreen;

    {/* {showTxStatus ? (
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
              ) : ( } */}