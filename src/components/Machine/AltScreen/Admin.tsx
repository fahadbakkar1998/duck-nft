import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMachineStore from "../../../store";
import { MachineMode } from "../../../types/types";

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, right: 0, zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, left: 0, zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const Admin: () => JSX.Element = () => {
  const currentMode = useMachineStore((state) => state.currentMode);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div
      className={`Admin ${
        currentMode === MachineMode.Admin ? "fadeIn" : "fadeOut"
      }`}
    >
      <Slider {...settings}>
        {Array.from(Array(200).keys()).map((i) => (
          <img
            key={i}
            alt=""
            src={require(`../../../assets/img/ducks/crypto_duck_${i + 1}.svg`)}
          ></img>
        ))}
      </Slider>
    </div>
  );
};

export default Admin;
