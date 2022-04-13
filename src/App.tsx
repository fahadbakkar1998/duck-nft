import { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import "./App.scss";
import { MachineLayout } from "./components/Machine/MachineLayout";
import bgImg from "./assets/img/duck-base-holepunch.png";

function App() {
  return (
    <div className="App">
      <div className="header">        
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
            <pointLight  intensity={9} position={[0, 8, 10]} />            
            <MachineLayout />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
