import { Html } from '@react-three/drei';

import InteractiveTextureContent from '../../InteractiveTextureContent'

export const DrawingTool: () => JSX.Element = () => (
    <Html
       distanceFactor={2.5}
       position={[-0.0, -0.1, 0.0]}
       rotation={[ Math.PI/2, -Math.PI *2, Math.PI/2]}
       transform
       occlude 
    >
       <InteractiveTextureContent />
    </Html>
);

export default DrawingTool;