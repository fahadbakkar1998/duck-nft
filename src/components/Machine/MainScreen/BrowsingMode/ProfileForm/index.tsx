import { useContractFunction } from '@usedapp/core';
import { utils } from 'ethers';
import { FC, useRef, useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useMachineContract } from '../../../../../hooks/machine';
import useMachineStore from '../../../../../store';
import FormButton from '../../AdminMode/common/FormButton';
import FormInput from '../../AdminMode/common/FormInput';
import Modal from '../../OnScreenModal';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ProfileForm: FC<Props> = ({ open, onClose }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [profile, setProfile] = useState('');
  const queryClient = useQueryClient();
  const {
    setAltMessage,
    setIsLocked,
    setMachineMood,
    setOpenBurnForm,
    currentAdminDuckId,
    setCurrentAdminDuckId,
    currentDuckId,
    setShowDuckProfile,
  } = useMachineStore();

  const contract = useMachineContract();
  const { send, state } = useContractFunction(
    contract,
    'setDuckProfile',
    { transactionName: 'Set Duck Profile' },
  );

  useEffect(() => {
    if (state?.status === 'Mining') {
      setAltMessage('Updating Duck Profile...');
      setIsLocked(true);
      setMachineMood('happy');
    } else if (state?.status === 'Success') {
      (async () => {
        await queryClient.invalidateQueries();
        setMachineMood(undefined);
        setIsLocked(false);
        setAltMessage('Success! Duck profile updated.');
        setShowDuckProfile(false);
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

  const handleSubmit = () => {
    send(
      currentDuckId,
      utils.formatBytes32String(name),
      utils.formatBytes32String(status),
      profile,
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      buttons={(
        <div className="absolute bottom-0 right-0 flex space-x-2">
          <FormButton label="Cancel" onClick={onClose} />
          <FormButton label="Submit" onClick={handleSubmit} />
        </div>
      )}
    >
      <div className="flex flex-col mb-1 h-full relative pb-7 pixel-font-thin text-2xl ">
        <div className="pixel-font text-lg">
          EDIT DUCK PROFILE
        </div>
        <div className="space-x-2 flex justify-between mb-1">
          <div className="flex-1">
            <div>Name:</div>
            <FormInput
              className="w-full"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div className="flex-1">
            <div>Status:</div>
            <FormInput
              className="w-full"
              value={status}
              onChange={(e) => setStatus(e.currentTarget.value)}
            />
          </div>
        </div>

        <div>
          <div>Description:</div>
          <textarea
            ref={textRef}
            onChange={(e) => setProfile(e.currentTarget.value.replace(/\r?\n|\r/g, ''))}
            value={profile}
            className="resize-none p-4 focus:outline-none focus:border-2 focus:ring-0 focus:rounded-none w-full h-[150px] bg-screenBlack border text-xl"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProfileForm;
