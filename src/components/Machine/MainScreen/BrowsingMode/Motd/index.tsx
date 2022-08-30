import { FC } from 'react';
import useMachineStore from '../../../../../store';
import Modal from '../../OnScreenModal';
import CheckBox from '../../CheckBox';
import { Motd } from '../../../../../types/types';

interface MotdProps {
  open: boolean;
  motd: Motd;
  onClose: () => void;
}

const MotdModal: FC<MotdProps> = ({ open, motd, onClose }) => {
  // const { } = useMachineStore();
  const timeStamp = new Date();

  return (
    <Modal open={open} onClose={onClose}>
      <div className="pixel-font-thin text-2xl flex items-center text-center  overflow-scroll">
        <div>
          <div className="m-auto mb-1 pb-1 pixel-font text-lg text-center">MotD - {motd?.posted}</div>
          <div>{motd?.message}</div>
        </div>
      </div>
    </Modal>
  );
};

export default MotdModal;
