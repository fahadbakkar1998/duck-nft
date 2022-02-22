import { Suspense, useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import ColorPicker from "./color-picker";
import CanvasDraw from "./canvas-draw";
import LayerPicker from "./layer-picker";
import ToolSwitcher from "./tool-switcher";
import UndoRedo from "./undoredo";
import duckbill from "../../assets/duck-bill.png";
import "./index.scss";

const colors = [
  "#000000",
  "#464646",
  "#787878",
  "#b4b4b4",
  "#dcdcdc",
  "#ffffff",
  "#990030",
  "#9c5a3c",
  "#ed1c24",
  "#ffa3b1",
  "#ff7e00",
  "#e5aa7a",
  "#ffc20e",
  "#f5e49c",
  "#fff200",
  "#fff9bd",
  "#a8e61d",
  "#d3f9bc",
  "#22b14c",
  "#9dbb61",
  "#00b7ef",
  "#99d9ea",
  "#4d6df3",
  "#709ad1",
  "#2f3699",
  "#546d8e",
  "#6f3198",
  "#b5a5d5",
];

let layers: any[] = [
  { label: "Head" },
  { label: "Bill", preset: duckbill, disabled: true },
  // {label:'Glasses'},
];

const defaultLayerIndex = 0;
const defaultColorIndex = 0;

const DrawingTool: (props: any) => JSX.Element = (props: any) => {
  const [selectedLayerIndex, setSelectedLayerIndex] =
    useState(defaultLayerIndex);
  const [selectedColorIndex, setSelectedColorIndex] =
    useState(defaultColorIndex);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    colors[defaultLayerIndex]
  );
  const [selectedTool, setSelectedTool] = useState(0);
  const [historyButtonsState, setHistoryButtonsState] = useState([
    false,
    false,
  ]);
  function selectLayer(_selectedLayerIndex: number) {
    CanvasDraw.selectLayer(_selectedLayerIndex);
    setSelectedLayerIndex(_selectedLayerIndex);
  }
  function selectColor(index: number, _color: string | null) {
    setSelectedColor(_color);
    setSelectedColorIndex(index);
    CanvasDraw.selectColor(_color);
  }
  function selectTool(tool: number) {
    setSelectedTool(tool);

    CanvasDraw.selectTool(tool);
  }
  function DoUndoRedo(dir: number) {
    CanvasDraw.undoredo(dir);
  }
  function eraseLayer() {
    CanvasDraw.eraseCurrentLayer();
  }
  function noise() {
    CanvasDraw.noise();
  }
  function webp() {
    CanvasDraw.saveToWebp();
  }
  useEffect(() => {
    CanvasDraw.init(layers, setHistoryButtonsState);
    CanvasDraw.selectColor(colors[defaultColorIndex]);
    CanvasDraw.selectLayer(defaultLayerIndex);
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
            <div className="btn clear">cl</div>
            <div className="btn undo">un</div>
            <div className="btn redo">re</div>
          </div>
          <div className="right">
            <div className="btn pencil">pe</div>
            <div className="btn paint">pa</div>
            <div className="btn eraser">er</div>
          </div>

          {/* <div className="toolbar-old">
            <ColorPicker
              colors={colors}
              selectedColorIndex={selectedColorIndex}
              selectedColor={selectedColor}
              onSelected={selectColor}
              onEraseLayer={eraseLayer}
              onNoise={noise}
              onWebp={webp}
            />
            <LayerPicker
              layers={layers}
              selectedLayerIndex={selectedLayerIndex}
              onSelected={selectLayer}
            />
            <ToolSwitcher selectedTool={selectedTool} onSelected={selectTool} />
            <UndoRedo
              undoEnabled={historyButtonsState[0]}
              redoEnabled={historyButtonsState[1]}
              onPress={DoUndoRedo}
            />
          </div> */}
        </div>
      </Suspense>
    </Html>
  );
};
export default DrawingTool;
