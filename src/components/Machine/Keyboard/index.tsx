import React, { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import modelObject from '../../../assets/glb/key_pad.glb';

const Keyboard: () => JSX.Element = () => {
 
  const [vrm, setVrm] = useState<any>(null);
  const { current: loader } = useRef(new GLTFLoader());
  
  const loadObject = () => {
    loader.load(modelObject, (gltf: any) => {
        setVrm(gltf.scene);
      });
  };

  useEffect(() => {
    loadObject();
  }, []);

  return <>{vrm && 
    <mesh>
      <primitive object={vrm} position={[45, -2.360, 0]} scale ={[6, 6, 6]} rotation={[0, -0.420, -0.010]}/>
    </mesh>
  }</>

};

export default Keyboard;