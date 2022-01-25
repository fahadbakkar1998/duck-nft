import { useLoader, useThree } from "@react-three/fiber";
import React, { useState, useCallback } from "react";
import { a, useSpring } from '@react-spring/three';
import useMachineStore from "../../store";
import './index.css';
import ImageViewer from "react-simple-image-viewer";

import { useEffect } from "react";



export const Viewer = () => {
   //const font = useLoader(FontLoader, './assets/font/Roboto_Regular.json');

    const currentShopping = useMachineStore(state => state.shopping);
    const setCurrentShopping = useMachineStore(state => state.updateShopping);

    const currentCustomDuck = useMachineStore(state => state.currentDuck);
    const setCurrentCustomDuck = useMachineStore(state => state.updateCurrentDuck)

    const currentAdmin = useMachineStore(state => state.admin);
    const setCurrentAdmin = useMachineStore(state => state.updateAdmin);
    
    const [ currentMode, setCurrentMode ] = useState("Shopping");

    const changeMode= () => {
        console.log('changeMode');
        switch(currentMode) {
            case "Shopping": setCurrentMode("CustomDuck"); break;
            case "CustomDuck": setCurrentMode("Admin"); break;
            case "Admin": setCurrentMode("Shopping"); break;
            default: break;
        }
        return currentMode;
    }

    const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    "http://placeimg.com/1200/800/nature",
    "http://placeimg.com/800/1200/nature"
  ];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

   
    return (
        <div>
            <h1 className = "currentMode">                
                    Machine Mode:  {currentMode}                 
            </h1>
            <div>
                <button className = "changeModeBtn" onClick={() => changeMode()}>Change Mode</button>
                <div>
                    <img
                    src={'http://placeimg.com/1200/800/nature'}
                    onClick={() => openImageViewer(0)}
                    width="300"
                    key={0}
                    style={{ margin: "2px" }}
                    alt=""
                    />
                    <img
                    src={'http://placeimg.com/1200/800/nature'}
                    onClick={() => openImageViewer(0)}
                    width="500"
                    key={0}
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
                            backgroundColor: "rgba(0,0,0,0.9)"
                        }}
                        closeOnClickOutside={true}
                        />
                    )}
                </div>
            </div>
            
        </div>
    )
}

export default Viewer;