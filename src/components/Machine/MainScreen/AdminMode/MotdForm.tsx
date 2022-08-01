import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useContractFunction, useEthers } from '@usedapp/core';
import FormButton from './common/FormButton';
import { useMachineState } from '../../../../state/hooks';
import AdminFormWrapper from './AdminFormWrapper';
import { contract } from '../../../../utils/functions';
import useMachineStore from '../../../../store';
import { useTxNotifier } from '../../../../hooks/transaction';
import { getCustomErrorText } from '../../../../utils/helpers';

const MotdForm = () => {
  const { data: machineState } = useMachineState();
  const { account } = useEthers();
  const { setAltMessage } = useMachineStore();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [motd, setMotd] = useState(machineState?.motd?.message?.replace(/\r?\n|\r/g, '') || '');
  const { send, state } = useContractFunction(contract, 'setMOTD');

  useTxNotifier(
    { mining: 'Updating MotD', success: 'Success! MotD updated!' },
    state,
  );

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMotd(e.currentTarget.value.replace(/\r?\n|\r/g, ''));
  };

  const handleSubmit = () => {
    if (account !== machineState?.owner) {
      setAltMessage({ message: 'Woa there, only the owner of this device can do that!' });
      return;
    }
    if (!motd) {
      setAltMessage({ message: 'Bruh, it\'s empty! Try entering a message.' });
      return;
    }
    try {
      send(motd);
    } catch (e) {
      setAltMessage({ message: getCustomErrorText(undefined) });
    }
  };

  return (
    <AdminFormWrapper>
      <div className="flex flex-col space-y-2 -mt-1 h-full">
        <div className="pixel-font-thin text-2xl">
          What&apos;s the word, big worm? Share the latest news with the flock.
        </div>
        <textarea
          ref={textRef}
          onChange={handleChange}
          value={motd}
          className="resize-none p-4 focus:outline-none focus:border-2 focus:ring-0 focus:rounded-none w-full h-[175px] bg-screenBlack border text-2xl pixel-font-thin "
        />
        <div className="absolute bottom-0 right-0 flex space-x-2 text-sm">
          <FormButton label="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </AdminFormWrapper>
  );
};

export default MotdForm;
