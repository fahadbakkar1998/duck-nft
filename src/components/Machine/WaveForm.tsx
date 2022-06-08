import { Html } from '@react-three/drei';
import { FC } from 'react';
import { useThree } from 'react-three-fiber';
import { minViewLength } from '../../utils/constants';
import ShimmerLayer from '../common/ShimmerLayer';

const WaveForm: FC = () => {
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
        className="h-[115px]  w-[110px]  border-gray-600 border-2 overflow-hidden"
      >
        <ShimmerLayer className="z-50 rounded-2xl" />
        <video loop muted autoPlay playsInline className="scale-[200%] mt-7 transform rotate-10 " src="/assets/video/wave.mp4" />
      </div>
    </Html>
  );
};

export default WaveForm;
