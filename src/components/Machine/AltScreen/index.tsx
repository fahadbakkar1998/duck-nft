import { Html } from '@react-three/drei'
import useMachineStore from "../../../store";
import { MachineMode } from "../../../types/types";
import Shopping from './Shopping'
import Custom from './Custom'
import Admin from './Admin'
import { useThree } from "react-three-fiber";
import './index.scss'

const AltScreen: () => JSX.Element = () => {
  const currentMode = useMachineStore(state => state.currentMode)
  const { viewport } = useThree();

  return (
    <Html
      scale={[viewport.width / 16, viewport.width / 16, viewport.width / 16]}
      position={[- 229 * viewport.width / 1000, 54 * viewport.width / 1000, 0.0]}
      rotation={[0.0, 0.0, 0.0]}
      transform
    >
      <div className='AltScreen scanlines'>
        {currentMode === MachineMode.Shopping && <Shopping></Shopping>}
        {currentMode === MachineMode.Customization && <Custom></Custom>}
        {currentMode === MachineMode.Admin && <Admin></Admin>}
      </div>
    </Html>
  )
}

export default AltScreen