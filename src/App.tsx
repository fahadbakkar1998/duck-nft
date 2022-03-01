import { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.scss";
import { MachineLayout } from "./components/Machine/MachineLayout";

function App() {
  return (
    <div className="App">
      <Canvas
        orthographic
        camera={{ zoom: 115, position: [0, 0, 100] }}
        shadows
      >
        <Suspense fallback={null}>
          <OrbitControls />
          <MachineLayout />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
