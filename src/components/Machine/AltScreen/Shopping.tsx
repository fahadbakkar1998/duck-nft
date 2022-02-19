import useMachineStore from "../../../store";

const Shopping: () => JSX.Element = () => {
  const currentDuckID = useMachineStore((state) => state.currentDuckID);
  console.log("currentDuckID", currentDuckID);

  return (
    <div className="Shopping">
      {currentDuckID !== 0 && (
        <img
          className="Shopping-img"
          alt={""}
          src={require(`../../../assets/img/ducks/crypto_duck_${currentDuckID}.svg`)}
        />
      )}
    </div>
  );
};

export default Shopping;
