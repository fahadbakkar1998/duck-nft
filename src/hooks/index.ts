import useMachineStore from "../store";
import { filterDucks } from "../utils/helpers";
import { DuckData } from "../types/types";

export const useFilteredDucks = (): DuckData[] => {
  const { ducks, duckFilters } = useMachineStore();
  return filterDucks(ducks, duckFilters);  
}