import useMachineStore from "../../../store";
import DuckProfile from "./DuckProfile";

const Shopping = () => {    
  const { showDuckProfile, ducks, currentDuckId} = useMachineStore();
  const duck = ducks[currentDuckId];

  return showDuckProfile 
    ? <DuckProfile duck={duck} />
    : (
      <div className="h-full">      
        <img                
          alt={`Duck ${duck.id}`}        
          src={`data:image/webp;base64,${duck.webp}`}
        />         
      </div>    
    );
};

export default Shopping;
