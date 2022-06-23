import { FC, useState } from 'react';

interface ShimmerLayerProps {
  className?: string;
  targetHovered?: boolean;
}
const ShimmerLayer: FC<ShimmerLayerProps> = ({ className, targetHovered = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`absolute pointer-events-auto w-full h-full overflow-hidden  ${className}`}
    >
      <div className={`${isHovered || targetHovered ? 'shimmer animate-shimmer' : ''}`} />
    </div>
  );
};

export default ShimmerLayer;
