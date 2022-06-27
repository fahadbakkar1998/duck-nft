import { useState, ChangeEvent } from 'react';
import { utils } from 'ethers';
import { shortenAddress, useContractFunction } from '@usedapp/core';
import FormInput from './common/FormInput';
import FormButton from './common/FormButton';
import { useMachineState } from '../../../../state/hooks';
import AdminFormWrapper from './AdminFormWrapper';
import { useMachineContract } from '../../../../hooks/machine';
import useMachineStore from '../../../../store';
import { decimalRegex } from '../../../../utils/constants';
import { useTxNotifier } from '../../../../hooks/transaction';
import { getCustomErrorText } from '../../../../utils/helpers';

const AccountingForm = () => {
  const [value, setValue] = useState('');
  const { data: machineState } = useMachineState();
  const ownerDisplay = machineState?.ownerEns || shortenAddress(machineState?.owner || '');
  const { setAltMessage } = useMachineStore();

  const contract = useMachineContract();
  const { send, state } = useContractFunction(contract, 'withdraw');
  useTxNotifier(
    {
      mining: 'Processing withdrawal',
      success: 'Withdrawal successful',
    },
    state,
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (decimalRegex.test(e.currentTarget.value)) setValue(e.currentTarget.value);
  };

  const handleWithdraw = () => {
    if (!value) {
      setAltMessage({ message: 'Enter amount to withdraw, plz' });
      return;
    }
    try {
      send(
        machineState?.owner,
        utils.parseEther(value ?? ''),
      );
    } catch (e) {
      setAltMessage(getCustomErrorText(undefined));
    }
  };

  return (
    <AdminFormWrapper>
      <div className="flex flex-col space-y-2 h-full relative">
        <div className="flex">
          <div className="flex-1">
            <div className="text-lg">OWNER</div>
            <div className="pixel-font-thin text-2xl">
              <a
                target="_blank"
                href={`https://opensea.io/${machineState?.owner}`}
                rel="noreferrer"
                className="text-orange-300 hover:text-orange-500 transition"
              >
                { ownerDisplay}
              </a>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-lg">BALANCE</div>
            <div className="pixel-font-thin text-2xl">
              { machineState?.balance ?? '--'} ETH
            </div>
          </div>
        </div>
        <div className="text-lg">WITHDRAW</div>
        <div className="pixel-font-thin">
          <FormInput
            className="w-full"
            value={value}
            overlay="ETH"
            onChange={handleOnChange}
          />
        </div>
        <div className="absolute bottom-0 right-0 flex space-x-2 text-sm">
          <FormButton label="Reset" onClick={() => setValue('')} />
          <FormButton label="Submit" onClick={handleWithdraw} />
        </div>

      </div>
    </AdminFormWrapper>
  );
};

export default AccountingForm;
