import { useLoader, useThree } from "@react-three/fiber";
import React, { useState, useCallback } from "react";
import { a, useSpring } from "@react-spring/three";
import useMachineStore from "../../store";

import "./index.css";
import ImageViewer from "react-simple-image-viewer";

import { useEffect } from "react";
import { MachineMode } from "../../utils/constants";

export const Viewer = () => {
  const currentMachineMode = useMachineStore((state) => state.currentMode);
  const setCurrentMode = useMachineStore((state) => state.setCurrentMode);

  const currentDuckId = useMachineStore((state) => state.currentDuckId);
  const setCurrentDuckId = useMachineStore((state) => state.setCurrentDuckId);

  const changeMode = () => {
    switch (currentMachineMode) {
      case 0: {
        setCurrentMode(1);
        setCurrentDuckId(0);
        break;
      }
      case 1: {
        setCurrentMode(2);
        setCurrentDuckId(0);
        break;
      }
      case 2: {
        setCurrentMode(0);
        setCurrentDuckId(0);
        break;
      }
      default:
        break;
    }
    return currentMachineMode;
  };

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    "http://placeimg.com/1200/800/nature",
    "http://placeimg.com/800/1200/nature",
  ];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const getImageIndex = () => {
    let index = 0;
    switch (currentMachineMode) {
      case 0:
        index = 0;
        break;
      case 1:
        index = 1;
        break;
      case 2:
        index = 2;
        break;
      default:
        break;
    }
    return index;
  };

  return (
    <div>
      <h1 className="currentMode">
        Machine Mode: {MachineMode[currentMachineMode]}
      </h1>
      <button className="changeModeBtn" onClick={() => changeMode()}>
        Change Mode
      </button>
      <div className="view">
        <section style={{ display: "flex" }}>
          <div>
            <img
              src={images[getImageIndex()]}
              onClick={() => openImageViewer(getImageIndex())}
              width="300px"
              height="300px"
              key={getImageIndex()}
              style={{ margin: "2px" }}
              alt=""
            />
          </div>
          <div>
            <img
              src={images[getImageIndex()]}
              onClick={() => openImageViewer(getImageIndex())}
              width="400px"
              height="400px"
              key={getImageIndex()}
              style={{ margin: "2px" }}
              alt=""
            />

            {isViewerOpen && (
              <ImageViewer
                src={images}
                currentIndex={currentImage}
                onClose={closeImageViewer}
                disableScroll={false}
                backgroundStyle={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                }}
                closeOnClickOutside={true}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Viewer;
