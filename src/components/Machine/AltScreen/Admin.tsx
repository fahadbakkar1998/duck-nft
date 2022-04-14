import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMachineStore from "../../../store";
import { MachineMode } from "../../../utils/constants";
import React, { useState, useEffect } from "react";

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        right: 0,
        zIndex: 1,
        backgroundColor: "black",
        borderRadius: "100px",
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
        backgroundColor: "black",
        borderRadius: "100px",
      }}
      onClick={onClick}
    />
  );
};

const Admin: () => JSX.Element = () => {
  const currentMode = useMachineStore((state) => state.currentMode);
  const customDuckData = useMachineStore((state) => state.customDuckData);
  const setCurrentAdminDuckId = useMachineStore(
    (state) => state.setCurrentAdminDuckId
  );
  const [sortedCustomDuckData, setSortedCustomDuckData] = useState<any>([]);

  useEffect(() => {
    const SCDD = customDuckData.sort(
      (a, b) => a.restTimestamp - b.restTimestamp
    );
    // console.log(SCDD);
    setSortedCustomDuckData(SCDD);
    SCDD.length && setCurrentAdminDuckId(SCDD[0].id);
  }, [customDuckData, setCurrentAdminDuckId]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (currentSlide) => {
      setCurrentAdminDuckId(sortedCustomDuckData[currentSlide].id);
    },
  };

  return (
    <div
      className={`Admin ${
        currentMode === MachineMode.Admin ? "fadeIn" : "fadeOut"
      }`}
    >
      {React.Children.toArray(
        <Slider {...settings}>
          {sortedCustomDuckData.map((e: any, i: number) => (
            <div className="slider-container">
              <img className="slider-image" key={i} alt="" src={e.image}></img>
              <div className="slider-content">
                <div className="slider-description">{e.restTimestamp}s</div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Admin;
