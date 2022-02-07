import img from '../../../src/assets/img/duck-base-holepunch.png'
import { Canvas, useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import { a, useSpring, config } from '@react-spring/three';
import { DuckCylinder } from '../Cylinder/cylinder'
import { useState } from 'react';
import { filterProps } from 'framer-motion';

export const MachineLayout = ( ) => {

    const texture = useLoader(THREE.TextureLoader, img)
    return(
        <group  >
            <mesh position={[0.09, -0.15, -2.0]}>
                <planeBufferGeometry attach="geometry" args={[11, 6.5]} />
                <meshBasicMaterial attach="material" map={texture} toneMapped={false}/>
            </mesh>
            <DuckCylinder/>
        </group>
    )
}