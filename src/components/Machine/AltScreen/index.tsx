import { Html } from "@react-three/drei";
import { useState } from 'react';
import useMachineStore from "../../../store";
import { MachineMode, minViewLength } from "../../../utils/constants";

import BrowsingMode from "./BrowsingMode";
import CustomMode from "./Custom";
import AdminMode from "./Admin";
import { useThree } from "react-three-fiber";
import "./index.scss";
import NotConnected from "./NotConnected";
import AltButton from "./AltButton";
import { useEffect, useRef } from "react";
import StatusLights from "./StatusLights";

const AltScreen: () => JSX.Element = () => {
  const { currentMode, altIsStatic } = useMachineStore();
  const { viewport } = useThree();
  const videoRef = useRef<HTMLVideoElement>(null);
  const min = viewport.width;  

  useEffect(() => {
    if (altIsStatic && videoRef.current) {
      const video: HTMLVideoElement = videoRef.current;
      video.currentTime = Math.random() * 2;
      videoRef.current.play();
    } else {
      videoRef.current?.pause();
    }
  }, [altIsStatic]);

  return (
    <Html
      scale={[
        (0.165 * min) / minViewLength,
        (0.165 * min) / minViewLength,
        (0.165 * min) / minViewLength,
      ]}
      position={[-0.225 * min, -0.031 * min, 0]}
      rotation={[0.0, 0.0, 0.0]}
      transform
    >
      <div className="relative">
        <StatusLights />
        <div
          className={`
            border-[#348476] border 
            w-[336px] h-[324px] relative rounded-lg  z-0
            bg-[rgb(8,8,8)] text-white overflow-hidden
            scanline
          `}
        >
          {altIsStatic && (
            <div className=" top-[21%] absolute scale-[1.75]  opacity-100 z-50">              
              <video ref={videoRef}
                id="alt-static"
                playsInline
                autoPlay={altIsStatic}
                muted
                loop
                src="/assets/video/static.mp4"
              />
            </div>
          )}
          <div
            className={`
              absolute pointer-events-none 
              h-full w-full inner-shadow rounded-lg opacity-70
            `}
          />
          {[MachineMode.Off, MachineMode.Syncing].includes(currentMode) && (
            <NotConnected />
          )}
          {currentMode === MachineMode.Shopping && <BrowsingMode />}
          {currentMode === MachineMode.Customization && <CustomMode />}
          {currentMode === MachineMode.Admin && <AdminMode />}
        </div>
        <AltButton />
      </div>
    </Html>
  );
};

export default AltScreen;
