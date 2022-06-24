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
      <div className="mb-2 pb-2 border-b-2 border-dashed text-base text-center">MotD - {motd?.posted}</div>
      <div className="pixel-font-thin text-xl h-[250px] overflow-scroll">
        {motd?.message}
      </div>
    </Modal>
  );
};

export default MotdModal;
