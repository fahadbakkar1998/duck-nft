import { useState } from 'react';
import { shortenAddress } from '@usedapp/core';
import { constants } from 'ethers';
import { MintStatus } from '../../../../types/types';
import FormInput from './common/FormInput';
import FormButton from './common/FormButton';
import { useMachineState } from '../../../../state/hooks';

const config = {
  tozziMintStatus: MintStatus.Enabled,
  tozziMintPrice: '0.5',
  customMintStatus: MintStatus.Disabled,
  customMintPrice: '0.5',
  maxCustomDucks: 10,
};

interface Allowance {
  tozziDucks: string;
  customDucks: string;
}

interface AllowanceFormValues extends Allowance {
  account: string;
}

const owner = constants.AddressZero;
const balance = '100';

const AccountingForm = () => {
  const { data: machineState } = useMachineState();
  const [value, setValue] = useState('');
  const handleWithdraw = () => {};

  return (
    <div className="flex mt-4 flex-col space-y-2 h-full relative">
      <div>OWNER</div>
      <div className="pixel-font-thin text-xl">
        { machineState?.owner ? shortenAddress(machineState.owner) : '--'}
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
  );
};

export default AccountingForm;
