import { FC } from 'react';

const ShadowLayer: FC = () => {
  return (
    <div
      className={`
        absolute pointer-events-none 
        h-full w-full inner-shadow rounded-lg opacity-70  z-50
      `}
    />
  );
};

export default ShadowLayer;
