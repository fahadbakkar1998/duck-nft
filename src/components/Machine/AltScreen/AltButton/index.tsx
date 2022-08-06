/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { useContractFunction, useEthers } from '@usedapp/core';
import { utils } from 'ethers';
import useMachineStore from '../../../../store';
import { MachineMode } from '../../../../utils/constants';
import '../index.scss';
import Button from '../Button';
import { BuyIcon, ProfileIcon, ProfileOpenIcon } from '../../../common/SvgIcon';
import ShimmerLayer from '../../../common/ShimmerLayer';
import { contract, fetchMachineConfig } from '../../../../utils/functions';
import AltButtonLoader from './AltButtonLoader';
import BurnButton from './BurnButton';
import { useTxNotifier } from '../../../../hooks/transaction';
import { useDToolStore } from '../../../../store/dtoolStore';
// @ts-ignore
import lcdPress from '../../../../assets/audio/lcd.ogg';

const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID!);

const ButtonView = () => {
  const {
    currentDuckId,
    currentMode,
    showDuckProfile,
    setShowDuckProfile,
    setCurrentMode,
    isLocked,
    ducks,
    setAccount,
    setNewDuck,
  } = useMachineStore();

  const [play] = useSound(lcdPress);
  const { DToolInst } = useDToolStore();

  const selectedDuck = ducks?.find((d) => d.id === currentDuckId);
  const { activateBrowserWallet, account, switchNetwork, chainId } = useEthers();
  const {
    send: sendFnTozziDuck,
    state: mintTozziDuckState,
  } = useContractFunction(contract, 'mintTozziDuck');
  const {
    send: sendFnCustomTozziDuck,
    state: mintCustomTozziDuckState,
  } = useContractFunction(contract, 'mintCustomDuck');

  const customDuckMintedCallback = () => {
    console.log('new duck minted');
    setNewDuck(0);
  };

  useTxNotifier({}, mintTozziDuckState);
  useTxNotifier({}, mintCustomTozziDuckState, customDuckMintedCallback);

  useEffect(() => {
    setAccount(account);
  }, [account]);

  const handleMintTozziDuck = async () => {
    if (chainId !== CHAIN_ID) {
      await switchNetwork(CHAIN_ID);
    }
    const selectedDuck = ducks?.find((d) => d.id === currentDuckId);
    const canMint = selectedDuck && !selectedDuck.owner;
    play();
    if (canMint) {
      const { tozziMintPrice } = await fetchMachineConfig();
      const price = utils.parseEther(tozziMintPrice.toString());
      const { webp, proof } = selectedDuck;
      sendFnTozziDuck(account, currentDuckId, webp, proof, { value: price });
    }
  };

  const handleMintCustomTozziDuck = async () => {
    play();
    if (chainId !== CHAIN_ID) {
      await switchNetwork(CHAIN_ID);
    }
    const { customMintPrice } = await fetchMachineConfig();
    const price = utils.parseEther(customMintPrice.toString());
    const base64data = await DToolInst.getWebp();
    sendFnCustomTozziDuck(account, base64data, { value: price });
  };

  const handleConnectWallet = async () => {
    play();
    if (chainId !== CHAIN_ID) {
      await switchNetwork(CHAIN_ID);
    }
    activateBrowserWallet();
  };

  if (!account) {
    return (
      <Button onClick={handleConnectWallet}>
        <div className="flex space-x-2 justify-center items-center lcd-font opacity-75 hover:font-bold text-base mt-1">
          connect wallet
        </div>
      </Button>
    );
  }

  if (isLocked) return <AltButtonLoader />;

  if (currentMode === MachineMode.Shopping) {
    if (selectedDuck?.owner || selectedDuck?.isCustom) {
      return (
        <Button onClick={() => setShowDuckProfile(!showDuckProfile)}>
          <div className="flex space-x-2 justify-center items-center lcd-font text-black opacity-75 hover:font-bold ">
            <div>profile</div>
            { showDuckProfile ? (
              <ProfileOpenIcon wrapperClassName="w-5 mb-[1px]" className="stroke-black" />
            ) : (
              <ProfileIcon wrapperClassName="w-5 mb-[1px]" className="stroke-black" />
            )}
          </div>
        </Button>
      );
    }
    return (
      <Button onClick={handleMintTozziDuck}>
        <div className="flex space-x-2 justify-center items-center lcd-font text-black opacity-75 hover:font-bold">
          <div>buy duck</div>
          <BuyIcon wrapperClassName="w-5 mb-[3px]" className="stroke-black" />
        </div>
      </Button>
    );
  }

  if (currentMode === MachineMode.Customization) {
    return (
      <Button onClick={handleMintCustomTozziDuck}>
        <div className="flex space-x-2 justify-center items-center lcd-font text-black opacity-75 hover:font-bold">
          mint duck
        </div>
      </Button>
    );
  }

  if (currentMode === MachineMode.Off) {
    return (
      <div className="lcd-font h-full w-full flex justify-center text-xl items-center opacity-50">WELCOME</div>
    );
  }

  return <BurnButton />;
};

const AltButton = () => {
  const { isLocked } = useMachineStore();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inner-shadow absolute rounded-sm -bottom-[25.5%] left-[5.75%] graph-bg h-[14.75%] w-[48.75%] pointer-events-auto select-none"
    >
      <ShimmerLayer targetHovered={isHovered} />
      <ButtonView />
    </div>
  );
};

export default AltButton;
