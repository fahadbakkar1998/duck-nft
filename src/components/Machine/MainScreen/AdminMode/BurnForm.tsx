/* eslint-disable no-console */
import { useState, useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { useContractFunction, useEthers } from '@usedapp/core';
import FormButton from './common/FormButton';
import { useDucks, useMachineState } from '../../../../state/hooks';
import AdminFormWrapper from './AdminFormWrapper';
import { useMachineContract } from '../../../../hooks/machine';
import useMachineStore from '../../../../store';

const BurnForm = () => {
  const queryClient = useQueryClient();
  const [burnReason, setBurnReason] = useState('');
  const { data: machineState } = useMachineState();
  const { data: ducksData = [], isLoading } = useDucks();
  const ducks = !isLoading ? ducksData.filter((d) => d.burnable) : [];

  const { account } = useEthers();
  const {
    setAltMessage,
    setIsLocked,
    setMachineMood,
    setOpenBurnForm,
    currentAdminDuckId,
    setCurrentAdminDuckId,
  } = useMachineStore();
  const textRef = useRef<HTMLTextAreaElement>(null);

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
    if (textRef.current) {
      textRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (state?.status === 'Mining') {
      setAltMessage('Duck Burn Processing...');
      setIsLocked(true);
      setMachineMood('happy');
    } else if (state?.status === 'Success') {
      (async () => {
        const nextDuck = ducks[0].id === currentAdminDuckId
          ? ducks[1] : ducks[0];
        await queryClient.invalidateQueries();
        setOpenBurnForm(false);
        setMachineMood(undefined);
        setIsLocked(false);
        setCurrentAdminDuckId(nextDuck?.id ?? -1);
        setAltMessage('Success! That duck won\t be bothering you anymore.');
      })();
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
          ref={textRef}
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
