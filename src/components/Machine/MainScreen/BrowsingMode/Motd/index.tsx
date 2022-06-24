import { FC } from 'react';
import useMachineStore from '../../../../../store';
import Modal from '../../OnScreenModal';
import CheckBox from '../../CheckBox';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const Motd: FC<ModalProps> = ({ open, children, onClose }) => {
  // const { } = useMachineStore();
  const timeStamp = new Date();
  const motd = 'hey there';

  return (
    <Modal open={open} onClose={onClose}>
      <div className="mb-2 pb-2 border-b-2 border-dashed text-base text-center">MotD - {timeStamp.toLocaleDateString()}</div>
      <div className="pixel-font-thin text-xl h-[250px] overflow-scroll">
        {motd}
      </div>
    </Modal>
  );
};

export default Motd;
