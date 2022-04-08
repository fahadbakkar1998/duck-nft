import { Suspense, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import { useMachineStore } from "../../store";
import { colors } from "../../utils/constants";
import LayerPicker from "./LayerPicker";
import duckbill from "../../assets/duck-bill.png";
import "./index.scss";
import CircleButton from "../common/CircleButton";

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
          <div className="right">
            <CircleButton 
              onClick={() => {
                setSelectedTool(0);
                DToolInst.selectTool(0);
                drawingCanvas.current!.style.cursor =
                  "url('/assets/images/pencil.png'), default";
              }}
            />

            <CircleButton 
              onClick={() => {
                setSelectedTool(1);
                DToolInst.selectTool(1);
                drawingCanvas.current!.style.cursor =
                  "url('/assets/images/paintbucket.png'), default";
              }}
            />

            <CircleButton 
              onClick={() => {
                DToolInst.selectColor(null);
                drawingCanvas.current!.style.cursor =
                  "url('/assets/images/eraser.png'), default";
              }}
            />
                      
          </div>
          <div className="bottom space-x-8">
            <CircleButton
              
              onClick={() => {
                DToolInst.eraseCurrentLayer();
              }}
            />
            <CircleButton
              onClick={() => {
                DToolInst.undoredo(-1);
              }}                        
            />

            <CircleButton
              onClick={() => {
                DToolInst.undoredo(1);
              }}
            />                        
          </div>
        </div>
      </Suspense>
    </Html>
  );
};

export default DrawingTool;
