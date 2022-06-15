/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { utils } from 'ethers';
import { useContractFunction, useEthers } from '@usedapp/core';
import FormInput from './common/FormInput';
import FormButton from './common/FormButton';
import { useMachineState, useMachineConfig } from '../../../../state/hooks';
import AdminFormWrapper from './AdminFormWrapper';
import { useEnsOrShort } from '../../../../hooks';
import { useMachineContract } from '../../../../hooks/machine';
import useMachineStore from '../../../../store';
import { decimalRegex } from '../../../../utils/constants';

const BurnForm = () => {
  const [burnReason, setBurnReason] = useState('');
  const { data: machineState, isLoading } = useMachineState();
  const { account } = useEthers();
  const {
    setAltMessage,
    setIsLocked,
    setMachineMood,
    setOpenBurnForm,
    currentAdminDuckId,
  } = useMachineStore();

  const contract = useMachineContract();
  const { send, state } = useContractFunction(
    contract,
    'burnRenegadeDuck',
    { transactionName: 'Burn Renegade Duck' },
  );

  const handleBurn = () => {
    if (account !== machineState?.owner) {
      setAltMessage('Woa there, only the owner of this device can do that!');
      return;
    }
    send(currentAdminDuckId, burnReason);
  };

  useEffect(() => {
    if (state?.status === 'Mining') {
      setAltMessage('Duck Burn Processing...');
      setIsLocked(true);
      setMachineMood('happy');
    } else if (state?.status === 'Success') {
      setAltMessage('Successful! That duck won\t be bothering you anymore.');
      setMachineMood(undefined);
      setIsLocked(false);
    } else if (state?.status === 'PendingSignature') {
      setAltMessage('Signature Pending...');
    } else if (state?.status === 'Exception') {
      const denied = 'MetaMask Tx Signature: User denied transaction signature.';
      if (state?.errorMessage === denied) {
        setAltMessage('Well, nevermind then...');
      } else {
        setAltMessage('Oh Quack! something went wrong!');
      }
      setMachineMood('sad');
      setIsLocked(false);
      setTimeout(() => setMachineMood(undefined), 500);
    }
  }, [state.status]);

  return (
    <AdminFormWrapper>
      <div className="flex flex-col space-y-2 h-full relative pb-7">
        <div>BURN CUSTOM DUCK</div>
        <div className="pixel-font-thin">
          You sure about this, ser? Please say a few words about why this duck deserves to burn:
        </div>
        <textarea
          onChange={(e) => setBurnReason(e.currentTarget.value)}
          value={burnReason}
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
