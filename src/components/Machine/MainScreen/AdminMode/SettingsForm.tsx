import { MintStatus } from "../../../../types/types";
import { useState, useEffect } from "react";
import FormToggle from "./common/FormToggle";
import FormInput from "./common/FormInput";
import FormButton from "./common/FormButton";

const config = {
  tozziMintStatus: MintStatus.Enabled,
  tozziMintPrice: "0.5",
  customMintStatus: MintStatus.Disabled,
  customMintPrice: "0.5",
  maxCustomDucks: 10,
}

const SettingsForm = () => {
  const [configValues, setConfigValues] = useState<any>({...config});

  useEffect(() => {
    setConfigValues(config);
  }, []);

  const handleSaveConfig = () => {
    alert('safe config?');
  }

  return (
    <div className="flex mt-4 flex-col h-full space-y-2 relative">
      <div>
        <div>TOZZI DUCKS</div>
        <div className="flex justify-between pixel-font-thin">          
          <div className="items-center flex text-2xl">Minting</div>
          <div className="flex w-3/5 space-x-2 items-center">
            <FormToggle 
              label="Enabled" 
              isSelected={configValues.tozziMintStatus === MintStatus.Enabled} 
              onToggle={() => setConfigValues({...configValues, tozziMintStatus: MintStatus.Enabled})} 
            />
            <FormToggle 
              label="Disabled" 
              isSelected={configValues.tozziMintStatus === MintStatus.Disabled} 
              onToggle={() => setConfigValues({...configValues, tozziMintStatus: MintStatus.Disabled})} 
            />
            <FormToggle 
              label="Allowance" 
              isSelected={configValues.tozziMintStatus === MintStatus.Allowance}
              onToggle={() => setConfigValues({...configValues, tozziMintStatus: MintStatus.Allowance})} 
            />            
          </div>          
        </div>  
        <div className="flex justify-between pixel-font-thin mt-2">          
          <div className="items-center flex text-2xl">Price</div>
          <FormInput 
            className="w-3/5"
            value={configValues.tozziMintPrice} 
            overlay="ETH" 
            onChange={(e) => { setConfigValues({...configValues, tozziMintPrice: e.currentTarget.value}) }} 
          />        
        </div>          
      </div>     

      <div>
        <div>CUSTOM DUCKS</div>
        <div className="flex justify-between pixel-font-thin">          
          <div className="items-center  text-2xl">Minting</div>
          <div className="flex w-3/5  space-x-2 items-center">
            <FormToggle 
              label="Enabled" 
              isSelected={configValues.customMintStatus === MintStatus.Enabled} 
              onToggle={() => setConfigValues({...configValues, customMintStatus: MintStatus.Enabled})} 
            />
            <FormToggle 
              label="Disabled" 
              isSelected={configValues.customMintStatus === MintStatus.Disabled} 
              onToggle={() => setConfigValues({...configValues, customMintStatus: MintStatus.Disabled})} 
            />
            <FormToggle 
              label="Allowance" 
              isSelected={configValues.customMintStatus === MintStatus.Allowance}
              onToggle={() => setConfigValues({...configValues, customMintStatus: MintStatus.Allowance})} 
            /> 
          </div>
        </div>    
        <div className="flex justify-between pixel-font-thin mt-2">          
          <div className="items-center flex text-2xl">Price</div>
          <FormInput 
            className="w-3/5"
            value={configValues.customMintPrice} 
            overlay="ETH" 
            onChange={(e) => { setConfigValues({...configValues,  customMintPrice: e.currentTarget.value}) }} 
          />  
        </div>  
        <div className="flex justify-between pixel-font-thin mt-2">          
          <div className="items-center flex text-2xl">Max Ducks</div>
          <FormInput 
            className="w-3/5"
            value={configValues.maxCustomDucks}             
            onChange={(e) => { setConfigValues({...configValues,  maxCustomDucks: e.currentTarget.value}) }} 
          />  
        </div>      
      </div>  

      <div className="absolute -bottom-4 -right-4 flex space-x-2 text-sm">
        <FormButton label="Reset" onClick={() => setConfigValues(config)} />          
        <FormButton label="Save" onClick={handleSaveConfig} />                           
      </div>
    </div>
  )
}


export default SettingsForm;