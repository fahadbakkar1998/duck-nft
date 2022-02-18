import { Html } from "@react-three/drei";

import InteractiveTextureContent from "../../InteractiveTextureContent";

export const DrawingTool: (props: any) => JSX.Element = (props: any) => {
  return (
    <Html
      distanceFactor={2.5}
      position={props.isFront ? [0.0, 0.1, 0.0] : [0.0, -0.1, 0.0]}
      rotation={
        props.isFront
          ? [Math.PI / 2, Math.PI, Math.PI / 2]
          : [Math.PI / 2, -Math.PI * 2, Math.PI / 2]
      }
      transform
      occlude
    >
      <InteractiveTextureContent />
    </Html>
  );
};

export default DrawingTool;
