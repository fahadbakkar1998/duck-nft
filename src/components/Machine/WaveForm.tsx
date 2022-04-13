import { Html } from "@react-three/drei";
import { useThree } from "react-three-fiber";
import {  minViewLength } from "../../utils/constants";

const WaveForm: () => JSX.Element = () => {  
  const { viewport } = useThree();
  const min = viewport.width;

  return (
    <Html
      scale={[
        (0.18 * min) / minViewLength,
        (0.18 * min) / minViewLength,
        (0.18 * min) / minViewLength,
      ]}
      position={[-0.144 * min, -0.22 * min, 0]}
      rotation={[0.0, 0.0, 0.0]}
      transform
    >
      <div
        style={{ borderRadius: 13 }}       
        className="h-[115px] w-[110px] bg-black border-gray-600 border-2"                
      >
        <video loop muted autoPlay playsInline className="aspect-square w-full h-full" src="/assets/video/wave.mp4" />
      </div>
    </Html>
  );
};

export default WaveForm;
