import { useEthers } from '@usedapp/core';
import { DuckData, DuckFilters, MintStatus, DuckMetadata } from '../types/types';

export const filterDucks = ({ ducks = [], filters } : {ducks: DuckData[], filters: DuckFilters}): DuckData[] => {
  const { account } = useEthers();
  let filteredDucks = ducks;

  if (!filters.available && filters.sold) {
    filteredDucks = filteredDucks.filter((duck) => duck.owner);
  }

  if (!filters.available && !filters.sold) {
    filteredDucks = filteredDucks.filter((duck) => false);
  }

  if (!filters.sold && filters.available) {
    filteredDucks = filteredDucks.filter((duck) => !duck.owner);
  }

  if (!filters.custom) {
    filteredDucks = filteredDucks.filter((duck) => !duck.isCustom);
  }

  if (filters.mine) {
    filteredDucks = filteredDucks.filter((duck) => duck.owner === account);
  }
  return filteredDucks;
};

export const mintStatusName = (status: MintStatus) => {
  switch (status) {
    case MintStatus.Enabled:
      return 'on';
    case MintStatus.Allowance:
      return 'allow';
    default:
      return 'off';
  }
};

export const getCustomErrorText = (errorMessage: string | undefined) => {
  const defaultMsg = 'Oh quack! Something went wrong!';
  if (!errorMessage) return defaultMsg;
  if (errorMessage.includes('insufficient funds')) {
    return 'Error: Insufficient funds. Plz check the current duck price.';
  }
  return defaultMsg;
};

export const getMetadataAttribute = (metadata: DuckMetadata | undefined, traitType: string): string | undefined => {
  const attribute = metadata?.attributes.find((a) => a.trait_type === traitType);
  return attribute?.value;
};
