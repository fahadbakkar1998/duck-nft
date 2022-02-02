import img from '../../../src/assets/img/duck-base-holepunch.png'
import { Canvas, useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import { DuckCylinder } from '../Cylinder/cylinder'

export const MachineLayout = ( ) => {
    const texture = useLoader(THREE.TextureLoader, img)
    return(
        <group>
            <mesh>
                <planeBufferGeometry attach="geometry" args={[12, 7]} />
                <meshBasicMaterial attach="material" map={texture} toneMapped={false}/>
            </mesh>
            <DuckCylinder/>
        </group>
    )
}