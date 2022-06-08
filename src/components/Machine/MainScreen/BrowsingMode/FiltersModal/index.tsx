import { FC } from 'react';
import useMachineStore from '../../../../../store';
import Modal from '../../OnScreenModal';
import CheckBox from '../../CheckBox';

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
}

const FiltersModal: FC<FiltersModalProps> = ({ open, children, onClose }) => {
  const { duckFilters, setDuckFilters, showAvailabilityOnDuckCards, setShowAvailabilityOnDuckCards, showDuckIdOnDuckCards, setShowDuckIdOnDuckCards } = useMachineStore();
  const { sold, available, mine, custom } = duckFilters;

  const toggleFilter = (filterName: string) => {
    if (duckFilters[filterName] !== undefined) {
      const newFilters = { ...duckFilters };
      newFilters[filterName] = !newFilters[filterName];
      setDuckFilters(newFilters);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="mb-2 pb-2 border-b-2 border-dashed text-base">DUCK FILTERS</div>
      <div className="grid w-full grid-cols-2 text-base pixel-font">
        <div className="flex items-center pixel-font-thin text-2xl">Available</div>
        <div className="flex items-center justify-end">
          <CheckBox
            isChecked={available}
            onToggle={() => toggleFilter('available')}
          />
        </div>
        <div className="flex items-center pixel-font-thin text-2xl">Sold</div>
        <div className="flex items-center justify-end">
          <CheckBox
            isChecked={sold}
            onToggle={() => toggleFilter('sold')}
          />
        </div>
        <div className="flex items-center pixel-font-thin text-2xl">Custom Ducks</div>
        <div className="flex items-center justify-end">
          <CheckBox
            isChecked={custom}
            onToggle={() => toggleFilter('custom')}
          />
        </div>
        <div className="flex items-center pixel-font-thin text-2xl">My Ducks</div>
        <div className="flex items-center justify-end ">
          <CheckBox
            isChecked={mine}
            onToggle={() => toggleFilter('mine')}
          />
        </div>
      </div>
      <div className="mb-2 mt-4 pb-2 border-b-2 border-dashed text-base">UI OPTIONS</div>
      <div className="grid w-full grid-cols-2  text-base pixel-font">

        <div className="flex items-center pixel-font-thin text-2xl">Show Duck ID</div>
        <div className="flex items-center justify-end">
          <CheckBox
            isChecked={showDuckIdOnDuckCards}
            onToggle={() => setShowDuckIdOnDuckCards(!showDuckIdOnDuckCards)}
          />
        </div>
        <div className="flex items-center pixel-font-thin text-2xl">Show Sold Status</div>
        <div className="flex items-center justify-end">
          <CheckBox
            isChecked={showAvailabilityOnDuckCards}
            onToggle={() => setShowAvailabilityOnDuckCards(!showAvailabilityOnDuckCards)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default FiltersModal;
