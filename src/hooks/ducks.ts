/* eslint-disable no-console */
import { useCall } from '@usedapp/core';
import { DuckProfile } from '../types/types';
import { useMachineContract } from './machine';

export const useDuckProfile = (tokenId: number): DuckProfile | undefined => {
  const duckMachine = useMachineContract();

  const { value, error } = useCall(tokenId && {
    contract: duckMachine,
    method: 'duckProfiles',
    args: [tokenId],
  }) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  const profile: DuckProfile = {
    name: value?.name || `Tozzi Duck ${tokenId}`,
    description: value?.description || 'N/A - Contact the owner of this device to customize your duck\'s profile!',
    status: value?.stance[0] || 'N/A',
    creator: tokenId < 200 ? 'Jim Tozzi' : '??',
  };

  return profile;
};
