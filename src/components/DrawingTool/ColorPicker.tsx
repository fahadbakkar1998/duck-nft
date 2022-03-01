import { useEffect } from "react";
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
  const bgColor = selectedColor || "#FFFFFF";

  // const handleCloseHexPicker: any = () => {
  //   setHexPickerVisible(false);
  //   document.removeEventListener("mouseup", handleCloseHexPicker);
  // };
  // const handelClosePrevent: any = (e: any) => {
  //   e.stopPropagation();
  // };
  // function handleShowHexPicker() {
  //   setHexPickerVisible(true);
  //   setTimeout(() => {
  //     document
  //       .getElementById("hexcolorpicker")
  //       ?.addEventListener("mouseup", handelClosePrevent);
  //   }, 100);
  //   document.addEventListener("mouseup", handleCloseHexPicker);
  // }

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
