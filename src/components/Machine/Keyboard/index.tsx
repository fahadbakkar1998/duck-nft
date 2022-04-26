import React, { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import modelObject from '../../../assets/glb/key_pad_2.glb';
import { useThree } from 'react-three-fiber';
import { minViewLength } from "../../../utils/constants";
import Display from '../Display';

const Keyboard: () => JSX.Element = () => {
 
  const [vrm, setVrm] = useState<any>(null);
  const { current: loader } = useRef(new GLTFLoader());
  const { viewport } = useThree(); 
  const min = viewport.width;
  
  const loadObject = () => {
    loader.load(modelObject, ( gltf: any ) => {
        setVrm(gltf.scene);
      });
  };

  useEffect(() => {
    loadObject();
  }, []);

  const [value, setValue] = useState<number>(0);

  const buttonClick = ( btnName ) => {
    if(btnName !== 'enter') {
      const digit = Number(btnName);
      if( value === 0 || value >= 100) {
        setValue(digit);
      }
      else setValue(value*10 + digit);
    }
    vrm.children.forEach( item => {
      if( item.name === btnName ){
        item.position.z = 0.01;
      }
    });
  }

  const buttonSetDefault = ( btnName ) => {
    vrm.children.forEach( item => {
      if( item.name === btnName ){
        item.position.z = 0.055;
      }
    });
  }

  return <>{vrm && 
      <group
        scale={[
          0.342*min/minViewLength, 
          0.342*min/minViewLength, 
          0.342*min/minViewLength
        ]}
      >
        <Display value={value} />
        <mesh
          onPointerDown = {(e)=> {
            if(e.object.name !== 'pad_1' && e.object.name !== 'pad_2')
            buttonClick(e.object.name);
          }}
          onPointerUp={(e)=> {
            buttonSetDefault(e.intersections[0].object.name);
          }}
        >
          <primitive object={vrm} position={[6.150, -0.390, 0]} scale ={[1, 1, 1]} rotation={[0, 0.080, 0]}/>     
        </mesh>   
      </group>
  }</>

};

export default Keyboard;