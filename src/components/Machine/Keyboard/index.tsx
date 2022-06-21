/* eslint-disable no-param-reassign */
import React, { FC, useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useThree } from 'react-three-fiber';
import { padStart } from 'lodash';
import modelObject from '../../../assets/glb/key_pad.glb';
import { MachineMode, minViewLength } from '../../../utils/constants';
import Display from '../Display';
import { useMachineStore } from '../../../store';
import { useDucks } from '../../../state/hooks';

const Keyboard: FC = () => {
  const [vrm, setVrm] = useState<any>(null);
  const { current: loader } = useRef(new GLTFLoader());
  const { viewport } = useThree();
  const min = viewport.width;
  const [value, setValue] = useState<string>('');
  const { currentDuckId, currentMode } = useMachineStore();
  const { data: ducksData = [], isLoading } = useDucks();
  const ducks = !isLoading ? ducksData : [];
  const [clearOnNext, setClearOnNext] = useState(true);
  const { setCurrentDuckId, setAltMessage } = useMachineStore();

  const enterClick = (value: string) => {
    // TODO - find better way to do this that doesn't require all ducks
    const duckExists = ducks.find((d) => d.id === Number(value));
    if (duckExists) {
      setCurrentDuckId(Number(value));
      document.getElementById(`item${value}`)?.scrollIntoView({
        block: 'end',
      });
    } else {
      setAltMessage('Invalid duck ID!');
    }
    setClearOnNext(true);
  };

  const clearClick = () => {
    setValue('');
  };

  const loadObject = () => {
    loader.load(modelObject, (gltf: any) => {
      setVrm(gltf.scene);
    });
  };

  useEffect(() => {
    loadObject();
  }, []);

  useEffect(() => {
    setValue(padStart(currentDuckId, 3, '0'));
  }, [currentDuckId]);

  const buttonClick = (btnName) => {
    if (currentMode === MachineMode.Off) return;
    if (btnName === 'enter') enterClick(value);
    else if (btnName === 'clear') clearClick();
    else if (clearOnNext) {
      setClearOnNext(false);
      setValue(Number(btnName).toString());
    } else {
      setValue(value + Number(btnName).toString());
    }
    vrm.children.forEach((item) => {
      if (item.name === btnName) {
        if (btnName === 'clear') {
          item.position.z = -0.03;
        } else {
          item.position.z = 0.01;
        }
      }
    });
  };

  const buttonSetDefault = (btnName) => {
    vrm.children.forEach((item) => {
      if (item.name === btnName) {
        item.position.z = 0.055;
      }
    });
  };

  return (
    vrm && (
    <group
      scale={[
        (0.342 * min) / minViewLength,
        (0.342 * min) / minViewLength,
        (0.342 * min) / minViewLength,
      ]}
    >
      <Display value={value} />
      <mesh
        onPointerDown={(e) => {
          if (e.object.name !== 'pad_1' && e.object.name !== 'pad_2') buttonClick(e.object.name);
        }}
        onPointerUp={(e) => {
          buttonSetDefault(e.intersections[0].object.name);
        }}
      >
        <primitive
          object={vrm}
          position={[6.158, -0.4, 0]}
          scale={[1, 1, 1]}
        />
      </mesh>
    </group>
    )
  );
};

export default Keyboard;
