import { Suspense, useEffect, useState, useLayoutEffect } from "react";
import { Html } from "@react-three/drei";
import { useMachineStore } from "../../store";
import {
  colors,
} from "../../utils/constants";
import LayerPicker from "./LayerPicker";
import duckbill from "../../assets/duck-bill.png";
import "./index.scss";

let layers: any[] = [
  { label: "Head" },
  { label: "Bill", preset: duckbill, disabled: true },
  // {label:'Glasses'},
];

const DrawingTool: (props: any) => JSX.Element = (props: any) => {
  const DToolInst = useMachineStore((state) => state.DToolInst);
  const selectedColorIndex = useMachineStore(
    (state) => state.selectedColorIndex
  );
  const selectedLayerIndex = useMachineStore(
    (state) => state.selectedLayerIndex
  );
  const setSelectedTool = useMachineStore((state) => state.setSelectedTool);
  const historyButtonsState = useMachineStore(
    (state) => state.historyButtonsState
  );
  const setHistoryButtonsState = useMachineStore(
    (state) => state.setHistoryButtonsState
  );

  useEffect(() => {
    DToolInst.init(layers, setHistoryButtonsState);
    DToolInst.selectColor(colors[selectedColorIndex]);
    DToolInst.selectLayer(selectedLayerIndex);
    DToolInst.eraseCurrentLayer();
  }, []);

  return (
    <Html
      distanceFactor={2.5}
      position={props.isFront ? [0.0, 0.1, 0.0] : [0.0, -0.1, 0.0]}
      rotation={
        props.isFront
          ? [Math.PI / 2, Math.PI, Math.PI / 2]
          : [Math.PI / 2, -Math.PI * 2, Math.PI / 2]
      }
      transform
      occlude
    >
      <Suspense fallback={null}>
        <div className="DrawingTool">
          <canvas className="drawing-canvas" id="drawingtool_canvas"></canvas>
          <div className="bottom">
            <div
              className="btn"
              onClick={() => {
                DToolInst.eraseCurrentLayer();
              }}
            >
              clear
            </div>
            <div
              className={`btn ${!historyButtonsState[0] && "disabled"}`}
              onClick={() => {
                DToolInst.undoredo(-1);
              }}
            >
              undo
            </div>
            <div
              className={`btn ${!historyButtonsState[1] && "disabled"}`}
              onClick={() => {
                DToolInst.undoredo(1);
              }}
            >
              redo
            </div>
          </div>
          <div className="right">
            <div
              className="btn"
              onClick={() => {
                setSelectedTool(0);
                DToolInst.selectTool(0);
              }}
            >
              pencil
            </div>
            <div
              className="btn"
              onClick={() => {
                setSelectedTool(1);
                DToolInst.selectTool(1);
              }}
            >
              paint
            </div>
            <div
              className="btn"
              onClick={() => {
                DToolInst.selectColor(null);
              }}
            >
              eraser
            </div>
          </div>
        </div>
      </Suspense>
    </Html>
  );
};
export default DrawingTool;
