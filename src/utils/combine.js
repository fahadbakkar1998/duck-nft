import ducks from "./duck-data(step1).json";
import proofs from "./proofs.json";

export const combineDucksAndProofs = () => {
  const duckValues = Object.values(ducks);
  const proofValues = Object.values(proofs);
  const combineValues = duckValues.map((value, index) => {
    return {
      id: index,
      img: value.img,
      owner: value.owner,
      webp: proofValues[index].webp,
      proof: proofValues[index].proof,
    };
  });
  // console.log("combine values: ", combineValues);
};
