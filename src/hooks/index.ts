import { useEthers } from '@usedapp/core';
import { Contract } from 'ethers';
import useMachineStore from '../store';
import { filterDucks } from '../utils/helpers';
import { DuckData } from '../types/types';
import { contractAbi } from '../utils/constants';
import { useDucks } from '../state/hooks';

const { REACT_APP_MACHINE_CONTRACT_ADDRESS: contractAddress = '' } = process.env;

export const useFilteredDucks = (ducks): DuckData[] => {
  const { duckFilters: filters } = useMachineStore();
  return filterDucks({ ducks, filters });
};

export const useDuck = (tokenId: number): DuckData | undefined => {
  const ducks = useDucks();
  return ducks.data[tokenId];
};
