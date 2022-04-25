import useMachineStore from "../../../store";

const Shopping = () => {    
  const { currentDuckId } = useMachineStore();
  return (
    <div className="min-h-full">
      
      <img                
        alt={`Duck ${currentDuckId + 1}`}
        src={require(`../../../assets/img/ducks/crypto_duck_${currentDuckId + 1}.svg`)}          
      />         
    </div>    
  );
};

export default Shopping;
