/* eslint-disable no-console */
import { useCall, useEthers } from '@usedapp/core';
import { utils } from 'ethers';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Contract } from '@ethersproject/contracts';
import { MachineConfig, MintStatus } from '../types/types';
import { contractAbi } from '../utils/constants';

export const useMachineContract = (): Contract => {
  const { library } = useEthers();
  const contract = new Contract(process.env.REACT_APP_MACHINE_CONTRACT_ADDRESS!, contractAbi, library);
  return contract;
};

// export const useMachineConfig = (): MachineConfig | undefined => {
//   const { value, error } = useCall({
//     contract: useMachineContract(),
//     method: 'machineConfig',
//     args: [],
//   }) ?? {};

//   if (error) {
//     console.error(error.message);
//   }

//   if (value) {
//     return {
//       tozziMintStatus: value?.[3] as MintStatus,
//       tozziMintPrice: utils.formatEther(value?.[0]),
//       customMintStatus: value?.[4] as MintStatus,
//       customMintPrice: utils.formatEther(value?.[1]),
//       maxCustomDucks: value?.[2].toNumber(),
//     };
//   }
//   return value;
// };

// export default useMachineConfig;
