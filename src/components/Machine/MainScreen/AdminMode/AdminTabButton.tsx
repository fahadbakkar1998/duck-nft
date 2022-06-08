import { FC } from 'react';

interface AdminTabButtonProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const AdminTabButton: FC<AdminTabButtonProps> = ({ title, isActive, onClick }) => {
  return (
    <div
      className={`
        flex-1 uppercase bg-white cursor-pointer text-screenBlack
        ${isActive ? 'bg-opacity-100' : 'bg-opacity-20'}
      `}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default AdminTabButton;
