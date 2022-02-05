import { render } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import DuckCard from "../DuckCard/DuckCard";
import duckData from "../../utils/duck-data.json";
import Scrollbar from "smooth-scrollbar";
import "./Screen.scss";
import { useScreenStore } from "../store";
import { stringify } from "querystring";
import NumPad from "../Pad/Pad";
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

const Screen = () => {
  const [scroll, setScroll] = useState(Object);
  const [filter, setFilter] = useState(String);

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
    let scrollbar = Scrollbar.init(
      document.querySelector("#mainScreen")!,
      scrollOption
    );
    scrollbar.track.yAxis.element.remove();
    setScroll(scrollbar);
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
    <div className="Shopping">
      <div className="Screen">
        <div className="main">
          <div className="mainScreen scanlines" id="mainScreen">
            <div className="imgContainer">
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
          <div className="control">
            <Select
              className="dropbox"
              options={options}
              placeholder={"Filter By"}
              onChange={(event) => {
                updateFilterVal(event?.value);
              }}
            />
            <div className="buttons">
              <button
                className="gridButton"
                onClick={() => setCurrentGrid("3x")}
              >
                3x3
              </button>
              <button
                className="gridButton"
                onClick={() => setCurrentGrid("4x")}
              >
                4x4
              </button>
            </div>
          </div>
        </div>
        <div className="sideControl">
          <button className="sideButton" onClick={sideControlUp}></button>
          <button
            className="sideButton down"
            onClick={sideControlDown}
          ></button>
        </div>
      </div>
      <NumPad />
    </div>
  );
};

export default Screen;
