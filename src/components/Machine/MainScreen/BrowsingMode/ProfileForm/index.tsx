import { FC } from 'react';
import useMachineStore from '../../../../../store';
import Modal from '../../OnScreenModal';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ProfileForm: FC<Props> = ({ open, onClose }) => {
  const timeStamp = new Date();

  return (
    <Modal open={open} onClose={onClose}>
      <div className="mb-2 pb-2 border-b-2 border-dashed text-base text-center">Edit Profile</div>
      <div className="pixel-font-thin text-xl h-[250px] overflow-scroll">
        test
      </div>
    </Modal>
  );
};

export default ProfileForm;
