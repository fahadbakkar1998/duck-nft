/* eslint-disable no-console */
import { useState } from 'react';
import { shortenAddress, useContractFunction, useLookupAddress } from '@usedapp/core';
import { constants } from 'ethers';
import { MintStatus } from '../../../../types/types';
import FormInput from './common/FormInput';
import FormButton from './common/FormButton';
import { useMachineState, useMachineConfig } from '../../../../state/hooks';
import AdminFormWrapper from './AdminFormWrapper';
import { useEnsOrShort } from '../../../../hooks';

interface Allowance {
  tozziDucks: string;
  customDucks: string;
}

interface AllowanceFormValues extends Allowance {
  account: string;
}

const AccountingForm = () => {
  const [value, setValue] = useState('');
  const handleWithdraw = () => {};
  const { data: machineState, isLoading } = useMachineState();
  const owner = useEnsOrShort(machineState?.owner);

  return (
    <AdminFormWrapper>
      <div className="flex flex-col space-y-2 h-full relative">
        <div>OWNER</div>
        <div className="pixel-font-thin text-xl">
          { owner || '--' }
        </div>
        <div>CURRENT BALANCE</div>
        <div className="pixel-font-thin text-xl">
          { machineState?.balance ?? '--'} ETH
        </div>
        <div>WITHDRAW ETH</div>
        <div className="pixel-font-thin">
          <FormInput
            className="w-full"
            value={value}
            overlay="ETH"
            onChange={(e) => { setValue(e.currentTarget.value); }}
          />
        </div>
        <div className="absolute -bottom-4 -right-4 flex space-x-2 text-sm">
          <FormButton label="Reset" onClick={() => setValue('')} />
          <FormButton label="Submit" onClick={handleWithdraw} />
        </div>

      </div>
    </AdminFormWrapper>
  );
};

export default AccountingForm;
