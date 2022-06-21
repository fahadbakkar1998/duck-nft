/* eslint-disable no-console */
import { shortenAddress, useCall } from '@usedapp/core';
import { BigNumber, utils } from 'ethers';
import { useDuck } from '.';
import { useDucks } from '../state/hooks';
import { DuckData, DuckMetadata, DuckProfile } from '../types/types';
import { useMachineContract } from './machine';

const getMetadataAttribute = (metadata: DuckMetadata | undefined, traitType: string): string | undefined => {
  const attribute = metadata?.attributes.find((a) => a.trait_type === traitType);
  return attribute?.value;
};

export const useDuckProfile = (duck: DuckData): DuckProfile | undefined => {
  const duckMachine = useMachineContract();
  const { metadata } = duck;
  const { name, description } = metadata!;
  const creator = getMetadataAttribute(metadata, 'Creator');
  const { value, error } = useCall(duck && {
    contract: duckMachine,
    method: 'duckProfiles',
    args: [duck.id],
  }) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  const profile: DuckProfile = {
    name,
    description: value?.description || 'N/A - Contact the owner of this device to customize your duck\'s profile!',
    status: value?.stance[0] || 'N/A',
    creator: !duck.isCustom ? creator : shortenAddress(creator!),
  };
  return profile;
};
