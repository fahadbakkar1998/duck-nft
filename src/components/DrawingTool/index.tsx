import { Suspense, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import { useMachineStore } from "../../store";
import { colors } from "../../utils/constants";
import LayerPicker from "./LayerPicker";
import duckbill from "../../assets/duck-bill.png";
import "./index.scss";

const layers: any[] = [
  { label: "Head" },
  { label: "Bill", preset: duckbill, disabled: true },
  // {label:'Glasses'},
];

const DrawingTool: (props: any) => JSX.Element = (props: any) => {
  const drawingCanvas = useRef<HTMLCanvasElement>(null);
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
          <canvas
            className="drawing-canvas"
            ref={drawingCanvas}
            id="drawingtool_canvas"
          ></canvas>
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
              <img className="btn-img" alt="" src="/assets/images/undo.png" />
            </div>
            <div
              className={`btn ${!historyButtonsState[1] && "disabled"}`}
              onClick={() => {
                DToolInst.undoredo(1);
              }}
            >
              <img className="btn-img" alt="" src="/assets/images/redo.png" />
            </div>
          </div>
          <div className="right">
            <div
              className="btn"
              onClick={() => {
                setSelectedTool(0);
                DToolInst.selectTool(0);
                drawingCanvas.current!.style.cursor =
                  "url('/assets/images/pencil.png'), default";
              }}
            >
              <img className="btn-img" alt="" src="/assets/images/pencil.png" />
            </div>
            <div
              className="btn"
              onClick={() => {
                setSelectedTool(1);
                DToolInst.selectTool(1);
                drawingCanvas.current!.style.cursor =
                  "url('/assets/images/paintbucket.png'), default";
              }}
            >
              <img
                className="btn-img"
                alt=""
                src="/assets/images/paintbucket.png"
              />
            </div>
            <div
              className="btn"
              onClick={() => {
                DToolInst.selectColor(null);
                drawingCanvas.current!.style.cursor =
                  "url('/assets/images/eraser.png'), default";
              }}
            >
              <img className="btn-img" alt="" src="/assets/images/eraser.png" />
            </div>
          </div>
        </div>
      </Suspense>
    </Html>
  );
};

export default DrawingTool;
