import { FC } from 'react';
import useMachineStore from '../../../../../store';
import FormButton from '../../AdminMode/common/FormButton';
import Modal from '../../OnScreenModal';

interface MintedModalProps {
  open: boolean;
  onClose: () => void;
  switchModes: (direction: string, channel: boolean) => void;
}

const MintedModal: FC<MintedModalProps> = ({ open, children, onClose, switchModes }) => {
  const { duckFilters, setDuckFilters, setCurrentDuckId } = useMachineStore();

  const handleClick = () => {
    setDuckFilters({ ...duckFilters, custom: true });
    setCurrentDuckId(207);
    switchModes('prev', false);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      position={{ x: '0%', y: '0%' }}
      className="w-3/4 h-1/2"
      buttons={(
        <div className="absolute bottom-0 right-0 flex space-x-2">
          <FormButton label="Close" onClick={onClose} />
          <FormButton label="View Duck" onClick={handleClick} />
        </div>
      )}
    >
      <div className="mb-1 text-xl text-orange-300">SUCCESS! DUCK MINTED</div>
      <div
        className="cursor-pointer pixel-font-thin"
        onClick={handleClick}
      >
        Congratulations, your custom duck has been minted successfully!
      </div>
    </Modal>
  );
};

export default MintedModal;
