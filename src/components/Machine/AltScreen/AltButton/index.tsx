/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useContractFunction, useEthers } from '@usedapp/core';
import { utils } from 'ethers';
import useMachineStore from '../../../../store';
import { MachineMode } from '../../../../utils/constants';
import '../index.scss';
import Button from '../Button';
import { useDucks } from '../../../../state/hooks';
import { BuyIcon, ProfileIcon, ProfileOpenIcon } from '../../../common/SvgIcon';
import ShimmerLayer from '../../../common/ShimmerLayer';
import { contract, fetchMachineConfig } from '../../../../utils/functions';
import AltButtonLoader from './AltButtonLoader';

const ButtonView = () => {
  const queryClient = useQueryClient();
  const {
    currentDuckId,
    setProcessing,
    setAltMessage,
    currentMode,
    setOpenBurnModal,
    DToolInst,
    showDuckProfile,
    setShowDuckProfile,
    setIsBurning,
    setShowTxStatus,
    setCurrentMode,
    isLocked,
    setIsLocked,
    setMachineMood,
  } = useMachineStore();
  const { data = [], isLoading } = useDucks();
  const ducks = !isLoading ? data : [];
  const selectedDuck = ducks?.find((d) => d.id === currentDuckId);

  const { activateBrowserWallet, account } = useEthers();
  const { send: sendFnTozziDuck, state: mintTozziDuckState } = useContractFunction(contract, 'mintTozziDuck');
  const { send: sendFnCustomTozziDuck, state: mintCustomTozziDuckState } = useContractFunction(contract, 'mintCustomDuck');

  const handleOnSigning = useCallback(() => {
    setAltMessage('Signature Pending...');
  }, [setAltMessage]);

  const handleOnMining = useCallback((message?: string) => {
    setAltMessage(message || 'mining...');
    setIsLocked(true);
    setMachineMood('happy');
  }, [setAltMessage, setIsLocked]);

  const handleOnSuccess = useCallback(() => {
    queryClient.invalidateQueries();
    setAltMessage('Success! Duck Purchased!');
    setMachineMood(undefined);
    setIsLocked(false);
  }, [queryClient, setAltMessage]);

  useEffect(() => {
    if (account) {
      setCurrentMode(MachineMode.Shopping);
      setCurrentMode(MachineMode.Off);
    }
  }, [account]);

  useEffect(() => {
    const { status } = mintTozziDuckState;
    if (status === 'PendingSignature') handleOnSigning();
    if (status === 'Mining') handleOnMining('Duck purchase processing...');
    if (status === 'Success') handleOnSuccess();
  }, [mintTozziDuckState, handleOnMining, handleOnSuccess]);

  useEffect(() => {
    const { status } = mintCustomTozziDuckState;
    if (status === 'PendingSignature') handleOnSigning();
    if (status === 'Mining') handleOnMining('Custom duck minting in progress..');
    if (status === 'Success') handleOnSuccess();
  }, [mintCustomTozziDuckState, handleOnMining, handleOnSuccess]);

  const handleMintTozziDuck = async () => {
    const selectedDuck = ducks?.find((d) => d.id === currentDuckId);
    const canMint = selectedDuck && !selectedDuck.owner;
    if (canMint) {
      const { tozziMintPrice } = await fetchMachineConfig();
      const price = utils.parseEther(tozziMintPrice.toString());
      const { webp, proof } = selectedDuck;
      sendFnTozziDuck(currentDuckId, webp, proof, { value: price });
    }
  };

  const handleMintCustomTozziDuck = async () => {
    // const canMint = true; //TODO handle this case. check to see if custom minting is even enabled
    const { customMintPrice } = await fetchMachineConfig();
    const price = utils.parseEther(customMintPrice.toString());
    const base64data = await DToolInst.getWebp();
    sendFnCustomTozziDuck(base64data, { value: price });
  };

  if (currentMode === MachineMode.Off) {
    return (
      <Button onClick={() => activateBrowserWallet()}>
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
  return (
    <Button onClick={() => setOpenBurnModal(true)}>
      <div
        onMouseEnter={() => setIsBurning(true)}
        onMouseLeave={() => setIsBurning(false)}
        className="flex space-x-2 justify-center items-center lcd-font text-black opacity-75 hover:font-bold"
      >
        burn duck
      </div>
    </Button>
  );
};

const AltButton = () => {
  const { isLocked } = useMachineStore();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inner-shadow absolute rounded-sm -bottom-[25.5%] left-[5.75%] graph-bg h-[14.75%] w-[48.75%] pointer-events-auto"
    >
      <ShimmerLayer targetHovered={isHovered} />
      <ButtonView />
    </div>
  );
};

export default AltButton;
