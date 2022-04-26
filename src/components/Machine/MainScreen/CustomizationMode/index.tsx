import { Suspense, useEffect, useRef } from "react";
import { useMachineStore } from "../../../../store";
import { colors } from "../../../../utils/constants";
import duckbill from "../../../../assets/duck-bill.png";
import CircleButton from "../../../common/CircleButton";
import { MachineMode } from "../../../../utils/constants";
import pencilIcon from "../../../../assets/img/icons/pencil.svg";
import paintBucketIcon from "../../../../assets/img/icons/paintbucket.svg";
import eraserIcon from "../../../../assets/img/icons/eraser.svg";
import dropperIcon from "../../../../assets/img/icons/eye-dropper.svg";
import trashIcon from "../../../../assets/img/icons/trash.svg";
import undoIcon from "../../../../assets/img/icons/undo.svg";
import redoIcon from "../../../../assets/img/icons/redo.svg";
import cn from "classnames";
import "./index.scss";

const layers: Object[] = [
  { label: "Head" },
  { label: "Bill", preset: duckbill, disabled: true },
];

const DrawingTool: (props: any) => JSX.Element = (props: any) => {
  const drawingCanvas = useRef<HTMLCanvasElement>(null);
  const currentState = useMachineStore((state) => state);
  const {
    currentMode,
    DToolInst,
    selectedColorIndex,
    selectedLayerIndex,
    setSelectedTool,
    setHistoryButtonsState,
    selectedColor,
    setSelectedColor,
  } = currentState;

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
    DToolInst.disableDrawing = flag;
  };

  const onCanvasMouseDown = (e: any) => {
    const color = DToolInst.getColor(e);
    setSelectedColor(color);
    DToolInst.selectColor(color);
    toggleEyeDrop(false);
  };

  useEffect(() => {
    DToolInst.init(layers, setHistoryButtonsState);
    DToolInst.selectColor(colors[selectedColorIndex]);
    DToolInst.selectLayer(selectedLayerIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={null}>
      <div
        className={cn("DrawingTool relative", {
          active: currentMode === MachineMode.Customization,
        })}
      >
        <div className="absolute w-full h-full inner-shadow rounded-[15%] pointer-events-none" />
        <canvas
          className="drawing-canvas bg-black border-[#aba961]  border-[30px]"
          ref={drawingCanvas}
          id="drawingtool_canvas"
        />
        <div className="right">
          <CircleButton
            onClick={() => {
              setSelectedTool(0);
              DToolInst.selectTool(0);
              DToolInst.selectColor(selectedColor);
              drawingCanvas.current!.style.cursor =
                "url('/assets/images/pencil.png'), default";
            }}
            image={pencilIcon}
          />
          <CircleButton
            onClick={() => {
              setSelectedTool(1);
              DToolInst.selectTool(1);
              drawingCanvas.current!.style.cursor =
                "url('/assets/images/paintbucket.png'), default";
            }}
            image={paintBucketIcon}
          />
          <CircleButton
            onClick={() => {
              DToolInst.selectColor(null);
              drawingCanvas.current!.style.cursor =
                "url('/assets/images/eraser.png'), default";
            }}
            image={eraserIcon}
          />
          <CircleButton
            onClick={() => toggleEyeDrop(true)}
            image={dropperIcon}
          />
        </div>

        <div className="left">
          <CircleButton
            onClick={() => {
              DToolInst.eraseCurrentLayer();
            }}
            image={trashIcon}
          />
          <CircleButton
            onClick={() => {
              DToolInst.undoredo(-1);
            }}
            image={undoIcon}
          />

          <CircleButton
            onClick={() => {
              DToolInst.undoredo(1);
            }}
            image={redoIcon}
          />
          <CircleButton
            onClick={() => {}}
            image={redoIcon}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default DrawingTool;
