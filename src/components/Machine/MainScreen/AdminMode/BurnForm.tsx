/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { utils } from 'ethers';
import { useContractFunction } from '@usedapp/core';
import FormInput from './common/FormInput';
import FormButton from './common/FormButton';
import { useMachineState, useMachineConfig } from '../../../../state/hooks';
import AdminFormWrapper from './AdminFormWrapper';
import { useEnsOrShort } from '../../../../hooks';
import { useMachineContract } from '../../../../hooks/machine';
import useMachineStore from '../../../../store';
import { decimalRegex } from '../../../../utils/constants';

const BurnForm = () => {
  const [value, setValue] = useState('');
  const { data: machineState, isLoading } = useMachineState();
  const owner = useEnsOrShort(machineState?.owner);
  const {
    setAltMessage,
    setIsLocked,
    setMachineMood,
    setOpenBurnForm,
  } = useMachineStore();

  const contract = useMachineContract();
  const { send, state } = useContractFunction(
    contract,
    'withdraw',
    { transactionName: 'Withdraw Funds' },
  );

  const handleBurn = () => {
    console.log('burn duck');
  };

  // useEffect(() => {
  //   if (state?.status === 'Mining') {
  //     setAltMessage('Withdrawal Processing...');
  //     setIsLocked(true);
  //     setMachineMood('happy');
  //   } else if (state?.status === 'Success') {
  //     setAltMessage('Withdrawal Successful!');
  //     setMachineMood(undefined);
  //     setIsLocked(false);
  //   } else if (state?.status === 'PendingSignature') {
  //     setAltMessage('Signature Pending...');
  //   } else if (state?.status === 'Exception') {
  //     const denied = 'MetaMask Tx Signature: User denied transaction signature.';
  //     if (state?.errorMessage === denied) {
  //       setAltMessage('Well, nevermind then...');
  //     } else {
  //       setAltMessage('Oh Quack! something went wrong!');
  //     }
  //     setMachineMood('sad');
  //     setIsLocked(false);
  //     setTimeout(() => setMachineMood(undefined), 500);
  //   }
  // }, [state.status]);

  return (
    <AdminFormWrapper>
      <div className="flex flex-col space-y-2 h-full relative pb-7">
        <div>BURN CUSTOM DUCK</div>
        <div className="pixel-font-thin">
          You sure about this, ser? Please say a few words about why this duck deserves to burn:
        </div>
        <textarea
          className="resize-none p-4 focus:outline-none focus:border-2 focus:ring-0 focus:rounded-none w-full h-full bg-screenBlack border text-base text-red-300"
        />

        <div className="absolute -bottom-4 -right-4 flex space-x-2 text-sm">
          <FormButton label="Cancel" onClick={() => setOpenBurnForm(false)} />
          <FormButton label="Submit" onClick={handleBurn} />
        </div>

      </div>
    </AdminFormWrapper>
  );
};

export default BurnForm;
