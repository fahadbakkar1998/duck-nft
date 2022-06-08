import React from 'react';
import { Modal } from 'react-responsive-modal';
import Duck from './Duck';
import ducks from '../../utils/duckData.json';
import useMobileStore from '../../store/mobileStore';
import './Ducks.scss';

const Ducks = (props) => {
  const mobileStore = useMobileStore((state) => state);
  const { isOpenDuckModal, setIsOpenDuckModal, curDuckId } = mobileStore;

  return (
    <div className="Ducks">
      {ducks.map((duck, index) => (
        <Duck {...duck} id={index} key={duck.webp} />
      ))}
      <Modal
        open={isOpenDuckModal}
        onClose={() => setIsOpenDuckModal(false)}
        center
      >
        <div className="Duck-modal">
          <img
            className="image"
            src={`data:image/webp;base64,${ducks[curDuckId].webp}`}
            alt=""
          />
          <div className="info">Duck Info</div>
        </div>
      </Modal>
    </div>
  );
};

export default Ducks;
