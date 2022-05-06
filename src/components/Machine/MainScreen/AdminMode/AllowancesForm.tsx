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

interface Allowance {  
  tozziDucks: string;
  customDucks: string;
}

interface AllowanceFormValues extends Allowance {
  account: string;
}

const AllowancesForm = () => {
  const [allowanceAccount, setAllowanceAccount] = useState("");
  const [checkedAllowance, setCheckedAllowance] = useState<Allowance|null>(null);

  const [allowanceFormValues, setAllowanceFormValues] = useState<AllowanceFormValues>({
    account: "",
    tozziDucks: "",
    customDucks: "",
  });

  useEffect(() => {
    setCheckedAllowance(null);
  }, [allowanceAccount]);

  const handleCheckAllowance = () => {    
    setCheckedAllowance({tozziDucks: "10", customDucks: "10"})
    console.log('check allowance');
  }

  const handleSetAllowance = () => {
    console.log('setting allowance');
  }

  return (
    <div className="flex mt-2 flex-col h-full space-y-4 relative">
      <div>
        {/* <div>CHECK ALLOWANCE</div>        */}
        <div className="pixel-font-thin">          
          <div className="items-center flex text-2xl">Account</div>
          <FormInput 
            className="w-full"
            value={allowanceAccount}             
            onChange={(e) => { setAllowanceAccount(e.currentTarget.value)}} 
          />        
        </div>
        { !checkedAllowance && (
          <div className="mt-2 text-center">
            <FormButton label="Check Allowance" onClick={handleCheckAllowance} />
          </div>
        )}
        { checkedAllowance && (
          <div className="pixel-font-thin text-2xl flex justify-between">   
            <div>Tozzi Ducks: {checkedAllowance.tozziDucks}</div>
            <div>Custom Ducks: {checkedAllowance.tozziDucks}</div>
          </div>          
        )}        
      </div>    

      <div className="">
        <div>SET / EDIT ALLOWANCE</div>       
        <div className="pixel-font-thin">          
          <div className="items-center flex text-2xl">Account</div>
          <FormInput 
            className="w-full"
            value={allowanceFormValues.account}             
            onChange={(e) => { setAllowanceFormValues({...allowanceFormValues, account: e.currentTarget.value})}} 
          />        
        </div>
        <div className="pixel-font-thin space-x-2 text-2xl flex justify-between">   
          <div className="flex-1">
            <div>Tozzi Ducks:</div> 
            <FormInput 
              className="w-full" 
              value={allowanceFormValues.tozziDucks.toString()} 
              onChange={(e) => { setAllowanceFormValues({...allowanceFormValues, tozziDucks: e.currentTarget.value})}} 
            />
          </div>
          <div className="flex-1">
            <div>Custom Ducks:</div>
            <FormInput 
              className="w-full" 
              value={allowanceFormValues.customDucks.toString()} 
              onChange={(e) => { setAllowanceFormValues({...allowanceFormValues, customDucks: e.currentTarget.value})}} 
            />
          </div>
        </div>          
        <div className="absolute -bottom-4 -right-4 flex space-x-2 text-sm">        
        <FormButton label="Save" onClick={() => {}} />                           
      </div>
      </div>   
      
    </div>
  )
}


export default AllowancesForm;