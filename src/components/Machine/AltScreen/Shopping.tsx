import useMachineStore from "../../../store";

const Shopping = () => {    
  const { currentTozziDuckId } = useMachineStore();
  return (
    <div className="min-h-full">
      
      <img                
        alt={`Duck ${currentTozziDuckId + 1}`}
        src={require(`../../../assets/img/ducks/crypto_duck_${currentTozziDuckId + 1}.svg`)}          
      />         
    </div>    
  );
};

export default Shopping;
