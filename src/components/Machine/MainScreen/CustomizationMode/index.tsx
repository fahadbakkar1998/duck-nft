import { FC, Suspense, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useMachineStore } from '../../../../store';
import { colors, MachineMode } from '../../../../utils/constants';
import duckbill from '../../../../assets/duck-bill.png';
import CircleButton from '../../../common/CircleButton';
import pencilIcon from '../../../../assets/img/icons/pencil.svg';
import paintBucketIcon from '../../../../assets/img/icons/paintbucket.svg';
import eraserIcon from '../../../../assets/img/icons/eraser.svg';
import dropperIcon from '../../../../assets/img/icons/eye-dropper.svg';
import trashIcon from '../../../../assets/img/icons/trash.svg';
import undoIcon from '../../../../assets/img/icons/undo.svg';
import redoIcon from '../../../../assets/img/icons/redo.svg';
import randomIcon from '../../../../assets/img/icons/random.svg';
import './index.scss';

const layers: Object[] = [
  { label: 'Head' },
  {
    label: 'Bill',
    preset: duckbill,
    disabled: true,
    bannedColors: ['#000000', '#ffffff'],
    fillPoints: [
      { name: 'tongue', points: [[19, 24]] },
      {
        name: 'mouth',
        points: [
          [20, 26],
          [17, 23],
        ],
      },
      {
        name: 'beak',
        points: [
          [10, 17],
          [16, 18],
          [19, 21],
          [9, 21],
          [13, 22],
          [14, 23],
          [15, 24],
          [16, 25],
          [17, 27],
          [18, 28],
          [21, 27],
          [22, 26],
          [23, 25],
        ],
      },
    ],
  },
];

const DrawingTool: FC = (props: any) => {
  const drawingCanvas = useRef<HTMLCanvasElement>(null);
  const currentState = useMachineStore((state) => state);
  const {
    currentMode,
    DToolInst,
    selectedColorIndex,
    selectedLayerIndex,
    setSelectedLayerIndex,
    setHistoryButtonsState,
    selectedColor,
    setSelectedColor,
  } = currentState;

  const toggleEyeDrop = (flag: boolean) => {
    drawingCanvas!.current!.style.cursor = flag
      ? 'crosshair'
      : "url('/assets/images/pencil.png'), default";
    if (flag) {
      drawingCanvas!.current?.addEventListener('mousedown', onCanvasMouseDown);
    } else {
      drawingCanvas!.current?.removeEventListener(
        'mousedown',
        onCanvasMouseDown,
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
  }, []);

  return (
    <Suspense fallback={null}>
      <div
        className={cn('DrawingTool relative border-2 border-gray-600', {
          active: currentMode === MachineMode.Customization,
        })}
      >
        <div className="absolute w-full h-full inner-shadow rounded-[15%] pointer-events-none" />
        {/* border-[#aba961] */}
        <canvas
          className="drawing-canvas bg-black border-[#656b4d]  border-[30px]"
          ref={drawingCanvas}
          id="drawingtool_canvas"
        />
        <div className="right">
          <CircleButton
            onClick={() => {
              DToolInst.fillWithRandomColor(1);
            }}
            image={randomIcon}
          />
          <CircleButton
            onClick={() => {
              setSelectedLayerIndex(0);
              DToolInst.selectLayer(0);
              DToolInst.selectTool(0);
              DToolInst.selectColor(selectedColor);
              drawingCanvas.current!.style.cursor =
                "url('/assets/images/pencil.png'), default";
            }}
            image={pencilIcon}
          />
          <CircleButton
            onClick={() => {
              setSelectedLayerIndex(0);
              DToolInst.selectLayer(0);
              DToolInst.selectTool(1);
              drawingCanvas.current!.style.cursor =
                "url('/assets/images/paintbucket.png') 4 32, move";
            }}
            image={paintBucketIcon}
          />
          <CircleButton
            onClick={() => {
              setSelectedLayerIndex(0);
              DToolInst.selectLayer(0);
              DToolInst.selectTool(0);
              DToolInst.selectColor(null);
              drawingCanvas.current!.style.cursor =
                "url('/assets/images/eraser.png'), default";
            }}
            image={eraserIcon}
          />
        </div>

        <div className="left">
          <CircleButton
            onClick={() => toggleEyeDrop(true)}
            image={dropperIcon}
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
            onClick={() => {
              DToolInst.eraseCurrentLayer();
            }}
            image={trashIcon}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default DrawingTool;
