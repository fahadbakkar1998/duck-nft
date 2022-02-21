
type ToolSwitcherProps = {
    onSelected: any;
    selectedTool: number;
 }
 type ToolButtonProps = {
    tool: any;
    index: number;
    onSelected: any;
    selectedTool: number;
 }
 const tools = [{
     index:0, label:'pencil'
 },{
    index:1, label:'paint'
 }]

const ToolButton: ({tool,index,selectedTool, onSelected}:ToolButtonProps ) => JSX.Element = ({tool,index,selectedTool, onSelected}) => {
    return ( <div 
        className={'ts-button ' + ((selectedTool === index)? 'selected ':'') }
        onClick={() => onSelected(index)} >{tool.label}</div>)
}

const ToolSwitcher: ({selectedTool, onSelected}:ToolSwitcherProps ) => JSX.Element = ({selectedTool, onSelected}) => {
    return (
        <div className="tool-switcher">
            <div className="ts-bar">
        {tools.map((tool:any, i) => {
                return <ToolButton tool={tool} index={i} key={i} onSelected={onSelected} selectedTool={selectedTool}/>
        })}
    </div>
        </div>
    
)}
export default ToolSwitcher