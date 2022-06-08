import React, { useState, useEffect, FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useMachineStore from '../../../store';
import { MachineMode } from '../../../utils/constants';
import { DuckData } from '../../../types/types';

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
  const { currentMode, ducks, setCurrentAdminDuckId } = useMachineStore();

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
    <div
      className={`Admin ${
        currentMode === MachineMode.Admin ? 'fadeIn' : 'fadeOut'
      }`}
    >
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
