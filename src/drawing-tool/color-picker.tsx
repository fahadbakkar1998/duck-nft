import { useState, Suspense } from "react";
import { HexColorPicker } from "react-colorful";
import { Canvas, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Cylinder } from "@react-three/drei";

type ColorPickerProps = {
  colors: string[];
  selectedColorIndex: number;
  onSelected: any;
  onEraseLayer: any;
  onNoise: any;
  onWebp: any;
  selectedColor: string | null;
};
type ColorButtonProps = {
  color?: string;
  onSelected: any;
  selectedColorIndex: number;
  index: number;
};
type CurrentColorProps = {
  selectedColor: string | null;
  onSelected: any;
};

const ColorButton: ({
  color,
  index,
  selectedColorIndex,
  onSelected,
}: ColorButtonProps) => JSX.Element = ({
  color,
  index,
  selectedColorIndex,
  onSelected,
}) => {
  return (
    <div
      className={
        "color-button " + (selectedColorIndex === index ? "selected " : "")
      }
      onClick={() => onSelected(index, color)}
      style={{ backgroundColor: color }}
    ></div>
  );
};
const CurrentColor: ({
  selectedColor,
  onSelected,
}: CurrentColorProps) => JSX.Element = ({ selectedColor, onSelected }) => {
  const bgcolor = selectedColor || "#FFFFFF";
  const [hexPickerVisible, setHexPickerVisible] = useState(false);

  const handleCloseHexPicker: any = () => {
    setHexPickerVisible(false);
    document.removeEventListener("mouseup", handleCloseHexPicker);
  };
  const handelClosePrevent: any = (e: any) => {
    e.stopPropagation();
  };

  function handleShowHexPicker() {
    setHexPickerVisible(true);
    setTimeout(() => {
      document
        .getElementById("hexcolorpicker")
        ?.addEventListener("mouseup", handelClosePrevent);
    }, 100);

    document.addEventListener("mouseup", handleCloseHexPicker);
  }
  function handleChange(color: string) {
    onSelected(-1, color);
  }
  return hexPickerVisible ? (
    <div className="current-color" style={{ backgroundColor: bgcolor }}>
      <div style={{ transform: "scale(2)" }} id="hexcolorpicker">
        <HexColorPicker color={bgcolor} onChange={handleChange} />
      </div>
    </div>
  ) : (
    <div
      className="current-color"
      style={{ backgroundColor: bgcolor }}
      onClick={handleShowHexPicker}
    ></div>
  );
};

const ColorPicker: ({
  colors,
  selectedColorIndex,
  selectedColor,
  onSelected,
  onEraseLayer,
  onNoise,
  onWebp,
}: ColorPickerProps) => JSX.Element = ({
  colors,
  selectedColorIndex,
  selectedColor,
  onSelected,
  onEraseLayer,
  onNoise,
  onWebp,
}) => {
  const gltfEraser = useLoader(GLTFLoader, "assets/models/EraseButton.glb");
  const gltfClear = useLoader(GLTFLoader, "assets/models/ClearButton.glb");

  return (
    <div className="color-picker">
      <div className="color-bar">
        {colors.map((color: string, i) => {
          return (
            <ColorButton
              color={color}
              index={i}
              selectedColorIndex={selectedColorIndex}
              key={i}
              onSelected={onSelected}
            />
          );
        })}
      </div>
      <div className="color-extra">
        <CurrentColor
          selectedColor={selectedColor}
          onSelected={onSelected}
        ></CurrentColor>
        <Canvas
          orthographic
          camera={{ zoom: 115, position: [0, 0, 100] }}
          shadows
        >
          <Suspense fallback={null}>
            {/* <Cylinder args={[1.8, 1.8, 0.1, 50]} rotation={[0, 0, Math.PI / 2]}>
              <meshBasicMaterial attach="material" color="#6C6C6C" />
            </Cylinder> */}
            {/* <primitive
              object={gltfEraser.scene}
              scale={[100, 100, 100]}
              rotation={[0, 0, Math.PI / 2]}
              position={[0, 0, 0]}
            ></primitive> */}
          </Suspense>
        </Canvas>
        <div className="eraser" onClick={() => onSelected(-1, null)}>
          Eraser
        </div>
        <div className="clear" onClick={onEraseLayer}>
          Clear
        </div>
        <div className="savewebp" onClick={onWebp}>
          Export Webp
        </div>
      </div>
    </div>
  );
};
export default ColorPicker;
