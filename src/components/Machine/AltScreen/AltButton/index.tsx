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
import BuyButton from './BuyButton';

const ButtonView = () => {
  const currState = useMachineStore((state) => state);
  const queryClient = useQueryClient();
  const {
    currentDuckId,
    setProcessing,
    setTransactionStatus,
    currentMode,
    setOpenBurnModal,
    DToolInst,
    showDuckProfile,
    setShowDuckProfile,
    setIsBurning,
    setShowTxStatus,
    setCurrentMode,
  } = currState;
  const { data = [], isLoading } = useDucks();
  const ducks = !isLoading ? data : [];

  const selectedDuck = ducks[currentDuckId];
  const { activateBrowserWallet, account } = useEthers();
  const { send: sendFnTozziDuck, state: mintTozziDuckState } = useContractFunction(contract, 'mintTozziDuck');
  const { send: sendFnCustomTozziDuck, state: mintCustomTozziDuckState } = useContractFunction(contract, 'mintCustomDuck');

  const handleOnMining = useCallback(() => {
    setShowTxStatus(true);
    setProcessing(true);
    setTransactionStatus('processing...');
  }, [setProcessing, setShowTxStatus, setTransactionStatus]);

  const handleOnSuccess = useCallback(() => {
    queryClient.invalidateQueries();
    setTransactionStatus('None');
    setProcessing(false);
  }, [queryClient, setProcessing, setTransactionStatus]);

  useEffect(() => {
    if (account) {
      setCurrentMode(MachineMode.Shopping);
      setCurrentMode(MachineMode.Off);
    }
  }, [account]);

  useEffect(() => {
    const { status } = mintCustomTozziDuckState;
    if (status === 'Mining') {
      setShowTxStatus(true);
      setProcessing(true);
      setTransactionStatus('processing...');
    }
    if (status === 'Success') {
      queryClient.invalidateQueries();
      setTransactionStatus('None');
      setProcessing(false);
    }
  }, [queryClient, setProcessing, setShowTxStatus, setTransactionStatus, mintCustomTozziDuckState]);

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

  if (currentMode === MachineMode.Syncing) return <div>Syncing...</div>;

  if (currentMode === MachineMode.Shopping) {
    return (
      <BuyButton
        handleOnMining={handleOnMining}
        handleOnSuccess={handleOnSuccess}
      />
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
      { isLocked ? <AltButtonLoader /> : <ButtonView /> }
    </div>
  );
};

export default AltButton;
