import useMachineStore from "../../../store";


const Shopping = () => {  
  const currentTozziDuckId = 10;
  const currentTozziDuckId2 = useMachineStore((state) => state.currentTozziDuckId);
  return (
    <div className="w-full h-full bg-red-200">
      <img                
        alt={`Duck ${currentTozziDuckId + 1}`}
        src={require(`../../../assets/img/ducks/crypto_duck_${currentTozziDuckId2 + 1}.svg`)}          
      />         
    </div>    
  );
};

export default Shopping;
