/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, FC, ReactNode } from 'react';
import { useEthers } from '@usedapp/core';
import { MachineMode } from '../../../utils/constants';
import useMachineStore from '../../../store';

const ScreenWrapper: FC<{children: ReactNode}> = ({ children }) => {
  const { account } = useEthers();
  const { setCurrentMode } = useMachineStore();
  useEffect(() => {
    if (account === undefined) {
      setCurrentMode(MachineMode.Off);
    }
  }, [account]);

  return (
    <>
      { children }
    </>
  );
};

export default ScreenWrapper;
