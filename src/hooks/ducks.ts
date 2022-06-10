/* eslint-disable no-console */
import { shortenAddress, useCall } from '@usedapp/core';
import { BigNumber, utils } from 'ethers';
import { useDuck } from '.';
import { useDucks } from '../state/hooks';
import { DuckMetadata, DuckProfile } from '../types/types';
import { useMachineContract } from './machine';

const getMetadataAttribute = (metadata: DuckMetadata | undefined, traitType: string): string | undefined => {
  const attribute = metadata?.attributes.find((a) => a.trait_type === traitType);
  return attribute?.value;
};

export const useDuckProfile = (tokenId: number): DuckProfile | undefined => {
  const duckMachine = useMachineContract();
  const { metadata } = useDuck(tokenId);
  console.log(metadata);
  const creator = getMetadataAttribute(metadata, 'Creator');
  const complexity = getMetadataAttribute(metadata, 'Duck Image Complexity');

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
    creator: tokenId < 200 ? creator : shortenAddress(creator!),
    complexity: `${complexity} Bytes`,
  };
  return profile;
};
