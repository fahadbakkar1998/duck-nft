import ducks from "./duck-data(step2).json";

const combineStep2 = () => {
  const combineValues = ducks.map((duck, index) => {
    return {
      id: index,
      proof: duck.proof,
      webp: duck.webp,
      owner: "",
      salePrice: 0,
      isCustom: false,
    };
  });  
};

combineStep2();
