import { useState, useEffect } from 'react';
import { Contract } from 'ethers';
import { useContractFunction, useEthers } from '@usedapp/core';
import { MintStatus } from '../../../../types/types';
import FormToggle from './common/FormToggle';
import FormInput from './common/FormInput';
import FormButton from './common/FormButton';
import { useMachineContract } from '../../../../hooks/machine';
import { contractAbi } from '../../../../utils/constants';
import useMachineStore from '../../../../store';

interface Allowance {
  tozziDucks: string;
  customDucks: string;
}
// 0x23168EaB692E07114A7949A433408414A18eeEd7
interface AllowanceFormValues extends Allowance {
  account: string;
}

const AllowancesForm = () => {
  const { altMessage, setAltMessage } = useMachineStore();
  const [allowanceAccount, setAllowanceAccount] = useState('');
  const [checkedAllowance, setCheckedAllowance] = useState<Allowance|null>(null);
  const { library } = useEthers();
  const machineContract = new Contract(process.env.REACT_APP_MACHINE_CONTRACT_ADDRESS!, contractAbi, library);
  const { send, state } = useContractFunction(
    machineContract,
    'setDuckAllowance',
    { transactionName: 'Set Duck Allowance' },
  );

  const [allowanceFormValues, setAllowanceFormValues] = useState<AllowanceFormValues>({
    account: '',
    tozziDucks: '',
    customDucks: '',
  });

  useEffect(() => {
    setCheckedAllowance(null);
  }, [allowanceAccount]);

  const handleCheckAllowance = async () => {
    if (machineContract) {
      const result = await machineContract.duckAllowances(allowanceAccount);
      const allowance = {
        tozziDucks: result.tozziDuckAllowance.toNumber(),
        customDucks: result.customDuckAllowance.toNumber(),
      };
      setCheckedAllowance(allowance);
    }
  };

  useEffect(() => {
    if (state?.status === 'Mining') {
      setAltMessage('Setting Duck Allowance...');
      // setIsLocked(true);
      // setMachineMood('happy');
    } else if (state?.status === 'Success') {
      setAltMessage('Success!');
      // setMachineMood(undefined);
      // setIsLocked(false);
    } else if (state?.status === 'PendingSignature') {
      setAltMessage('Signature Pending...');
    } else if (state?.status === 'Exception') {
      const denied = 'MetaMask Tx Signature: User denied transaction signature.';
      if (state?.errorMessage === denied) {
        setAltMessage('Well, nevermind then...');
      } else {
        setAltMessage('Oh Quack! something went wrong!');
      }
      // setMachineMood('sad');
      // setIsLocked(false);
      // setTimeout(() => setMachineMood(undefined), 500);
    }
  }, [state.status]);

  const handleSetAllowance = () => {
    const { account, tozziDucks, customDucks } = allowanceFormValues;
    send(account, tozziDucks, customDucks);
  };

  return (
    <div className="flex mt-2 flex-col h-full space-y-4 relative">
      <div>
        <div className="pixel-font-thin mt-1">
          <FormInput
            className="w-full"
            placeholder="Account #"
            value={allowanceAccount}
            onChange={(e) => { setAllowanceAccount(e.currentTarget.value); }}
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
            <div>Custom Ducks: {checkedAllowance.customDucks}</div>
          </div>
        )}
      </div>

      <div className="">
        <div>SET DUCK ALLOWANCE</div>
        <div className="pixel-font-thin">
          <div className="items-center flex text-2xl">Account</div>
          <FormInput
            className="w-full"
            value={allowanceFormValues.account}
            onChange={(e) => { setAllowanceFormValues({ ...allowanceFormValues, account: e.currentTarget.value }); }}
          />
        </div>
        <div className="pixel-font-thin space-x-2 text-2xl flex justify-between">
          <div className="flex-1">
            <div>Tozzi Ducks:</div>
            <FormInput
              className="w-full"
              value={allowanceFormValues.tozziDucks.toString()}
              onChange={(e) => { setAllowanceFormValues({ ...allowanceFormValues, tozziDucks: e.currentTarget.value }); }}
            />
          </div>
          <div className="flex-1">
            <div>Custom Ducks:</div>
            <FormInput
              className="w-full"
              value={allowanceFormValues.customDucks.toString()}
              onChange={(e) => { setAllowanceFormValues({ ...allowanceFormValues, customDucks: e.currentTarget.value }); }}
            />
          </div>
        </div>
        <div className="absolute -bottom-4 -right-4 flex space-x-2 text-sm">
          <FormButton label="Submit" onClick={handleSetAllowance} />
        </div>
      </div>

    </div>
  );
};

export default AllowancesForm;
