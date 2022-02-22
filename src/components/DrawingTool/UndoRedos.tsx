type URBProps = {
  enabled: boolean;
  dir: number;
  onPress: any;
};
type URProps = {
  undoEnabled: boolean;
  redoEnabled: boolean;
  onPress: any;
};
const tools = [
  {
    index: 0,
    label: "pencil",
  },
  {
    index: 1,
    label: "paint",
  },
];

const URButton: ({ enabled, onPress, dir }: URBProps) => JSX.Element = ({
  enabled,
  onPress,
  dir,
}) => {
  return (
    <div
      className={"ur-button selected" + (enabled ? " " : "disabled")}
      onClick={() => (enabled ? onPress(dir) : null)}
    >
      {dir > 0 ? "redo" : "undo"}
    </div>
  );
};

const UndoRedo: ({
  undoEnabled,
  redoEnabled,
  onPress,
}: URProps) => JSX.Element = ({ undoEnabled, redoEnabled, onPress }) => {
  return (
    <div className="undoredo">
      <div className="ur-bar">
        {tools.map((tool: any, i) => {
          const e = i === 0 ? undoEnabled : redoEnabled;
          const dir = i === 0 ? -1 : 1;
          return <URButton enabled={e} onPress={onPress} dir={dir} key={i} />;
        })}
      </div>
    </div>
  );
};
export default UndoRedo;
