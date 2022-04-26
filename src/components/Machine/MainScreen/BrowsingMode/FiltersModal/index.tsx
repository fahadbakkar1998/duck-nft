import useMachineStore from "../../../../../store";
import { FC } from "react";
import Modal from "../../Modal";

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
}

interface CheckBoxProps {
  isChecked: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

const CheckBox: FC<CheckBoxProps> = ({
  isChecked,
  disabled = false,
  onToggle,
}) => {
  return (
    <div
      onClick={disabled ? () => {} : onToggle}
      className={`
        ${disabled ? "opacity-20" : ""}
        border border-white aspect-square 
        w-4 cursor-pointer
        ${isChecked ? "bg-white" : ""}
      `}
    />
  );
};

const FiltersModal: FC<FiltersModalProps> = ({ open, children, onClose }) => {
  const { duckFilters, setDuckFilters } = useMachineStore();
  const { all, available, sold, mine, custom } = duckFilters;

  const toggleFilter = (filterName: string) => {
    if (duckFilters[filterName] !== undefined) {
      const newFilters = { ...duckFilters };
      newFilters[filterName] = !newFilters[filterName];
      setDuckFilters(newFilters);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="mb-4 border-b-4 border-dashed">DUCK FILTERS</div>
      <div className="grid w-full grid-cols-2 gap-2 text-base pixel-font">
        {/* <div className="flex items-center">All Ducks</div>
        <div className="flex items-center justify-end">
          <CheckBox isChecked={all} onToggle={() => toggleFilter("all")} />
        </div> */}
        <div className="flex items-center">Available</div>
        <div className="flex items-center justify-end">
          <CheckBox
            disabled={all}
            isChecked={available || all}
            onToggle={() => toggleFilter("available")}
          />
        </div>
        <div className="flex items-center">Sold</div>
        <div className="flex items-center justify-end">
          <CheckBox
            disabled={all}
            isChecked={sold || all}
            onToggle={() => toggleFilter("sold")}
          />
        </div>
        <div className="flex items-center">Custom Ducks</div>
        <div className="flex items-center justify-end">
          <CheckBox
            disabled={all}
            isChecked={custom || all}
            onToggle={() => toggleFilter("custom")}
          />
        </div>
        <div className="flex items-center">My Ducks</div>
        <div className="flex items-center justify-end ">
          <CheckBox
            disabled={all}
            isChecked={mine || all}
            onToggle={() => toggleFilter("mine")}
          />
        </div>

        {/* <div className="flex items-center justify-between w-full bg-red-200">
          <div>
            Hide UI
          </div>
          <CheckBox isChecked={false} onToggle={() => {}} />          
        </div> */}
      </div>
    </Modal>
  );
};

export default FiltersModal;
