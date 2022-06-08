import { FC, useEffect } from 'react';
import { useStore } from 'react-three-fiber';
import redLight from '../../assets/img/red-light-on.png';
import greenLight from '../../assets/img/green-light-on.png';
import useMachineStore from '../../store';

interface StatusLightProps {
  color: 'red' | 'green';
  className?: string;
}

const StatusLight: FC<StatusLightProps> = ({ color, className }) => {
  const { machineMood } = useMachineStore();

  return machineMood !== undefined || true ? (
    <div className={className}>
      <img src={color === 'green' ? greenLight : redLight} alt="Status Light" />
    </div>
  ) : null;
};

export default StatusLight;
