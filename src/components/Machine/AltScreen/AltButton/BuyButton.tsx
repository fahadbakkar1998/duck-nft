import { useEffect, FC } from 'react';
import { utils } from 'ethers';
import { TransactionStatus, useContractFunction } from '@usedapp/core';
import { useDucks } from '../../../../state/hooks';
import useMachineStore from '../../../../store';
import Button from '../Button';
import { contract, fetchMachineConfig } from '../../../../utils/functions';
import { ActionButtonProps } from '../../../../types/types';

import { BuyIcon, ProfileIcon, ProfileOpenIcon } from '../../../common/SvgIcon';
import AltButtonLoader from './AltButtonLoader';

// const useStateHandler = (state: TransactionStatus) => {
//   const {
//     setAltMessage,
//     setIsLocked,
//     setMachineMood,
//   } = useMachineStore();
//   useEffect(() => {
//     if (state?.status === 'Mining') {
//       setAltMessage('Update Processing...');
//       setIsLocked(true);
//       setMachineMood('happy');
//     } else if (state?.status === 'Success') {
//       setAltMessage('Settings Updated!');
//       setMachineMood(undefined);
//       setIsLocked(false);
//     } else if (state?.status === 'PendingSignature') {
//       setAltMessage('Signature Pending...');
//     } else if (state?.status === 'Exception') {
//       const denied = 'MetaMask Tx Signature: User denied transaction signature.';
//       if (state?.errorMessage === denied) {
//         setAltMessage('Well, nevermind then...');
//       } else {
//         setAltMessage('Oh Quack! something went wrong!');
//       }
//       setMachineMood('sad');
//       setIsLocked(false);
//       setTimeout(() => setMachineMood(undefined), 500);
//     }
//   }, [state.status]);
// };

const BuyButton: FC<ActionButtonProps> = ({ handleOnMining, handleOnSuccess }) => {
  const {
    currentDuckId,
    showDuckProfile,
    setShowDuckProfile,
    isLocked,
  } = useMachineStore();

  const { data = [], isLoading } = useDucks();
  const ducks = !isLoading ? data : [];
  const selectedDuck = ducks[currentDuckId];

  const {
    send: sendFnTozziDuck,
    state: mintTozziDuckState,
  } = useContractFunction(contract, 'mintTozziDuck');

  // useStateHandler(mintTozziDuckState);

  const handleMintTozziDuck = async () => {
    const canMint = currentDuckId && ducks[currentDuckId] && !ducks[currentDuckId].owner;
    if (canMint) {
      const { tozziMintPrice } = await fetchMachineConfig();
      const price = utils.parseEther(tozziMintPrice.toString());
      const { webp, proof } = ducks[currentDuckId];
      sendFnTozziDuck(currentDuckId, webp, proof, { value: price });
    }
  };

  useEffect(() => {
    const { status } = mintTozziDuckState;
    if (status === 'Mining') handleOnMining();
    if (status === 'Success') handleOnSuccess();
  }, [mintTozziDuckState, handleOnMining, handleOnSuccess]);

  const {
    setAltMessage,
    setIsLocked,
    setMachineMood,
  } = useMachineStore();

  useEffect(() => {
    if (mintTozziDuckState?.status === 'Mining') {
      setAltMessage('Update Processing...');
      setIsLocked(true);
      setMachineMood('happy');
    } else if (mintTozziDuckState?.status === 'Success') {
      setAltMessage('Settings Updated!');
      setMachineMood(undefined);
      setIsLocked(false);
    } else if (mintTozziDuckState?.status === 'PendingSignature') {
      setAltMessage('Signature Pending...');
    } else if (mintTozziDuckState?.status === 'Exception') {
      const denied = 'MetaMask Tx Signature: User denied transaction signature.';
      if (mintTozziDuckState?.errorMessage === denied) {
        setAltMessage('Well, nevermind then...');
      } else {
        setAltMessage('Oh Quack! something went wrong!');
      }
      setMachineMood('sad');
      setIsLocked(false);
      setTimeout(() => setMachineMood(undefined), 500);
    }
  }, [mintTozziDuckState.status]);

  return (
    <>
      { isLocked && <AltButtonLoader />}
      { !isLocked && selectedDuck?.owner && (
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
      )}
      {!isLocked && !selectedDuck?.owner && (
        <Button onClick={handleMintTozziDuck}>
          <div className="flex space-x-2 justify-center items-center lcd-font text-black opacity-75 hover:font-bold">
            <div>buy duck</div>
            <BuyIcon wrapperClassName="w-5 mb-[3px]" className="stroke-black" />
          </div>
        </Button>
      )}
    </>
  );
};

export default BuyButton;
