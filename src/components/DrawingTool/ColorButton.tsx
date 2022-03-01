type ColorButtonProps = {
  color?: string;
  onSelected: any;
  selectedColorIndex: number;
  index: number;
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
        "ColorButton " + (selectedColorIndex === index ? "selected " : "")
      }
      onClick={() => onSelected(index, color)}
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default ColorButton;
