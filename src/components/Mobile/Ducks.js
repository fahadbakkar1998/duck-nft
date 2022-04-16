import React from "react";
import Duck from "./Duck";
import ducks from "../../utils/duck-data.json";
import { Modal } from "react-responsive-modal";
import useMobileStore from "../../store/mobileStore";
import "./Ducks.scss";

const Ducks = (props) => {
  const mobileStore = useMobileStore((state) => state);
  const { isOpenDuckModal, setIsOpenDuckModal, curDuckId } = mobileStore;

  console.log(ducks[curDuckId].staticData.webp)

  return (
    <div className="Ducks">
      {ducks.map((duck, index) => (
        <Duck {...duck} id={index} key={index}></Duck>
      ))}
      <Modal
        open={isOpenDuckModal}
        onClose={() => setIsOpenDuckModal(false)}
        center
      >
        <div className="Duck-modal">
          <img
            className="image"
            src={`data:image/webp;base64,${ducks[curDuckId].staticData.webp}`}
            alt=""
          ></img>
          <div className="info">Duck Info</div>
        </div>
      </Modal>
    </div>
  );
};

export default Ducks;
