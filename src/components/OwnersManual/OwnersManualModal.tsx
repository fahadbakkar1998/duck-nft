/* eslint-disable react/prop-types */
import React, { FC } from 'react';
import { XIcon } from '../../icons';
import OwnersManual from '.';
import Modal from '../Machine/MainScreen/Modal';

interface ManualModalProps {
  className?: string;
  setModalIsOpen: (open: boolean) => void;
  modalIsOpen: boolean;
}

const CloseButton = ({ className, onClose }) => (
  <button type="button" onClick={onClose} className={className}>
    <XIcon className={'w-10 h-10cursor-pointer"'} />
  </button>
);

const ManualModal: FC<ManualModalProps> = (props) => {
  const { className, modalIsOpen, setModalIsOpen } = props;
  return (
    <div className={className}>
      <Modal
        open={modalIsOpen}
        closeButton={(
          <CloseButton
            className="fixed w-10 h-10 right-12 top-12 stroke-white"
            onClose={() => {
              setModalIsOpen(false);
              document.body.style.overflow = 'unset';
            }}
          />
)}
        onClose={() => {
          setModalIsOpen(false);
        }}
        className="fixed flex flex-col items-center justify-center w-full h-full left-0 top-0 z-[100000000000000] bg-black bg-opacity-75 backdrop-blur-sm"
      >
        <OwnersManual />
      </Modal>
    </div>
  );
};

export default ManualModal;
