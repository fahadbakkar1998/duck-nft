
type LayerPickerProps = {
    layers: any[];
    onSelected: any;
    selectedLayerIndex: number;
 }
 type LayerButtonProps = {
    layer: any;
    index: number;
    onSelected: any;
    selectedLayerIndex: number;
 }
 

const LayerButton: ({layer,index,selectedLayerIndex, onSelected}:LayerButtonProps ) => JSX.Element = ({layer, index, selectedLayerIndex, onSelected}) => {
    return ( <div 
        className={'layer-button ' + ((selectedLayerIndex === index)? 'selected ':'') + (layer.disabled ? 'disabled ' : '')}
        onClick={() => !layer.disabled && onSelected(index)} >{layer.label}</div>)
}

const LayerPicker: ({layers,selectedLayerIndex, onSelected}:LayerPickerProps ) => JSX.Element = ({layers, selectedLayerIndex, onSelected}) => {
    return (
        <div className="layer-picker">
            <div className="layer-bar">
        {layers.map((layer:any, i) => {
                return <LayerButton layer={layer} index={i} key={i} onSelected={onSelected} selectedLayerIndex={selectedLayerIndex}/>
        })}
    </div>
        </div>
    
)}
export default LayerPicker