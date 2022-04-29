import useMachineStore from "../../../store";

const Shopping = () => {    
  const {ducks, currentDuckId } = useMachineStore();
  const duck = ducks[currentDuckId];
  return (
    <div className="min-h-full">
      
      <img                
        alt={`Duck ${duck.id}`}
        // src={require(`../../../assets/img/ducks/crypto_duck_${currentDuckId + 1}.svg`)}        
        src={`data:image/webp;base64,${duck.webp}`}
      />         
    </div>    
  );
};

export default Shopping;
