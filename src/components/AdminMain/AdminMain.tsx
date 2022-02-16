import { render } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import "./style.scss";
import { Html } from "@react-three/drei";

const AdminMain = () => {
  const container = useRef(null);

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
    <div className="adminMain scanlines">
      <div className="title">Admin Stuff</div>
      <div className="tozzi">
        <div className="tozziMinting">
          Tozzi Duck Minting
          <div className="radioGroup">
            <div>
              <input
                id="radio-1"
                className="radio-custom"
                name="radio-group"
                type="radio"
              />
              <label htmlFor="radio-1" className="radio-custom-label"></label>
            </div>
            <div>
              <input
                id="radio-2"
                className="radio-custom"
                name="radio-group"
                type="radio"
              />
              <label htmlFor="radio-2" className="radio-custom-label"></label>
            </div>
          </div>
        </div>
        <div className="textGroup">
          Tozzi Duck Price
          <input type="text" className="priceInput"></input>
        </div>
      </div>

      <div className="customDuck">
        <div className="customMinting">
          Custom Duck Minting
          <div className="radioGroup">
            <div>
              <input
                id="radio-4"
                className="radio-custom"
                name="radio-group-2"
                type="radio"
              />
              <label htmlFor="radio-4" className="radio-custom-label"></label>
            </div>
            <div>
              <input
                id="radio-5"
                className="radio-custom"
                name="radio-group-2"
                type="radio"
              />
              <label htmlFor="radio-5" className="radio-custom-label"></label>
            </div>
          </div>
        </div>
        <div className="textGroup">
          Custom Duck Price
          <input type="text" className="priceInput"></input>
        </div>
        <div className="textGroup">
          Custom Duck Price
          <input type="text" className="priceInput"></input>
        </div>
        <button className="but"> Update </button>
      </div>
      <div className="balance">
        <div className="balance-text">Balance : 125ETH </div>
        <div className="balance-withdraw">
          <div>Withdraw :</div>
          <input type="text" className="priceInput"></input>
        </div>
       </div>
       <button className="but">Submit</button>
    </div>
  </Html>
  );
};

export default AdminMain;
