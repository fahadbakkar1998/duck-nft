/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { FC, useEffect, useState } from 'react';
import useMachineStore from '../../../store';

const NotConnected: FC = () => {
  const [duckIndex, setDuckIndex] = useState(1);
  const [flipper, setFlipper] = useState(true);
  const { changeChannel, setMachineMood, setAltMessage } = useMachineStore();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setDuckIndex(Math.ceil(Math.random() * 200));
      changeChannel(300);
      setMachineMood('happy');
      setTimeout(() => setMachineMood(undefined), 250);
      setTimeout(() => setFlipper(!flipper), 8000);
    }
    return () => {
      isMounted = false;
    };
  }, [flipper]);

  useEffect(() => {
    setAltMessage('Hey! Connect your wallet to get started, quacks!');
  }, []);

  return (
    <div className="absolute w-full h-full z-10">
      <img
        style={{ width: '100%' }}
        alt=""
        src={require(`../../../assets/img/ducks/crypto_duck_${duckIndex}.svg`)}
      />
    </div>
  );
};

export default NotConnected;
