import { useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Html } from "@react-three/drei";
import { useThree } from "react-three-fiber";
import { aspectRatio, minViewLength } from "../../utils/constants";
import useMachineStore from "../../store";

const ColorPicker: () => JSX.Element = () => {
  const DToolInst = useMachineStore((state) => state.DToolInst);
  const selectedColor = useMachineStore((state) => state.selectedColor);
  const setSelectedColor = useMachineStore((state) => state.setSelectedColor);
  const { viewport } = useThree();
  // const min = Math.min(viewport.width, viewport.height);
const min = viewport.width;
  const bgColor = selectedColor || "#FFFFFF";

  useEffect(() => {
    const satElements = Array.from(
      document.getElementsByClassName(
        "react-colorful__saturation"
      ) as HTMLCollectionOf<HTMLElement>
    );
    if (satElements.length) {
      satElements[0].addEventListener("mouseup", (e) => e.stopPropagation());
      document.addEventListener("mouseup", (e) => {
        satElements[0].style.display = "none";
      });
    }
  }, []);

  return (
    <Html
      scale={[
        (0.18 * min) / minViewLength,
        (0.18 * min) / minViewLength,
        (0.18 * min) / minViewLength,
      ]}
      position={[-0.144 * min, -0.22 * min, 0]}
      rotation={[0.0, 0.0, 0.0]}
      transform
    >
      <div
        className="ColorPicker"
        style={{ backgroundColor: bgColor }}
        onClick={() => {
          const satElements = Array.from(
            document.getElementsByClassName(
              "react-colorful__saturation"
            ) as HTMLCollectionOf<HTMLElement>
          );
          if (satElements.length) {
            satElements[0].style.display = "block";
          }
        }}
      >
        <HexColorPicker
          color={bgColor}
          onChange={(color) => {
            if (!color) return;
            setSelectedColor(color);
            DToolInst.selectColor(color);
          }}
        />
      </div>
    </Html>
  );
};

export default ColorPicker;
