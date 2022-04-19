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
      <div className="status-panel bg-black text-teal-200   font-thin flex items-center  justify-between pr-4 pl-2">
        <div>
          Duck Sales: <b>Enabled</b>
        </div>
        <div>
          Duck Price: <b>0.5 ETH</b>
        </div>

        <div>
          Machine Balance: <b>100 ETH</b>
        </div>
      </div>
    </Html>
  );
};

export default StatusPanel;
