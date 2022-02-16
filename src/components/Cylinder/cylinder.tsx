import { Cylinder } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { a, useSpring, config, easings } from "@react-spring/three";
import DrawingTool from "../DrawingTool/DrawingTool";
import useMachineStore from "../../store";
import { useThree } from "react-three-fiber";
import CardImageSection from "../CardImageSection/CardImageSection";
import AdminMain from "../AdminMain/AdminMain";
export const DuckCylinder = () => {
  const { viewport } = useThree();
  const cylinderGroup = useRef<any>();
  const [roundCount, setRoundCount] = useState(0);
  const [mode, setMode] = useState(1);
  const aspectRatio = 16 / 9;

  const currentMachineMode = useMachineStore((state) => state.currentMode);
  const setCurrentMachineMode = useMachineStore(
    (state) => state.setCurrentMode
  );

  useEffect(() => {});

  const [spring, set] = useSpring(() => ({
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    // config :
    config: {
      duration: 3000,
      easing: easings.easeInOutElastic,
    },
  }));
  const changeMode = () => {
    const nextMode = currentMachineMode === 2 ? 0 : currentMachineMode + 1;
    setMode(nextMode);
    setCurrentMachineMode(nextMode);
    console.log(currentMachineMode);
  };

  const handelOnClick = () => {
    // currentMachineMode == 0
    //   ? setCurrentMachineMode(1)
    //   : setCurrentMachineMode(0);
    changeMode();
    let count = roundCount;
    setRoundCount(++count);
    set({ rotation: [Math.PI * count, 0, 0] });
  };

  return (
    <a.group {...(spring as any)} onClick={handelOnClick} ref={cylinderGroup}>
      <group
        scale={[
          viewport.width / 6 / aspectRatio,
          viewport.width / 10,
          viewport.width / 11,
        ]}
        rotation={[0, Math.PI / 2, Math.PI / 2]}
        position={[viewport.width / 12, 0, 0.0]}
      >
        <Cylinder args={[1.8, 1.8, 0.1, 50]}>
          {/* <meshNormalMaterial attach="material" /> */}
          <meshBasicMaterial attach="material" color="#6C6C6C" />
        </Cylinder>
        <DrawingTool/>
        <AdminMain />
        <CardImageSection />
        {/* {currentMachineMode == 1 && <DrawingTool />}
        {currentMachineMode == 2 && <AdminMain />}
        {currentMachineMode == 0 && <CardImageSection />} */}
      </group>
    </a.group>
  );
};
