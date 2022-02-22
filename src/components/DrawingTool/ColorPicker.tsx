import { useState, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { Html } from "@react-three/drei";
import { useThree } from "react-three-fiber";
import { aspectRatio } from "../../utils/constants";
import useMachineStore from "../../store";

const ColorPicker: () => JSX.Element = () => {
  const DToolInst = useMachineStore((state) => state.DToolInst);
  const selectedColor = useMachineStore((state) => state.selectedColor);
  const setSelectedColor = useMachineStore((state) => state.setSelectedColor);
  const { viewport } = useThree();
  const [hexPickerVisible, setHexPickerVisible] = useState(false);
  const colorPicker = useRef(null);
  const bgcolor = selectedColor || "#FFFFFF";

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
    console.log("ColorPicker color", color);
    if (!color) return;
    setSelectedColor(color);
    DToolInst.selectColor(color);
  }

  return (
    <Html
      scale={[
        viewport.width / 24 / aspectRatio,
        viewport.width / 40,
        viewport.width / 44,
      ]}
      position={[
        (-146 * viewport.width) / 1000,
        (-130 * viewport.width) / 1000,
        0.2,
      ]}
      rotation={[0.0, 0.0, 0.0]}
      transform
    >
      <div
        className="ColorPicker"
        style={{ backgroundColor: bgcolor }}
        onClick={handleShowHexPicker}
      >
        <div
          className={`hex ${!hexPickerVisible && "hidden"}`}
          style={{ transform: "scale(2)" }}
          id="hexcolorpicker"
        >
          <HexColorPicker color={bgcolor} onChange={handleChange} />
        </div>
      </div>
    </Html>
  );
};

export default ColorPicker;
