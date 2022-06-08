import { useEthers } from '@usedapp/core';
import { Contract } from 'ethers';
import useMachineStore from '../store';
import { filterDucks } from '../utils/helpers';
import { DuckData } from '../types/types';
import { contractAbi } from '../utils/constants';

const { REACT_APP_MACHINE_CONTRACT_ADDRESS: contractAddress = '' } = process.env;

export const useFilteredDucks = (ducks): DuckData[] => {
  const { duckFilters: filters } = useMachineStore();
  return filterDucks({ ducks, filters });
};
