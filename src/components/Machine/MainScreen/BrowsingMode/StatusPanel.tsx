import { FC } from 'react';
import { useThree } from 'react-three-fiber';
import Screen from '../../common/Screen';
import { minViewLength } from '../../../../utils/constants';
import useMachineStore from '../../../../store';
import { useMachineConfig } from '../../../../state/hooks';
import ShimmerLayer from '../../../common/ShimmerLayer';

const StatusPanel = () => {
  const setIsOwnersManualOpen = useMachineStore((state) => state.setIsOwnersManualOpen);
  const isOwnersModalOpen = useMachineStore((state) => state.isOwnersManualOpen);
  const { data: machineConfig, isLoading } = useMachineConfig();

  return isLoading ? null : (
    <div className="status-panel">
      <ShimmerLayer />
      <div
        className="graph-bg lcd-font text-black text-opacity-75 text-md inner-shadow rounded-sm font-thin flex items-center  justify-center space-x-10 h-8
          border-t border-l border-black border-opacity-50"
      >
        <div>
          {`duck price: ${machineConfig?.tozziMintPrice || ''} eth`}
        </div>
        <button
          type="button"
          className="hover:font-bold"
          onClick={() => {
            document.body.style.overflow = 'hidden';
            setIsOwnersManualOpen(!isOwnersModalOpen);
          }}
        >
          View Owners Manaual
        </button>
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
      position={[-0.185 * min, -0.1805 * min, 0]}
      rotation={[0.0, 0.0, 0.0]}
      transform
    >
      <StatusPanel />
    </Screen>
  );
};

export default StatusPanelWrap;
