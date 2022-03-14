import { useRef, useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import DuckCard from "../DuckCard/DuckCard";
import useMachineStore from "../../store";
import "./CardImageSection.scss";

const CardImageSection = (props: any) => {
  const mainScreen = useRef<HTMLDivElement>(null);
  const address = useMachineStore((state) => state.address);

  const tozziDuckData = useMachineStore((state) => state.tozziDuckData);
  const setCurrentTozziDuckId = useMachineStore(
    (state) => state.setCurrentTozziDuckId
  );

  const customDuckData = useMachineStore((state) => state.customDuckData);
  const setCurrentCustomDuckId = useMachineStore(
    (state) => state.setCurrentCustomDuckId
  );

  const [filterTozziDuckData, setFilterTozziDuckData] =
    useState<any>(tozziDuckData);
  const [filterCustomDuckData, setFilterCustomDuckData] = useState<any>([]);

  const setOverflow = (flag: any) => {
    flag
      ? (mainScreen.current!.style!.overflow = "auto")
      : (mainScreen.current!.style!.overflow = "hidden");
  };

  useEffect(() => {
    setFilterTozziDuckData(tozziDuckData);
  }, [tozziDuckData]);

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
            {filterTozziDuckData.map((item: any) => {
              let img = require(`../../assets/img/ducks/crypto_duck_${
                parseInt(item.id) + 1
              }.svg`);
              // console.log("image object: ", img);
              return <DuckCard key={item.id} img={img} data={item} />;
            })}
            {filterCustomDuckData.map((item: any) => {
              return (
                <DuckCard
                  key={item.id}
                  img={item.image}
                  data={item}
                  isCustom={true}
                />
              );
            })}
          </div>
        </div>
        <div className="footer">
          <div
            onClick={() => {
              setCurrentTozziDuckId(-1);
              setCurrentCustomDuckId(-1);
              setFilterTozziDuckData(tozziDuckData);
              tozziDuckData.length &&
                setCurrentTozziDuckId(tozziDuckData[0].id);
              setFilterCustomDuckData([]);
            }}
          >
            All
          </div>
          <div
            onClick={() => {
              setCurrentTozziDuckId(-1);
              setCurrentCustomDuckId(-1);
              const filterTozzi = tozziDuckData.filter((e) => !e.owner);
              // const filterCustom = customDuckData.filter((e) => !e.owner);
              setFilterTozziDuckData(filterTozzi);
              // setFilterCustomDuckData(filterCustom);
              setFilterCustomDuckData([]);
              // filterTozzi.length
              //   ? setCurrentTozziDuckId(filterTozzi[0].id)
              //   : filterCustom.length &&
              //     setCurrentCustomDuckId(filterCustom[0].id);
              filterTozzi.length && setCurrentTozziDuckId(filterTozzi[0].id);
            }}
          >
            Available
          </div>
          <div
            onClick={() => {
              setCurrentTozziDuckId(-1);
              setCurrentCustomDuckId(-1);
              const filterTozzi = tozziDuckData.filter((e) => !!e.owner);
              // const filterCustom = customDuckData.filter((e) => !!e.owner);
              setFilterTozziDuckData(filterTozzi);
              // setFilterCustomDuckData(filterCustom);
              setFilterCustomDuckData([]);
              // filterTozzi.length
              //   ? setCurrentTozziDuckId(filterTozzi[0].id)
              //   : filterCustom.length &&
              //     setCurrentCustomDuckId(filterCustom[0].id);
              filterTozzi.length && setCurrentTozziDuckId(filterTozzi[0].id);
            }}
          >
            Sold
          </div>
          <div
            onClick={() => {
              setCurrentTozziDuckId(-1);
              setCurrentCustomDuckId(-1);
              const filterTozzi = tozziDuckData.filter((e) => {
                const owner = e.owner && e.owner.toLowerCase();
                const me = address && address.toLocaleLowerCase();
                return owner === me;
              });
              const filterCustom = customDuckData.filter((e) => {
                const owner = e.owner && e.owner.toLowerCase();
                const me = address && address.toLocaleLowerCase();
                return owner === me;
              });
              setFilterTozziDuckData(filterTozzi);
              setFilterCustomDuckData(filterCustom);
              filterTozzi.length
                ? setCurrentTozziDuckId(filterTozzi[0].id)
                : filterCustom.length &&
                  setCurrentCustomDuckId(filterCustom[0].id);
            }}
          >
            My Ducks
          </div>
          <div
            onClick={() => {
              setCurrentTozziDuckId(-1);
              setCurrentCustomDuckId(-1);
              setFilterTozziDuckData([]);
              setFilterCustomDuckData(customDuckData);
              customDuckData.length &&
                setCurrentCustomDuckId(customDuckData[0].id);
            }}
          >
            Custom
          </div>
        </div>
      </div>
    </Html>
  );
};

export default CardImageSection;
