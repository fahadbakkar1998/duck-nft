import { Cylinder } from "@react-three/drei"
import { useState } from 'react';
import { a, useSpring, config } from '@react-spring/three';
import { useGesture, useWheel, useDrag } from 'react-use-gesture';

export const DuckCylinder = ( ) =>{

    
    const [spring, set] = useSpring(() => ({ 
        rotation:  [0, 0, 0], 
        config : config.molasses
    }));
    let count : number = 0;
    const handelOnClick = () => {
        ++count; 
        set({ rotation: [Math.PI  * count, 0, 0] });
    }
    return(
        <a.group {...spring as any} onClick={handelOnClick}>
            <group 
                rotation={[0,  Math.PI /2, Math.PI /2]}
                position={[1, 0.0, 0.0]}
            >
                <Cylinder args = {[1.8, 1.8, 0.1, 50]}  >
                    {/* <meshNormalMaterial attach="material" /> */}
                    <meshBasicMaterial attach="material" color="#6C6C6C" />
                </Cylinder>
            </group>
        </a.group>
    )    
}