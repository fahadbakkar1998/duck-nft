import { useEffect, useState } from 'react';
import { shortenAddress, useEthers } from '@usedapp/core';
import { Contract } from 'ethers';
import useMachineStore from '../store';
import { filterDucks } from '../utils/helpers';
import { DuckData, Size } from '../types/types';
import { contractAbi, MachineMode } from '../utils/constants';

const { REACT_APP_MACHINE_CONTRACT_ADDRESS: contractAddress = '' } = process.env;

// export const useFilteredDucks = (ducks): DuckData[] => {
//   const { duckFilters: filters } = useMachineStore();
//   return filterDucks({ ducks, filters });
// };

export function useEnsOrShort(account: string | undefined) {
  const [ens, setEns] = useState<string | null>();
  const { library } = useEthers();

  useEffect(() => {
    let mounted = true;

    if (account && library) {
      library
        ?.lookupAddress(account)
        .then((name) => {
          if (mounted) {
            setEns(name);
          }
        })
        .catch(() => setEns(shortenAddress(account)));
    } else {
      setEns(shortenAddress(account!));
    }

    return () => {
      mounted = false;
    };
  }, [account, library]);

  return ens;
}

export const useAccountChange = () => {
  const { account, chainId } = useEthers();
  const { switchModes, setAccount } = useMachineStore();
  useEffect(() => {
    if (!account) {
      switchModes('off');
    }
    setAccount(account || undefined);
  }, [account]);
};

export function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}

export const useIsMobile = () => {
  const { width } = useWindowSize();
  const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

  // if (width && width < 750) isMobile = true;

  return isMobile;
};
