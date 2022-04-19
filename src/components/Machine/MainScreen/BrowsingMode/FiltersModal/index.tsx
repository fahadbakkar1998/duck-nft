
import { FC } from 'react';
import Modal from '../../Modal';

interface FiltersModalProps {  
  open: boolean;
  onClose: () => void;
}

/*
  Filters include:
    All Ducks
    Available Ducks
    Sold Ducks
    My Ducks
    Custom Ducks

  Display Options:
    Hide stuff
*/

interface FilterState {
  all: boolean;
  available: boolean;
  sold: boolean;
  mine: boolean;
  custom: boolean;
  hideUI: boolean;
}

interface CheckBoxProps {
  isChecked: boolean;
  onToggle: () => void;  
}

const CheckBox: FC<CheckBoxProps> = ({isChecked, onToggle}) => {
  return (
    <div 
      onClick={onToggle}    
      className={`
        bg-white aspect-square 
        w-6 cursor-pointer
        ${ isChecked ? 'opacity-100' : 'opacity-20'}
      `} 
    />    
  )
}

const FiltersModal: FC<FiltersModalProps> = ({open, children, onClose}) => {

  

  return (
    <Modal open={open} onClose={onClose}>
      <div className="border-b-4 border-dashed mb-4">Narrow Your Search</div>
      <div className="grid grid-cols-2 pixel-font gap-2">
        <div className="flex items-center">
          All Ducks
        </div>
        <div className="flex items-center justify-end">
          <CheckBox isChecked={false} onToggle={() => {}} />
        </div>
        <div className="flex items-center">
          All Ducks
        </div>
        <div className="flex items-center justify-end">
          <CheckBox isChecked={false} onToggle={() => {}} />
        </div>
        <div className="flex items-center">
          All Ducks
        </div>
        <div className="flex items-center justify-end">
          <CheckBox isChecked={false} onToggle={() => {}} />
        </div>
        <div className="flex items-center">
          All Ducks
        </div>
        <div className="flex items-center justify-end">
          <CheckBox isChecked={false} onToggle={() => {}} />
        </div>

      </div>





    </Modal>
  )
}

export default FiltersModal;