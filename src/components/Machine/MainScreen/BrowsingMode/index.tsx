import KeyboardEventHandler from 'react-keyboard-event-handler';
import React, { useEffect, useState } from 'react';
import DuckCard from '../../../DuckCard/DuckCard';
import useMachineStore from '../../../../store';
import './index.scss';
import FiltersModal from './FiltersModal';
import { useDucks } from '../../../../state/hooks';
import { useFilteredDucks } from '../../../../hooks';
import { DuckData } from '../../../../types/types';
import CircleButton from '../../../common/CircleButton';
import filterIcon from '../../../../assets/img/icons/filter.svg';

const directionToDuckId = (direction: string, currentDuckId: number) => {
  let nextDuckId = currentDuckId;
  switch (direction) {
    case 'up':
      nextDuckId -= 3;
      break;
    case 'down':
      nextDuckId += 3;
      break;
    case 'left':
      nextDuckId -= 1;
      break;
    case 'right':
      nextDuckId += 1;
      break;
    default: break;
  }
  return nextDuckId;
};

const BrowsingMode = () => {
  const {
    isSwitchingModes,
    currentDuckId,
    setCurrentDuckId,
  } = useMachineStore();
  const [showFilters, setShowFilters] = useState(false);
  const { data: ducks } = useDucks();
  const filteredDucks = useFilteredDucks(ducks);

  useEffect(() => {
    document.getElementById(`item${filteredDucks[currentDuckId]?.id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [currentDuckId]);

  const selectDuckByDirection = (direction: string) => {
    const nextDuck = directionToDuckId(direction, currentDuckId);
    if (ducks?.[nextDuck]) setCurrentDuckId(nextDuck);
  };

  // if (isSwitchingModes) {
  //   return (
  //     <div
  //       className="main scanline"
  //     >
  //       <div className="mainScreen w-full border-gray-600 border-2 overflow-hidden">
  //         <div className="mt-24  scale-[1.8]  opacity-100 overflow-hidden">
  //           <video
  //             id="alt-static"
  //             playsInline
  //             autoPlay
  //             muted
  //             loop
  //             src="/assets/video/static.mp4"
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <KeyboardEventHandler
        handleKeys={['up', 'down', 'left', 'right']}
        onKeyEvent={(key) => selectDuckByDirection(key)}
      />
      <div
        className="main scanline"
      >
        <div className="mainScreen overflow-scroll w-full border-gray-600 border-2">
          <FiltersModal
            open={showFilters}
            onClose={() => { setShowFilters(false); }}
          />
          <div
            style={{ borderRadius: '15%' }}
            className="absolute z-30 w-full h-full pointer-events-none inner-shadow"
          />
          <div className="right">
            <CircleButton
              onClick={() => {
                setShowFilters(!showFilters);
              }}
              image={filterIcon}
            />
          </div>
          {/* DUCK GRID */}
          { !isSwitchingModes && (
            <div className="relative w-full h-full duck-grid">
              <div className="grid grid-cols-3 gap-1">
                {React.Children.toArray(
                  filteredDucks.map((item: DuckData) => {
                    return <DuckCard {...item} />;
                  }),
                )}
              </div>
            </div>
          )}
          { isSwitchingModes && (
            <div className="mt-24  scale-[1.8]  opacity-100 overflow-hidden">
              <video
                id="alt-static"
                playsInline
                autoPlay
                muted
                loop
                src="/assets/video/static.mp4"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BrowsingMode;
