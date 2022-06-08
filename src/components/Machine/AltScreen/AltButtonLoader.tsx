import { FC, useEffect, useState } from 'react';
import { DuckIcon } from '../../common/SvgIcon';

const numCells = 5;

const DuckLoader: FC<{ on:boolean, direction: 'right' | 'left'}> = ({ on, direction }) => {
  return (
    <div className="relative w-full">
      { on && (
        <div className="animate-boing -mt-[4px]">
          <DuckIcon className="w-6 scale-x-[-1]" wrapperClassName="text-center flex justify-center" />
        </div>
      )}
      <div className="h-[20%] w-full absolute bottom-5 bg-black bg-opacity-40" />
    </div>
  );
};

const AltButtonLoader = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const newIndex = (index + 1) % numCells;
    setTimeout(() => setIndex(newIndex), 750);
  }, [index]);

  return (
    <div className="w-full h-full opacity-75 overflow-hidden p-1 px-2">
      <div className="lcd-font tracking-wide text-xs top-2 text-black font-bold mb-1">processing tx...</div>
      <div className="w-full h-full flex">
        { [...Array(numCells).keys()].map((_, i) => <DuckLoader direction="right" on={i === index} />) }
      </div>
    </div>
  );
};

export default AltButtonLoader;
