import { useEffect, useRef } from 'react';
import useMachineStore from '../../../store';

const Static = () => {
  const { altIsStatic } = useMachineStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={`top-[21%] absolute scale-[1.75]  z-40 ${altIsStatic ? 'visible' : 'invisible'}`}>
      <video
        ref={videoRef}
        id="alt-static"
        playsInline
        autoPlay
        muted
        loop
        src="/assets/video/static.mp4"
      />
    </div>
  );
};

export default Static;
