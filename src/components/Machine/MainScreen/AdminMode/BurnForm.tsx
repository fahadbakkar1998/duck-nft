import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useContractFunction, useEthers } from '@usedapp/core';
import FormButton from './common/FormButton';
import { useMachineState } from '../../../../state/hooks';
import AdminFormWrapper from './AdminFormWrapper';
import { useMachineContract } from '../../../../hooks/machine';
import useMachineStore from '../../../../store';
import { useTxNotifier } from '../../../../hooks/transaction';
import { getCustomErrorText } from '../../../../utils/helpers';

const BurnForm = () => {
  const [burnReason, setBurnReason] = useState('');
  const { data: machineState } = useMachineState();

  const { account } = useEthers();
  const {
    setAltMessage,
    setOpenBurnForm,
    currentAdminDuckId,
  } = useMachineStore();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const contract = useMachineContract();

  const { send, state } = useContractFunction(contract, 'burnRenegadeDuck');
  useTxNotifier(
    {
      mining: 'Burning that goddamn duck',
      success: 'Success! That duck won\t be bothering you anymore',
    },
    state,
  );

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
    }
  }, []);

  const handleBurn = () => {
    if (account !== machineState?.owner) {
      setAltMessage({ message: 'Woa there, only the owner of this device can do that!' });
      return;
    }
    if (!burnReason) {
      setAltMessage({ message: 'But why!? Please provide a reason' });
      return;
    }
    try {
      send(currentAdminDuckId, burnReason);
    } catch (e) {
      setAltMessage(getCustomErrorText(undefined));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBurnReason(e.currentTarget.value.replace(/\r?\n|\r/g, ''));
  };

  return (
    <AdminFormWrapper>
      <div className="flex flex-col space-y-2 h-full relative pb-7">
        <div className="pixel-font-thin text-2xl">
          You sure about this? Please say a few words about why this duck deserves to burn:
        </div>
        <textarea
          ref={textRef}
          onChange={handleChange}
          value={burnReason}
          className="resize-none p-4 focus:outline-none focus:border-2 focus:ring-0 focus:rounded-none w-full h-[200px] bg-screenBlack border text-2xl pixel-font-thin"
        />

        <div className="absolute bottom-0 right-0 flex space-x-2 text-sm">
          <FormButton label="Cancel" onClick={() => setOpenBurnForm(false)} />
          <FormButton label="Submit" onClick={handleBurn} />
        </div>

      </div>
    </AdminFormWrapper>
  );
};

export default BurnForm;
