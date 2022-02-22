import "./Pad.scss";
// import { useScreenStore } from "../store";
import { useState } from "react";
const keyArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const NumPad = () => {
  const [current, setCurrent] = useState({ number: "" });

  // const currentDuck = useScreenStore((state) => state.currentDuck);

  // const updateCurrentDuck = useScreenStore((state) => state.updateCurrentDuck);

  // const setId = (val: string) => {
  //   const currentInfo = { ...current };
  //   currentInfo.number =
  //     currentInfo.number.length >= 3 ? val : currentInfo.number + val;
  //   setCurrent(currentInfo);
  // };

  // const select = () => {
  //   updateCurrentDuck(current);
  // };

  return (
    <>
      <div className="NumPad">
        {/* <div className="keycontainer">
          {keyArr.map((val) => (
            <button
              className="key "
              onClick={() => {
                setId(val.toString());
              }}
              key={val}
            >
              {val}
            </button>
          ))}
          <button className="key seletbutton" onClick={select}>
            Select
          </button>
        </div> */}
      </div>
    </>
  );
};

export default NumPad;
