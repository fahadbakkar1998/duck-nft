import { FC } from 'react';
import { indexOf } from 'lodash';
import { PixelArrow } from '../../../../icons';
import Button from '../Button';
import useMachineStore from '../../../../store';
import { useDucks } from '../../../../state/hooks';

interface DuckNavButtonProps {
  onClick: () => void;
  disabled: boolean;
  flipped?: boolean;
}

const DuckNavButton: FC<DuckNavButtonProps> = ({ onClick, disabled = false, flipped = false }) => {
  return (
    <div
      className={`
        w-6 h-6 transition cursor-pointer relative
        ${disabled ? 'opacity-20' : 'opacity-75 hover:opacity-100'}
        ${flipped ? 'transform rotate-180' : ''}
      `}
      onClick={onClick}
    >
      <PixelArrow className="w-full h-full transform rotate-180" />
    </div>
  );
};

const BurnButton = () => {
  const {
    setOpenBurnForm,
    openBurnForm,
    setCurrentAdminDuckId,
    currentAdminDuckId,
  } = useMachineStore();

  const { data: ducksData = [], isLoading } = useDucks();
  const ducks = !isLoading ? ducksData.filter((d) => d.burnable) : [];
  const duck = ducks?.find((d) => d.id === currentAdminDuckId);
  const duckIndex = indexOf(ducks, duck);

  const handleClickNext = () => {
    const duckIndex = indexOf(ducks, duck);
    const nextDuckIndex = duckIndex + 1;
    if (nextDuckIndex < ducks.length) {
      setCurrentAdminDuckId(ducks[nextDuckIndex].id);
    }
  };

  const handleClickPrev = () => {
    const duckIndex = indexOf(ducks, duck);
    const prevDuckIndex = duckIndex - 1;
    if (prevDuckIndex >= 0) {
      setCurrentAdminDuckId(ducks[prevDuckIndex].id);
    }
  };

  const handleClickBurn = () => {
    if (duckIndex >= 0) {
      setOpenBurnForm(true);
    }
  };

  return !openBurnForm ? (
    <div className="flex justify-between items-center h-full w-full px-3">
      <DuckNavButton disabled={duckIndex <= 0} onClick={handleClickPrev} />
      <Button onClick={handleClickBurn}>
        <div
          className={`
            lcd-font text-black relative
            ${duckIndex >= 0 ? 'opacity-75 hover:font-bold' : 'opacity-30'}
          `}
        >
          burn
        </div>
      </Button>
      <DuckNavButton
        flipped
        disabled={duckIndex === ducks.length - 1}
        onClick={handleClickNext}
      />
    </div>
  ) : <div className="lcd-font h-full w-full flex justify-center items-center opacity-50">USE FORM --&gt;</div>;
};

export default BurnButton;
