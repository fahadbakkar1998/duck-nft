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

  useEffect(() => {
    if(vrm !== null) {
      vrm.children.forEach( item => {
        if(item.name === '01') {
          item.position.set(-1.163, 1.810, 0.042);
          item.rotation.set(1.611, -0.010, -0.170);
        } else if(item.name === '02') {
          item.position.set(-0.222, 1.791, -0.122);
          item.rotation.set(1.621,  -0.020, -0.160);
        } else if(item.name === '03') {
          item.position.set(0.671, 1.781, -0.282);
          item.rotation.set(1.591,  -0.010, -0.140);
        } else if(item.name === '04') {
          item.position.set(-0.457, 0.932, -0.072);
          item.rotation.set(1.590,  0.000, -0.160);
        } else if(item.name === '05') {
          item.position.set(0.470, 0.964, -0.242);
          item.rotation.set(1.601, 0.000, -0.150);
        } else if(item.name === '06') {
          item.position.set(-0.287, 0.113, -0.122);
          item.rotation.set(1.571, 0.020, -0.140);
        } else if(item.name === '07') {
          item.position.set(0.628, 0.136, -0.262);
          item.rotation.set(1.531, 0.020, -0.080);
        } else if(item.name === '08') {
          item.position.set(-0.348, -0.716, -0.112);
          item.rotation.set(1.541, 0.020, -0.150);
        } else if(item.name === '09') {
          item.position.set(0.580, -0.696, -0.252);
          item.rotation.set(1.551, 0.030, -0.080);
        } else if(item.name === '10') {
          item.position.set(0.053, -1.558, -0.202);
          item.rotation.set(1.541, 0.050, -0.190);
        } else if(item.name === 'enter') {
          item.position.set(-0.075, -2.431, -0.152);
          item.rotation.set(1.531, 0.040, -0.120);
        } else if(item.name === 'panel') {
          item.position.set(-0.594, 0.082, -0.064);
          item.rotation.set(1.571, 0.00, -0.180);
        }
      });
    }
  }, [vrm]);

  return <>{vrm && 
    <mesh>
      <primitive object={vrm} position={[45, -2.360, 0]} scale ={[6, 6, 6]} rotation={[0, -0.420, -0.010]}/>
    </mesh>
  }</>

};

export default Keyboard;