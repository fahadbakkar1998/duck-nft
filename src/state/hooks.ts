import { useQuery } from 'react-query';
import { fetchDucks, fetchMachineConfig, fetchMachineState } from '../utils/functions';
import { DuckData } from '../types/types';

export const useDucks = (): DuckData | any => {
  const response = useQuery('ducks', async () => fetchDucks(), {
    refetchOnWindowFocus: false,
  });
  const ducks = response.data;
  return response;
};

export const useMachineConfig = () => {
  const response = useQuery('machineConfig', async () => fetchMachineConfig(), {
    refetchOnWindowFocus: false,
  });
  return response;
};

export const useMachineState = () => {
  const response = useQuery('machineState', async () => fetchMachineState(), {
    refetchOnWindowFocus: false,
  });
  return response;
};
