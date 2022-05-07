import { FC } from "react";

interface ShimmerLayerProps {
  className?: string;
}
const ShimmerLayer: FC<ShimmerLayerProps> = ({ className }) => {
  return (
    <div className={`absolute w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <div className="shimmer animate-shimmer"/>
    </div>
  );
};

export default ShimmerLayer;