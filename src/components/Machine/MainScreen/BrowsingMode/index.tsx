/* eslint-disable no-plusplus */
import KeyboardEventHandler from 'react-keyboard-event-handler';
import React, { useState, UIEvent, useEffect, ReactNode } from 'react';
import useSound from 'use-sound';
import { findIndex } from 'lodash';
import DuckCard from '../../../DuckCard/DuckCard';
import useMachineStore from '../../../../store';
import './index.scss';
import FiltersModal from './FiltersModal';
import { useMachineState } from '../../../../state/hooks';
import { DuckData } from '../../../../types/types';
import CircleButton from '../../../common/CircleButton';
import filterIcon from '../../../../assets/img/icons/filter.svg';
import ScrollBar from './ScrollBar';
import Motd from './Motd';
import ProfileForm from './ProfileForm';
// @ts-ignore
import tv from '../../../../assets/audio/tv.mp3';
import DummyDuckCard from '../../../DuckCard/DummyDuckCard';

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

const renderDummies = (n: number) => {
  const dummies: Array<ReactNode> = [];
  for (let i = 0; i < n; i++) {
    dummies.push(<DummyDuckCard key={`dummy-${i}`} />);
  }
  return dummies;
};

const BrowsingMode = () => {
  const {
    isSwitchingModes,
    currentDuckId,
    setCurrentDuckId,
    showMotd,
    setShowMotd,
    showProfileForm,
    setShowProfileForm,
    filteredDucks,
  } = useMachineStore();

  const [showFilters, setShowFilters] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0.0);
  const { data: machineState } = useMachineState();
  const [play] = useSound(tv, { volume: 0.5 });
  const dummyCount = filteredDucks.length % 3 === 0 ? 0 : 3 - (filteredDucks.length % 3);

  const selectDuckByDirection = (direction: string) => {
    const currentDuckIndex = findIndex(filteredDucks, (d) => d.id === currentDuckId);
    const nextDuckIndex = directionToDuckIndex(direction, currentDuckIndex);
    if (filteredDucks?.[nextDuckIndex]) {
      play();
      const nextDuckId = filteredDucks[nextDuckIndex].id;
      setCurrentDuckId(nextDuckId);
      document.getElementById(`item${nextDuckId}`)?.scrollIntoView({ block: 'nearest' });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const duck = document.getElementById(`item${currentDuckId}`);
      if (duck) {
        duck.scrollIntoView({ block: 'nearest' });
      }
    }, 320);
  }, [filteredDucks]);

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
      <div className="main">
        <div
          id="mainscreen"
          onScroll={handleScroll}
          className="mainScreen overflow-scroll w-full border-gray-600 border-2"
        >
          <ProfileForm
            open={showProfileForm}
            onClose={() => setShowProfileForm(false)}
          />
          <Motd
            open={!!(showMotd && machineState?.motd?.message)}
            motd={machineState?.motd || {}}
            onClose={() => setShowMotd(false)}
          />
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
                {renderDummies(dummyCount)}
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
