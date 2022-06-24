/* eslint-disable no-console */
import { useState, useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { useContractFunction, useEthers } from '@usedapp/core';
import FormButton from './common/FormButton';
import { useDucks, useMachineState } from '../../../../state/hooks';
import AdminFormWrapper from './AdminFormWrapper';
import { useMachineContract } from '../../../../hooks/machine';
import useMachineStore from '../../../../store';

const MotdForm = () => {
  const queryClient = useQueryClient();
  const [motd, setMotd] = useState('');
  const { data: machineState } = useMachineState();

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
    'setMOTD',
    { transactionName: 'Set Message of the Day' },
  );

  const handleSubmit = () => {
    if (account !== machineState?.owner) {
      setAltMessage('Woa there, only the owner of this device can do that!');
      return;
    }
    send(motd);
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (state?.status === 'Mining') {
      setAltMessage('Updating MotD...');
      setIsLocked(true);
      setMachineMood('happy');
    } else if (state?.status === 'Success') {
      (async () => {
        await queryClient.invalidateQueries('machineState');
        setMachineMood(undefined);
        setIsLocked(false);
        setAltMessage('Success! The MotD has been updated.');
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
        <div>Message of the Day</div>
        <div className="pixel-font-thin">
          Share some news with the flock:
        </div>
        <textarea
          ref={textRef}
          onChange={(e) => setMotd(e.currentTarget.value)}
          value={motd}
          className="resize-none p-4 focus:outline-none focus:border-2 focus:ring-0 focus:rounded-none w-full h-[175px] bg-screenBlack border text-base text-red-300"
        />

        <div className="absolute -bottom-1 right-0 flex space-x-2 text-sm">
          <FormButton label="Submit" onClick={handleSubmit} />
        </div>

      </div>
    </AdminFormWrapper>
  );
};

export default MotdForm;
