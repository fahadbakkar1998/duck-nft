// import proofs from "./proofs.json";
// import ducks from "./duck-data(step1).json";

import ducks from "./duck-data(step2).json";

// const combineStep1 = () => {
//   const proofValues = Object.values(proofs);
//   const combineValues = ducks.map((value, index) => {
//     return {
//       id: index,
//       img: value.img,
//       owner: value.owner,
//       webp: proofValues[index].webp,
//       proof: proofValues[index].proof,
//     };
//   });
//   console.log("combine values: ", combineValues);
// };

const combineStep2 = () => {
  const combineValues = ducks.map((duck, index) => {
    return {
      id: index,
      staticData: {
        proof: duck.proof,
        webp: duck.webp,
      },
      mintTime: 0,
      owner: "",
      salePrice: 0,
      isCustom: false,
    };
  });
  console.log("combineValues: ", combineValues);
};

combineStep2();
