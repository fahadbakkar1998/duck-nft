import React, { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import modelObject from '../../../assets/glb/key_pad_2.glb';
import { useThree } from 'react-three-fiber';
import { MachineMode, minViewLength } from "../../../utils/constants";
import Display from '../Display';
import { useMachineStore } from "../../../store";

const Keyboard: () => JSX.Element = () => {
 
  const [vrm, setVrm] = useState<any>(null);
  const { current: loader } = useRef(new GLTFLoader());
  const { viewport } = useThree(); 
  const min = viewport.width;
  const [value, setValue] = useState<string>('');
  const { currentMode } = useMachineStore();

  const { setCurrentDuckId } = useMachineStore((state) => state);

  const enterClick = (value: string) => {
    if( Number(value) <= 199 ) setCurrentDuckId(Number(value));
  };

  const clearClick = () => {
    setValue('');
  };
  
  const loadObject = () => {
    loader.load(modelObject, ( gltf: any ) => {
        setVrm(gltf.scene);
      });
  };

  useEffect(() => {
    loadObject();
  }, []);

  const buttonClick = ( btnName ) => {
    if ([MachineMode.Off, MachineMode.Syncing].includes(currentMode)) return;
    if(btnName === 'enter') enterClick(value);
    else if(btnName === 'clear') clearClick();
         else {
           setValue(value + Number(btnName).toString());
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
          <primitive object={vrm} position={[6.1580, -0.40, 0]} scale ={[1, 1, 1]} />     
        </mesh>   
      </group>
  }</>

};

export default Keyboard;