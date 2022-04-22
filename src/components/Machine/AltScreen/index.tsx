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
import { useEffect, useRef } from "react";

const AltScreen: () => JSX.Element = () => {
  const { currentMode, altIsStatic } = useMachineStore();  
  const { viewport } = useThree();  
  const videoRef = useRef<HTMLVideoElement>();
  const min = viewport.width;
  
  useEffect(() => {
    if (altIsStatic && videoRef.current) {
      const video: HTMLVideoElement = videoRef.current;
      video.currentTime = Math.random() * 15;      
      videoRef.current.play();
    } else {
      videoRef.current?.pause();
    }
  }, [altIsStatic])

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
            scanlines
          `}    
        >   
          { altIsStatic && (
            <div className=" top-[21%] absolute scale-[1.75]  opacity-100">
              {/* @ts-ignore */}
              <video ref={videoRef} id="alt-static" playsInline autoPlay={altIsStatic} muted loop src="/assets/video/rainbow-static.mp4" />
            </div>         
          )}          
          <div 
            className={`
              absolute pointer-events-none 
              h-full w-full inner-shadow rounded-lg opacity-70
            `} 
          />
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
                ) : currentTozziDuckId >= 0 &&
                  ducks[currentTozziDuckId] &&
                  ducks[currentTozziDuckId].owner ? (
                  <div className="duck-info">
                    <div className="owner-address">
                      {ducks[currentTozziDuckId].owner}
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
                </div>
              ) : ( } */}
