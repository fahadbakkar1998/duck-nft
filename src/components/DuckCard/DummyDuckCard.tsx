import { FC } from 'react';
import { placeholderDuck } from '../../utils/constants';

const DummyDuckCard: FC = () => {
  return (
    <div className="relative group">
      <img alt="Tozzi Duck" src={`data:image/webp;base64,${placeholderDuck}`} />
    </div>
  );
};

export default DummyDuckCard;
