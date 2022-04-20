import { DuckData, DuckFilters } from "@/types/types";

export const filterDucks = (ducks: DuckData[], filters: DuckFilters): DuckData[] => {
  console.log('ducks', ducks);
  return ducks.filter(d => d.id).filter((duck) => {  
    if (filters.available && !filters.sold) {
      if (duck.owner) return false;
    }
    if (!filters.available && filters.sold) {
      if (!duck.owner) return false;
    }

    

    return true;
  })
  
  // all: boolean;
  // available: boolean;
  // sold: boolean;
  // mine: boolean;
  // custom: boolean;
  // hideUI: boolean;
}