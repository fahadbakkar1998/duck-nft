import DTool from './drawing-tool'
import './content.scss'

const InteractiveTextureContent: () => JSX.Element = () => {
  return (
    <div className="interactive-texture">
      <div className="tv-wrapper">
        <DTool/>
      </div>
    </div>
  )
}
 
export default InteractiveTextureContent