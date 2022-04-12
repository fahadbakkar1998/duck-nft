import { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import "./App.scss";
import { MachineLayout } from "./components/Machine/MachineLayout";
import bgImg from "./assets/img/duck-base-holepunch.png";
import { OrbitControls } from "@react-three/drei";

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
            <pointLight intensity={9} position={[0, 8, 10]} />
            {/* <OrbitControls /> */}
            <MachineLayout />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default App;

/* EyeDropper Sample */
// import React, { Component } from "react";
// import { EyeDropper } from "react-eyedrop";

// class App extends Component {
//   state = {
//     r: 255,
//     g: 255,
//     b: 255,
//   };
//   setColor = ({ r, g, b }) => {
//     this.setState({ r, g, b });
//   };
//   render() {
//     const { r, g, b } = this.state;
//     return (
//       <div>
//         <div className="main">
//           <div className="container first">rgb(106, 0, 0)</div>
//           <div className="container second">rgb(106, 124, 0)</div>
//           <div className="container third">rgb(106, 124, 138)</div>
//           <div className="container fourth">rgb(15, 124, 138)</div>
//           <div className="container fifth">rgb(15, 44, 138)</div>
//           <div className="container sixth">rgb(219, 238, 97)</div>
//           <div className="container seventh">gradient</div>
//         </div>
//         <div className="result">
//           <div
//             className="container "
//             style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
//           >
//             rgb({r}, {g}, {b})
//           </div>
//         </div>
//         <div className="eye-drop-container">
//           <EyeDropper
//             onChange={(e) => {
//               console.log(e);
//             }}
//           />
//         </div>
//         <div id="container">
//           <img
//             src="assets/images/Tozzi_Ducks_Logo.png"
//             style={{ border: "1px solid black" }}
//             alt=""
//             id="sample"
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
