import { useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Html } from "@react-three/drei";
import { useThree } from "react-three-fiber";
import { aspectRatio, minViewLength } from "../../../../utils/constants";
import useMachineStore from "../../../../store";

const StatusPanel: () => JSX.Element = () => {
  const DToolInst = useMachineStore((state) => state.DToolInst);
  const selectedColor = useMachineStore((state) => state.selectedColor);
  const setSelectedColor = useMachineStore((state) => state.setSelectedColor);
  const { viewport } = useThree();
  // const min = Math.min(viewport.width, viewport.height);
  const min = viewport.width;
  const bgColor = selectedColor || "#FFFFFF";

  return (
    <Html
      scale={[
        (0.18 * min) / minViewLength,
        (0.18 * min) / minViewLength,
        (0.18 * min) / minViewLength,
      ]}
      position={[-0.185 * min, -0.1805 * min, 0]}
      rotation={[0.0, 0.0, 0.0]}
      transform
    >
      <div className="status-panel">
        <div className="graph-bg lcd-font text-black text-opacity-75  text-2xl inner-shadow rounded-sm font-thin flex items-center  justify-center space-x-10 h-8
            border-t border-l border-black border-opacity-50
          ">
          <div>
            duck price: 0.5 eth
          </div>        
        </div>
      </div>
    </Html>
  );
};

export default StatusPanel;
