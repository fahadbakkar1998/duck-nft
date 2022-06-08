/* eslint-disable react/no-unused-prop-types */
import { FC } from 'react';
import './Duck.scss';
import 'react-responsive-modal/styles.css';
import useMobileStore from '../../store/mobileStore';

interface DuckProps {
  id: number;
  webp: string;
}

const Duck:FC <DuckProps> = (item) => {
  const mobileStore = useMobileStore((state) => state);
  const { setIsOpenDuckModal, setCurDuckId } = mobileStore;

  return (
    <div className="Duck">
      <img
        className="duck"
        onClick={() => {
          setCurDuckId(item.id);
          setIsOpenDuckModal(true);
        }}
        src={`data:image/webp;base64,${item.webp}`}
        alt=""
      />
    </div>
  );
};

export default Duck;
