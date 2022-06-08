type ColorButtonProps = {
  color?: string;
  onSelected: any;
  selectedColorIndex: number;
  index: number;
};

const ColorButton = ({
  color,
  index,
  selectedColorIndex,
  onSelected,
}: ColorButtonProps) => {
  return (
    <div
      className={
        `ColorButton ${selectedColorIndex === index ? 'selected ' : ''}`
      }
      onClick={() => onSelected(index, color)}
      style={{ backgroundColor: color }}
    />
  );
};

export default ColorButton;
