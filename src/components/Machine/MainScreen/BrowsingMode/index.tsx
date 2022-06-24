import KeyboardEventHandler from 'react-keyboard-event-handler';
import React, { useEffect, useState, useRef, UIEvent } from 'react';
import { findIndex } from 'lodash';
import { useEthers } from '@usedapp/core';
import DuckCard from '../../../DuckCard/DuckCard';
import useMachineStore from '../../../../store';
import './index.scss';
import FiltersModal from './FiltersModal';
import { useDucks } from '../../../../state/hooks';
import { useAccountChange, useFilteredDucks } from '../../../../hooks';
import { DuckData } from '../../../../types/types';
import CircleButton from '../../../common/CircleButton';
import filterIcon from '../../../../assets/img/icons/filter.svg';
import ScrollBar from './ScrollBar';

const directionToDuckIndex = (direction: string, currentDuckIndex: number) => {
  let nextDuckIndex = currentDuckIndex;
  switch (direction) {
    case 'up':
      nextDuckIndex -= 3;
      break;
    case 'down':
      nextDuckIndex += 3;
      break;
    case 'left':
      nextDuckIndex -= 1;
      break;
    case 'right':
      nextDuckIndex += 1;
      break;
    default: break;
  }
  return nextDuckIndex;
};

const BrowsingMode = () => {
  useAccountChange();
  const {
    isSwitchingModes,
    currentDuckId,
    setCurrentDuckId,
  } = useMachineStore();
  const [showFilters, setShowFilters] = useState(false);
  const { data: ducks } = useDucks();
  const filteredDucks = useFilteredDucks(ducks);
  const [scrollPosition, setScrollPosition] = useState(0.0);

  const selectDuckByDirection = (direction: string) => {
    const currentDuckIndex = findIndex(filteredDucks, (d) => d.id === currentDuckId);
    const nextDuckIndex = directionToDuckIndex(direction, currentDuckIndex);
    if (filteredDucks?.[nextDuckIndex]) {
      const nextDuckId = filteredDucks[nextDuckIndex].id;
      setCurrentDuckId(nextDuckId);
      document.getElementById(`item${nextDuckId}`)?.scrollIntoView({ block: 'nearest' });
    }
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const currScrollTop = e.currentTarget.scrollTop;
    const gridHeight = document.getElementById('grid')?.clientHeight;
    const screenHeight = document.getElementById('mainscreen')?.clientHeight;
    // @ts-ignore
    const currPosition = currScrollTop / (gridHeight - screenHeight);
    setScrollPosition(currPosition);
  };

  return (
    <>
      <KeyboardEventHandler
        handleKeys={['up', 'down', 'left', 'right']}
        onKeyEvent={(key) => selectDuckByDirection(key)}
      />
      <div
        className="main scanline"
      >
        <div
          id="mainscreen"
          onScroll={handleScroll}
          className="mainScreen overflow-scroll w-full border-gray-600 border-2"
        >
          <FiltersModal
            open={showFilters}
            onClose={() => { setShowFilters(false); }}
          />
          <div
            style={{ borderRadius: '15%' }}
            className="absolute z-30 w-full h-full pointer-events-none inner-shadow"
          />
          <div className="right">
            <ScrollBar position={scrollPosition} />
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
              <div id="grid" className="grid grid-cols-3 gap-1">
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
