import { render } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import "./style.scss";
import { Html } from "@react-three/drei";

const AdminMain = (props: any) => {
  const container = useRef(null);

  return (
    <Html
      ref={container}
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
      <div className="AdminMain scanlines">
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
            <div className="price-container">
              <input type="text" className="price-input" />
              <div className="price-right">ETH</div>
            </div>
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
            <div className="price-container">
              <input type="text" className="price-input" />
              <div className="price-right">ETH</div>
            </div>
          </div>
          <div className="textGroup">
            Custom Duck Price
            <div className="price-container">
              <input type="text" className="price-input" />
              <div className="price-right">ETH</div>
            </div>
          </div>
          <div className="u-row">
            <button className="but">Update</button>
          </div>
        </div>
        <div className="balance">
          <div className="balance-text">Balance : 125ETH </div>
          <div className="balance-withdraw">
            <div>Withdraw :</div>
            <div className="price-container">
              <input type="text" className="price-input" />
              <div className="price-right">ETH</div>
            </div>
          </div>
        </div>
        <div className="u-row">
          <button className="but-submit">Submit</button>
        </div>
      </div>
    </Html>
  );
};

export default AdminMain;
