import { useContractFunction } from '@usedapp/core';
import { utils } from 'ethers';
import { FC, useRef, useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { DuckData } from '../../../../../types/types';
import { contract } from '../../../../../utils/functions';
import useMachineStore from '../../../../../store';
import FormButton from '../../AdminMode/common/FormButton';
import FormInput from '../../AdminMode/common/FormInput';
import Modal from '../../OnScreenModal';
import { useTxNotifier } from '../../../../../hooks/transaction';
import { getMetadataAttribute } from '../../../../../utils/helpers';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ProfileForm: FC<Props> = ({ open, onClose }) => {
  const { currentDuckId, filteredDucks } = useMachineStore();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [profile, setProfile] = useState('');
  const { send, state } = useContractFunction(contract, 'setDuckProfile');

  useEffect(() => {
    const duck = filteredDucks.find((d) => d.id === currentDuckId);
    const status = duck?.metadata ? getMetadataAttribute(duck.metadata, 'Status') : '';
    setName(duck?.metadata?.name || '');
    setProfile(duck?.metadata?.description || '');
    setStatus(status || '');
  }, [currentDuckId, filteredDucks]);

  useTxNotifier(
    {
      mining: 'Updating duck profile',
      success: 'Settings! Profile updated',
    },
    state,
  );

  const handleSubmit = () => {
    send(
      currentDuckId,
      utils.formatBytes32String(name),
      utils.formatBytes32String(status),
      profile,
    );
    onClose();
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
        <div className="pixel-font text-xl text-orange-300">
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
