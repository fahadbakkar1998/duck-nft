import React, { useState, useEffect, FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useMachineStore from '../../../store';
import { MachineMode } from '../../../utils/constants';
import { DuckData } from '../../../types/types';
import { useDucks } from '../../../state/hooks';

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        right: 0,
        zIndex: 1,
        backgroundColor: 'grey',
        borderRadius: '100px',
      }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        left: 0,
        zIndex: 1,
        backgroundColor: 'grey',
        borderRadius: '100px',
      }}
      onClick={onClick}
    />
  );
};

const Admin: FC = () => {
  const { currentMode, setCurrentAdminDuckId } = useMachineStore();
  const { data: ducksData = [], isLoading } = useDucks();
  const ducks = !isLoading ? ducksData : [];

  const [sortedCustomDuckData, setSortedCustomDuckData] = useState<
    Array<DuckData>
  >([]);

  useEffect(() => {
    const SCDD = ducks
      .filter((e) => e.isCustom)
      .sort((a, b) => a.hatched - b.hatched);
    setSortedCustomDuckData(SCDD);
    if (SCDD.length) {
      setCurrentAdminDuckId(SCDD[0].id);
    }
  }, [ducks, setCurrentAdminDuckId]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (currentSlide: any) => {
      setCurrentAdminDuckId(sortedCustomDuckData[currentSlide].id);
    },
  };

  return (
    <div className="absolute z-10 h-full w-full">
      <div
        className="
          pointer-events-none
          absolute bottom-0 right-0 px-4 py-2 rounded-l-md border-white border-2 shadow-md  pixel-font z-20 border-r-0 border-b-0
          bg-orange-500
        "
      >
        DUCK REVIEW
      </div>
      <Slider {...settings}>
        {React.Children.toArray(
          sortedCustomDuckData.map((duck: DuckData, i: number) => (
            <div className="slider-container">
              <img className="slider-image" key={duck.webp} alt="" src={duck.webp} />
              <div className="slider-content">
                <div className="slider-description">{duck.hatched}s</div>
              </div>
            </div>
          )),
        )}
      </Slider>
    </div>
  );
};

export default Admin;
