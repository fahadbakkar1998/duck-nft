import { Suspense, useEffect, useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { useMachineStore } from "../../../../store";
import { colors } from "../../../../utils/constants";
import duckbill from "../../../../assets/duck-bill.png";
import "./index.scss";
import CircleButton from "../../../common/CircleButton";
import cn from "classnames";

const layers: any[] = [
  { label: "Head" },
  { label: "Bill", preset: duckbill, disabled: true },
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
  const setHistoryButtonsState = useMachineStore(
    (state) => state.setHistoryButtonsState
  );
  const setSelectedColor = useMachineStore((state) => state.setSelectedColor);

  const toggleEyeDrop = (flag: boolean) => {
    drawingCanvas!.current!.style.cursor = flag
      ? "crosshair"
      : "url('/assets/images/pencil.png'), default";
    if (flag) {
      drawingCanvas!.current?.addEventListener("mousedown", onCanvasMouseDown);
    } else {
      drawingCanvas!.current?.removeEventListener(
        "mousedown",
        onCanvasMouseDown
      );
    }
    // @ts-ignore
    DToolInst.disableDrawing = flag;
  };

  const onCanvasMouseDown = (e: any) => {
    // @ts-ignore
    const color = DToolInst.getColor(e);
    setSelectedColor(color);
    DToolInst.selectColor(color);
    toggleEyeDrop(false);
  };

  useEffect(() => {
    console.log("DrawingTool useEffect");
    DToolInst.init(layers, setHistoryButtonsState);
    DToolInst.selectColor(colors[selectedColorIndex]);
    DToolInst.selectLayer(selectedLayerIndex);
  }, []);

  return (
      <Suspense fallback={null}>
        <div className={cn("DrawingTool relative", { active: props.isActive })}>
          <div className="absolute w-full h-full inner-shadow rounded-[15%] pointer-events-none" />
          <canvas
            className="drawing-canvas bg-black border-[#3f3f41] border-[30px]"
            ref={drawingCanvas}
            id="drawingtool_canvas"
          />
          <div className="left">
            <CircleButton onClick={() => toggleEyeDrop(true)} name="color" />
          </div>
          <div className="right">
            <CircleButton
              onClick={() => {
                setSelectedTool(0);
                DToolInst.selectTool(0);
                drawingCanvas.current!.style.cursor =
                  "url('/assets/images/pencil.png'), default";
              }}
              image="/assets/images/pencil.png"
            />
            <CircleButton
              onClick={() => {
                setSelectedTool(1);
                DToolInst.selectTool(1);
                drawingCanvas.current!.style.cursor =
                  "url('/assets/images/paintbucket.png'), default";
              }}
              image="/assets/images/paintbucket.png"
            />
            <CircleButton
              onClick={() => {
                DToolInst.selectColor(null);
                drawingCanvas.current!.style.cursor =
                  "url('/assets/images/eraser.png'), default";
              }}
              image="/assets/images/eraser.png"
            />
          </div>
          <div className="bottom space-x-8">
            <CircleButton
              onClick={() => {
                DToolInst.eraseCurrentLayer();
              }}
              name="clear"
            />
            <CircleButton
              onClick={() => {
                DToolInst.undoredo(-1);
              }}
              image="/assets/images/undo.png"
            />

            <CircleButton
              onClick={() => {
                DToolInst.undoredo(1);
              }}
              image="/assets/images/redo.png"
            />
          </div>
        </div>
      </Suspense>    
  );
};

export default DrawingTool;


