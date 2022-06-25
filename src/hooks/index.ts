import { useEffect, useState } from 'react';
import { shortenAddress, useEthers } from '@usedapp/core';
import { Contract } from 'ethers';
import useMachineStore from '../store';
import { filterDucks } from '../utils/helpers';
import { DuckData } from '../types/types';
import { contractAbi, MachineMode } from '../utils/constants';
import { useDucks } from '../state/hooks';

const { REACT_APP_MACHINE_CONTRACT_ADDRESS: contractAddress = '' } = process.env;

export const useFilteredDucks = (ducks): DuckData[] => {
  const { duckFilters: filters } = useMachineStore();
  return filterDucks({ ducks, filters });
};

export const useDuck = (tokenId: number): DuckData => {
  const ducks = useDucks();
  return ducks.data[tokenId];
};

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
  const { account } = useEthers();
  const { switchModes, setAccount } = useMachineStore();
  useEffect(() => {
    if (!account) {
      switchModes('off');
    }
    setAccount(account || undefined);
  }, [account]);
};
