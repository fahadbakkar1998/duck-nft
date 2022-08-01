import { FC, useEffect, useState } from 'react';
import { useThree } from 'react-three-fiber';
import Screen from '../../../common/Screen';
import { minViewLength } from '../../../../../utils/constants';
import useMachineStore from '../../../../../store';
import { useMachineConfig, useMachineState } from '../../../../../state/hooks';
import ShimmerLayer from '../../../../common/ShimmerLayer';
import StatusSlides from './StatusSlides';

const StatusPanel = () => {
  const setIsOwnersManualOpen = useMachineStore((state) => state.setIsOwnersManualOpen);
  const isOwnersModalOpen = useMachineStore((state) => state.isOwnersManualOpen);
  const { data: machineState } = useMachineState();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="status-panel">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="graph-bg lcd-font text-black text-opacity-75 text-md inner-shadow rounded-sm font-thin flex items-center  justify-center space-x-10 h-8
          border-t border-l border-black border-opacity-50 pointer-events-auto"
      >
        <ShimmerLayer targetHovered={isHovered} />
        <StatusSlides state={machineState} />
      </div>
    </div>
  );
};

const StatusPanelWrap: FC = () => {
  const { viewport } = useThree();
  const min = viewport.width;

  return (
    <Screen
      scale={[
        (0.18 * min) / minViewLength,
        (0.18 * min) / minViewLength,
        (0.18 * min) / minViewLength,
      ]}
      position={[-0.1855 * min, -0.1795 * min, 0]}
      rotation={[0.0, 0.0, 0.0]}
      transform
    >
      <StatusPanel />
    </Screen>
  );
};

export default StatusPanelWrap;
