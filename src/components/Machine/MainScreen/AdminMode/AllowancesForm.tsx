import { useState, useEffect, ChangeEvent } from 'react';
import { Contract } from 'ethers';
import { useContractFunction, useEthers } from '@usedapp/core';
import FormInput from './common/FormInput';
import FormButton from './common/FormButton';
import { contractAbi, numberRegex } from '../../../../utils/constants';
import useMachineStore from '../../../../store';
import AdminFormWrapper from './AdminFormWrapper';
import { useTxNotifier } from '../../../../hooks/transaction';
import { getCustomErrorText } from '../../../../utils/helpers';
import { Allowance } from '../../../../types/types';
import { contract } from '../../../../utils/functions';

const AllowancesForm = () => {
  const { setAltMessage } = useMachineStore();
  const [allowanceAccount, setAllowanceAccount] = useState('');
  const [checkedAllowance, setCheckedAllowance] = useState<Allowance|null>(null);
  const { library } = useEthers();
  const [allowanceFormValues, setAllowanceFormValues] = useState<Allowance>({});

  const { send, state } = useContractFunction(contract, 'setDuckAllowance');
  useTxNotifier({ mining: 'Setting Duck Allowance' }, state);

  useEffect(() => {
    setCheckedAllowance(null);
  }, [allowanceAccount]);

  const handleCheckAllowance = async () => {
    if (contract) {
      try {
        const result = await contract.duckAllowances(allowanceAccount);
        const allowance = {
          tozziDucks: result.tozziDuckAllowance.toNumber(),
          customDucks: result.customDuckAllowance.toNumber(),
        };
        setCheckedAllowance(allowance);
      } catch {
        setAltMessage({ message: getCustomErrorText(undefined) });
      }
    }
  };

  const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAllowanceFormValues({ ...allowanceFormValues, account: e.currentTarget.value });
  };

  const handleTozziChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (numberRegex.test(e.currentTarget.value)) {
      setAllowanceFormValues({ ...allowanceFormValues, tozziDucks: e.currentTarget.value });
    }
  };

  const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (numberRegex.test(e.currentTarget.value)) {
      setAllowanceFormValues({ ...allowanceFormValues, customDucks: e.currentTarget.value });
    }
  };

  const handleSetAllowance = () => {
    try {
      const { account, tozziDucks, customDucks } = allowanceFormValues;
      send(account, [tozziDucks, customDucks]);
      // eslint-disable-next-line no-console
      console.log('wtf');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('wtf');
      // @ts-ignore
      setAltMessage({ message: getCustomErrorText(e.message) });
    }
  };

  const handleReset = () => {
    setAllowanceAccount('');
    setAllowanceFormValues({});
  };

  return (
    <AdminFormWrapper>
      <div className="flex flex-col h-full space-y-4 relative">
        <div>
          <div className="pixel-font-thin mt-1">
            <FormInput
              className="w-full"
              placeholder="ACCOUNT #"
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
          <div className="text-base">SET DUCK ALLOWANCE</div>
          <div className="pixel-font-thin">
            <div className="items-center flex text-2xl">ACCOUNT</div>
            <FormInput
              className="w-full"
              value={allowanceFormValues?.account || ''}
              onChange={handleAccountChange}
            />
          </div>
          <div className="pixel-font-thin space-x-2 text-2xl flex justify-between">
            <div className="flex-1">
              <div># TOZZI DUCKS</div>
              <FormInput
                className="w-full"
                value={allowanceFormValues?.tozziDucks?.toString() || ''}
                onChange={handleTozziChange}
              />
            </div>
            <div className="flex-1">
              <div># CUSTOM DUCKS</div>
              <FormInput
                className="w-full"
                value={allowanceFormValues?.customDucks?.toString() || ''}
                onChange={handleCustomChange}
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 flex space-x-2 text-sm">
            <FormButton label="Reset" onClick={handleReset} />
            <FormButton label="Submit" onClick={handleSetAllowance} />
          </div>
        </div>

      </div>
    </AdminFormWrapper>
  );
};

export default AllowancesForm;
