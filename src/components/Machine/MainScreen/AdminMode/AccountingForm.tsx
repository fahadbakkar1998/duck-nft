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

const decimalRegex = /^\d*(?:[.,]\d*)?$/;

const AccountingForm = () => {
  const [value, setValue] = useState('');
  const { data: machineState, isLoading } = useMachineState();
  const owner = useEnsOrShort(machineState?.owner);
  const {
    setAltMessage,
    setIsLocked,
    setMachineMood,
  } = useMachineStore();

  const contract = useMachineContract();
  const { send, state } = useContractFunction(
    contract,
    'withdraw',
    { transactionName: 'Withdraw Funds' },
  );

  const handleWithdraw = () => {
    if (!value) {
      setAltMessage('Enter amount to withdraw, plz');
      return;
    }
    if (contract && machineState?.owner) {
      console.log('withdraw it');
      try {
        send(
          machineState.owner,
          utils.parseEther(value ?? ''),
        );
      } catch (e) {
        setAltMessage('Oh quack! Something went wrong!');
      }
    }
  };

  useEffect(() => {
    console.log(state);
    if (state?.status === 'Mining') {
      setAltMessage('Withdrawal Processing...');
      setIsLocked(true);
      setMachineMood('happy');
    } else if (state?.status === 'Success') {
      setAltMessage('Withdrawal Successful!');
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
      <div className="flex flex-col space-y-2 h-full relative">
        <div>OWNER</div>
        <div className="pixel-font-thin text-xl">
          { owner || '--' }
        </div>
        <div>CURRENT BALANCE</div>
        <div className="pixel-font-thin text-xl">
          { machineState?.balance ?? '--'} ETH
        </div>
        <div>WITHDRAW ETH</div>
        <div className="pixel-font-thin">
          <FormInput
            className="w-full"
            value={value}
            overlay="ETH"
            onChange={(e) => {
              if (decimalRegex.test(e.currentTarget.value)) setValue(e.currentTarget.value);
            }}
          />
        </div>
        <div className="absolute -bottom-4 -right-4 flex space-x-2 text-sm">
          <FormButton label="Reset" onClick={() => setValue('')} />
          <FormButton label="Submit" onClick={handleWithdraw} />
        </div>

      </div>
    </AdminFormWrapper>
  );
};

export default AccountingForm;
