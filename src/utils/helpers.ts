import { useEthers } from '@usedapp/core';
import { DuckData, DuckFilters } from '../types/types';

export const filterDucks = ({ ducks = [], filters } : {ducks: DuckData[], filters: DuckFilters}): DuckData[] => {
  const { account } = useEthers();
  let filteredDucks = ducks;

  if (!filters.available && filters.sold) {
    filteredDucks = filteredDucks.filter((duck) => duck.owner);
  }

  if (!filters.sold && filters.available) {
    filteredDucks = filteredDucks.filter((duck) => !duck.owner);
  }

  if (filters.custom) {
    filteredDucks = filteredDucks.filter((duck) => duck.isCustom);
  }

  if (filters.mine) {
    filteredDucks = filteredDucks.filter((duck) => duck.owner === account);
  }
  return filteredDucks;
};
