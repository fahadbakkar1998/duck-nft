import { useState, useEffect } from "react";
import useMachineStore from "../../store";
import "./CardImageSection.scss";





const Footer = () => {
  const address = useMachineStore((state) => state.address);
  const tozziDuckData = useMachineStore((state) => state.tozziDuckData);
  const [, setFilterTozziDuckData] = useState<any>(tozziDuckData);
  const [, setFilterCustomDuckData] = useState<any>([]);
  const setCurrentTozziDuckId = useMachineStore(
    (state) => state.setCurrentTozziDuckId
  );
  const customDuckData = useMachineStore((state) => state.customDuckData);
  const setCurrentCustomDuckId = useMachineStore(
    (state) => state.setCurrentCustomDuckId
  );
  
  useEffect(() => {
    setFilterTozziDuckData(tozziDuckData);
  }, [tozziDuckData]);

  return (
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
  )
}


export default Footer;