import { Cylinder } from "@react-three/drei"

export const DuckCylinder = ( ) =>{
    return(
        <group 
            rotation={[0,  Math.PI /2, Math.PI /2]}
            position={[1, 0.2, 0.1]}
        >
            <Cylinder args = {[2, 2, 0.1, 50]}  >
                {/* <meshNormalMaterial attach="material" /> */}
                <meshBasicMaterial attach="material" color="#6C6C6C" />
            </Cylinder>
        </group>
    )    
}