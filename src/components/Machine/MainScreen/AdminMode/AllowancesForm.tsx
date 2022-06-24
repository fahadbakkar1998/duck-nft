import { useState, useEffect } from 'react';
import { Contract } from 'ethers';
import { useContractFunction, useEthers } from '@usedapp/core';
import FormInput from './common/FormInput';
import FormButton from './common/FormButton';
import { contractAbi, numberRegex } from '../../../../utils/constants';
import useMachineStore from '../../../../store';
import AdminFormWrapper from './AdminFormWrapper';

interface Allowance {
  tozziDucks: string;
  customDucks: string;
}

interface AllowanceFormValues extends Allowance {
  account: string;
}

const emptyAllowance = {
  account: '',
  tozziDucks: '',
  customDucks: '',
};

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

  const [allowanceFormValues, setAllowanceFormValues] = useState<AllowanceFormValues>(emptyAllowance);

  useEffect(() => {
    setCheckedAllowance(null);
  }, [allowanceAccount]);

  const handleCheckAllowance = async () => {
    if (machineContract) {
      try {
        const result = await machineContract.duckAllowances(allowanceAccount);
        const allowance = {
          tozziDucks: result.tozziDuckAllowance.toNumber(),
          customDucks: result.customDuckAllowance.toNumber(),
        };
        setCheckedAllowance(allowance);
      } catch {
        setAltMessage('Oh Quack! Something went wrong!');
      }
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

  const handleReset = () => {
    setAllowanceAccount('');
    setAllowanceFormValues(emptyAllowance);
  };

  return (
    <AdminFormWrapper>
      <div className="flex flex-col h-full space-y-4 relative">
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
                onChange={
                  (e) => {
                    if (numberRegex.test(e.currentTarget.value)) {
                      setAllowanceFormValues({ ...allowanceFormValues, tozziDucks: e.currentTarget.value });
                    }
                  }
                }
              />
            </div>
            <div className="flex-1">
              <div>Custom Ducks:</div>
              <FormInput
                className="w-full"
                value={allowanceFormValues.customDucks.toString()}
                onChange={
                  (e) => {
                    if (numberRegex.test(e.currentTarget.value)) {
                      setAllowanceFormValues({ ...allowanceFormValues, customDucks: e.currentTarget.value });
                    }
                  }
                }
              />
            </div>
          </div>
          <div className="absolute -bottom-1 right-0 flex space-x-2 text-sm">
            <FormButton label="Reset" onClick={handleReset} />
            <FormButton label="Submit" onClick={handleSetAllowance} />
          </div>
        </div>

      </div>
    </AdminFormWrapper>
  );
};

export default AllowancesForm;
