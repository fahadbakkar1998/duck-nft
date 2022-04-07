import { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.scss";
import { MachineLayout } from "./components/Machine/MachineLayout";
import bgImg from "./assets/img/duck-base-holepunch.png";

function App() {
  return (
    <div className="App">
      <div className="header">
        {/* <img className="logo" src="/assets/images/Tozzi_Ducks_Logo.png" alt="" /> */}
      </div>
      <div className="machine-container">
        <img className="background" src={bgImg} alt=""></img>
        <Canvas
          orthographic
          camera={{ zoom: 115, position: [0, 0, 200] }}
          shadows
          onCreated={(state) => state.gl.clearColor()}
        >
          <Suspense fallback={null}>
            <pointLight intensity={2} position={[0, 10, 10]} />
            {/* <OrbitControls /> */}
            <MachineLayout />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
