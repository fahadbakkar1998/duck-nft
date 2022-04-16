import { useEffect, useState, useRef, FC } from "react";
import MessageModal from "./MessageModal";

const NotConnected = () => {
  const [duckIndex, setDuckIndex] = useState(1);
  const [flipper, setFlipper] = useState(true);
  const [status, setStatus] = useState<any>("Please connect your wallet.");
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setDuckIndex(Math.ceil(Math.random() * 200));
    setTimeout(() => isMounted && setFlipper(!flipper), 8000);
    return () => {
      isMounted = false;
    };
  }, [flipper]);

  return (
    <>
      <MessageModal
        open={modalOpen}
        message="Connect your wallet to get started."
        onClose={() => setModalOpen(false)}
      />
      <div className="z-50">
        <img
          style={{ width: "100%" }}
          alt={""}
          src={require(`../../../assets/img/ducks/crypto_duck_${duckIndex}.svg`)}
        />
      </div>
    </>
  );
};

export default NotConnected;
