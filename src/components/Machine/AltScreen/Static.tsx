import { useEffect, useRef } from 'react';
import useMachineStore from '../../../store';

const Static = () => {
  const { altIsStatic } = useMachineStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  // useEffect(() => {
  //   if (altIsStatic && videoRef.current) {
  //     const video: HTMLVideoElement = videoRef.current;
  //     video.currentTime = Math.random() * 2;
  //     videoRef.current.play();
  //   } else {
  //     videoRef.current?.pause();
  //   }
  // }, [altIsStatic]);

  return (
    <div className={`top-[21%] absolute scale-[1.75]  z-40 ${altIsStatic ? 'visible' : 'visible'}`}>
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
