import { useRef, useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import DuckCard from "../DuckCard/DuckCard";
import useMachineStore from "../../store";
import "./style.scss";

const CardImageSection = (props: any) => {
  const mainScreen = useRef<HTMLDivElement>(null);
  const duckData = useMachineStore((state) => state.duckData);
  const address = useMachineStore((state) => state.address);
  const setCurrentDuckId = useMachineStore((state) => state.setCurrentDuckId);
  const [filterDuckData, setFilterDuckData] = useState<any>(duckData);

  const setOverflow = (flag: any) => {
    flag
      ? (mainScreen.current!.style!.overflow = "auto")
      : (mainScreen.current!.style!.overflow = "hidden");
  };

  useEffect(() => {
    setFilterDuckData(duckData);
  }, [duckData]);

  return (
    <Html
      style={{ pointerEvents: "auto" }}
      distanceFactor={2.4}
      position={props.isFront ? [0.0, 0.1, 0.0] : [0.0, -0.1, 0.0]}
      rotation={
        props.isFront
          ? [Math.PI / 2, Math.PI, Math.PI / 2]
          : [Math.PI / 2, -Math.PI * 2, Math.PI / 2]
      }
      transform
      occlude
    >
      <div className="main">
        <div
          className="mainScreen"
          ref={mainScreen}
          id="mainScreen"
          onMouseEnter={() => setOverflow(true)}
          onMouseLeave={() => setOverflow(false)}
        >
          <div className="imgContainer scanlines">
            {filterDuckData.map((item: any, index: any) => {
              let img = require(`../../assets/img/ducks/crypto_duck_${
                parseInt(item.id) + 1
              }.svg`);
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
        <div className="footer">
          <div
            onClick={() => {
              setFilterDuckData(duckData);
              setCurrentDuckId(duckData[0].id);
            }}
          >
            All
          </div>
          <div
            onClick={() => {
              const filter = duckData.filter((e) => !e.owner);
              setFilterDuckData(filter);
              filter.length && setCurrentDuckId(filter[0].id);
            }}
          >
            Available
          </div>
          <div
            onClick={() => {
              const filter = duckData.filter((e) => e.owner);
              setFilterDuckData(filter);
              filter.length && setCurrentDuckId(filter[0].id);
            }}
          >
            Sold
          </div>
          <div
            onClick={() => {
              const filter = duckData.filter((e) => {
                const owner = e.owner && e.owner.toLowerCase();
                const me = address && address.toLocaleLowerCase();
                return owner === me;
              });
              setFilterDuckData(filter);
              filter.length && setCurrentDuckId(filter[0].id);
            }}
          >
            My Ducks
          </div>
        </div>
      </div>
    </Html>
  );
};

export default CardImageSection;
