import { render } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import DuckCard from "../DuckCard/DuckCard";
import duckData from "../../utils/duck-data.json";
import Scrollbar from "smooth-scrollbar";
import "./style.scss";
import { useScreenStore } from "../store";
import { stringify } from "querystring";
import NumPad from "../Pad/Pad";
import { Html } from "@react-three/drei";
const options = [
  { value: "all", label: "All" },
  { value: "available", label: "Available (not sold)" },
  { value: "sold", label: "Sold" },
  { value: "myDuck", label: "My Ducks" },
  { value: "custom", label: "Custom" },
];
const scrollOption = {
  speed: 0.5,
  damping: 0.01,
  renderByPixels: true,
  // continuousScrolling : true
};

const CardImageSection = () => {
  const [scroll, setScroll] = useState(Object);
  const [filter, setFilter] = useState(String);
  const container = useRef(null);

  const currentDuck = useScreenStore((state) => state.currentDuck);

  const setCurrentGrid = useScreenStore((state) => state.updateGridRow);

  const updateFilterVal = useScreenStore((state) => state.updateFilterVal);

  const gridRow = useScreenStore((state) => state.gridRow);

  const sideControlUp = (direction: any) => {
    const pos = scroll.offset;
    scroll.scrollTo(0, pos.y - 200, 1000);
  };
  const sideControlDown = (direction: any) => {
    const pos = scroll.offset;
    scroll.scrollTo(0, pos.y + 200, 1000);
  };

  useEffect(() => {
    // let scrollbar = Scrollbar.init(
    //   document.querySelector("#mainScreen")!,
    //   scrollOption
    // );
    // scrollbar.track.yAxis.element.remove();
    // setScroll(scrollbar);
  });

  useEffect(() => {
    let pos = Math.ceil(currentDuck.number / 3);
    let pos2 = Math.ceil(currentDuck.number / 4);

    if (Object.keys(scroll).length !== 0) {
      if (gridRow == "3x") {
        if (pos > 3) {
          scroll.scrollTo(0, (scroll.limit.y / 200) * 3 * pos, 1000);
        } else scroll.scrollTo(0, 0, 1000);
      } else if (gridRow == "4x") {
        if (pos > 4) {
          scroll.scrollTo(0, (scroll.limit.y / 200) * 4 * pos2, 1000);
        } else scroll.scrollTo(0, 0, 1000);
      }
    }
  }, [currentDuck]);

  return (
    <Html 
    ref={container}
    style={{pointerEvents: 'auto'}}
    distanceFactor={ 2.4 }
    position={[ 0.0, 0.1, 0.0 ]}
    rotation={[ Math.PI/2, Math.PI, Math.PI/2]}
    transform
    occlude
    >
    <div className="main">
        <div className="mainScreen " id="mainScreen">
        <div className="imgContainer scanlines">
            {duckData.map((item: any, index: any) => {
            let img = require("../../assets/img/ducks/crypto_duck_" +
                item.id +
                ".svg");
            // let img = require(item.img);
            return (
                <DuckCard
                key={item.id}
                img={img}
                number={item.id}
                attribute={item}
                />
            );
            })}
        </div>
        </div>
    </div>
   </Html>
  );
};

export default CardImageSection;
