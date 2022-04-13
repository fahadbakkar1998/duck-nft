import useMachineStore from "../../../store";


const Shopping: () => JSX.Element = () => {
  const currentMode = useMachineStore((state) => state.currentMode);
  const currentTozziDuckId = useMachineStore((state) => state.currentTozziDuckId);
  const duckIndex = currentTozziDuckId + 1;
  return (
    <div className="w-full h-full">
      <img        
        alt=""
        src={`../../../assets/img/ducks/crypto_duck_${duckIndex}.svg`}          
      />         
    </div>    
  );
};

export default Shopping;
