/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { BURN_WINDOW, contractAbi } from './constants';
import staticDuckData from './duckData.json';
import { MachineConfig, MachineState } from '../types/types';

declare let window: any;

const { REACT_APP_MACHINE_CONTRACT_ADDRESS: contractAddress = '' } = process.env;

const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
const duckMachineContract = new ethers.Contract(contractAddress, contractAbi, ethereumProvider);
export const contract = new Contract(contractAddress, contractAbi, ethereumProvider.getSigner()) as any;

const getMachineConfig = async () => {
  const config = await duckMachineContract.machineConfig();
  return config;
};

const getMintedDucks = async () => {
  const eventFilter = duckMachineContract.filters.DuckMinted();
  const events = await duckMachineContract.queryFilter(eventFilter);
  let parsedEvents;

  if (events.length) {
    parsedEvents = await Promise.all(events.map(async (event) => {
      const tokenId = parseInt(event?.args?.tokenId._hex);
      const salePrice = parseInt(event?.args?.price._hex);
      const duckType = event?.args?.duckType;
      const owner = event?.args?.who;
      const tokenURI = await duckMachineContract.tokenURI(tokenId);
      const tokenURIRes = await axios.get(tokenURI);
      const timestamp = await (await (event.getBlock())).timestamp;
      let webp;
      if (tokenURIRes.statusText === 'OK') {
        webp = tokenURIRes.data.image;
      }
      return {
        id: tokenId,
        salePrice,
        isCustom: !!duckType,
        owner,
        webp,
        hatched: timestamp * 1000,
      };
    }));
  }
  return parsedEvents;
};

const getTotalSales = async () => {
  const mintedDucks = await getMintedDucks();
  const totalSales = mintedDucks.reduce((acc, val) => acc + val.salePrice, 0);
  return ethers.utils.formatEther(totalSales);
};

const getMintsCount = async () => {
  const mintedDucks = await getMintedDucks();
  const tozziDuckCount = mintedDucks.filter((duck) => !duck.isCustom).length;
  const customDuckCount = mintedDucks.filter((duck) => duck.isCustom).length;

  return {
    tozzi: tozziDuckCount,
    custom: customDuckCount,
  };
};

const fetchDucks = async () => {
  let mintedDuckIds: number[] = [];
  const ducksMinted = await getMintedDucks() ?? [];
  const formatedMintedDucks = ducksMinted.map((duck, index) => {
    const { id, salePrice, isCustom, owner, webp, hatched } = duck;
    const { proof } = staticDuckData[index];
    mintedDuckIds = [...mintedDuckIds, id];
    return {
      id,
      proof,
      webp: isCustom ? webp : staticDuckData.find((duck) => duck.id === id)?.webp,
      owner,
      salePrice,
      isCustom,
      hatched: hatched as number,
      burnable: hatched > 0 && hatched + BURN_WINDOW < Date.now(),
    };
  });

  // TODO - filter out burned ducks
  const mintedDucks = formatedMintedDucks.filter((duck) => duck.id !== 420);
  const mintedTozziDucks = mintedDucks.filter((duck) => !duck.isCustom);
  const mintedCustomDucks = mintedDucks.filter((duck) => duck.isCustom);
  const nonMintedDucks = staticDuckData.filter((duck) => !mintedDucks.includes(duck.id));
  const ducks = nonMintedDucks.map((obj) => mintedTozziDucks.find((o) => o.id === obj.id) || obj);

  const finalDucks = [...ducks, ...mintedCustomDucks];
  return finalDucks;
};

const fetchMachineConfig = async (): Promise<MachineConfig> => {
  const machineConfig = await getMachineConfig();

  return {
    tozziMintStatus: parseInt(machineConfig.tozziDuckMintStatus),
    tozziMintPrice: ethers.utils.formatEther(machineConfig.tozziDuckPrice),
    customMintStatus: parseInt(machineConfig.customDuckMintStatus),
    customMintPrice: ethers.utils.formatEther(machineConfig.customDuckPrice),
    maxCustomDucks: parseInt(machineConfig.maxCustomDucks),
  };
};

const fetchMachineState = async (): Promise<MachineState> => {
  const ownershipTokenId = await duckMachineContract.OWNERSHIP_TOKEN_ID();
  const machineOwner = await duckMachineContract.ownerOf(ownershipTokenId);
  const balance = await ethereumProvider.getBalance(contractAddress);
  const totalSales = await getTotalSales();
  const duckMintsCount = await getMintsCount();
  const machineConfig = await fetchMachineConfig();
  return {
    owner: machineOwner,
    tozziMints: duckMintsCount.tozzi,
    customMints: duckMintsCount.custom,
    balance: ethers.utils.formatEther(balance),
    config: machineConfig,
    totalSales,
  };
};

export { fetchDucks, fetchMachineConfig, fetchMachineState, duckMachineContract };
