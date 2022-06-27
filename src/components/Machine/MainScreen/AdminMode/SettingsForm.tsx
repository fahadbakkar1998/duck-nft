import { useState, useEffect } from 'react';
import { useContractFunction } from '@usedapp/core';
import { utils } from 'ethers';
import { MintStatus } from '../../../../types/types';
import FormToggle from './common/FormToggle';
import FormInput from './common/FormInput';
import FormButton from './common/FormButton';
import { useMachineContract } from '../../../../hooks/machine';
import { useMachineState } from '../../../../state/hooks';
import AdminFormWrapper from './AdminFormWrapper';
import { numberRegex, decimalRegex } from '../../../../utils/constants';
import { useTxNotifier } from '../../../../hooks/transaction';
import useMachineStore from '../../../../store';

const SettingsForm = () => {
  const { data: machineState, isLoading } = useMachineState();
  const [tozziStatus, setTozziStatus] = useState<MintStatus|undefined>();
  const [customStatus, setCustomStatus] = useState<MintStatus|undefined>();
  const [tozziPrice, setTozziPrice] = useState<string>();
  const [customPrice, setCustomPrice] = useState<string>();
  const [maxDucks, setMaxDucks] = useState<string>();
  const contract = useMachineContract();
  const { send, state } = useContractFunction(contract, 'setMachineConfig');
  const { setAltMessage } = useMachineStore();

  useTxNotifier(
    {
      mining: 'Update in progress',
      success: 'Settings updated! ',
    },
    state,
  );

  useEffect(() => {
    if (machineState) {
      resetForm();
    }
  }, [machineState]);

  const resetForm = () => {
    if (machineState?.config) {
      const { config } = machineState;
      setTozziStatus(config.tozziMintStatus);
      setCustomStatus(config.customMintStatus);
      setTozziPrice(config.tozziMintPrice);
      setCustomPrice(config.customMintPrice);
      setMaxDucks(`${config.maxCustomDucks}`);
    }
  };

  const handleSubmission = () => {
    try {
      send([
        utils.parseEther(tozziPrice ?? ''),
        utils.parseEther(customPrice ?? ''),
        maxDucks,
        tozziStatus,
        customStatus,
      ]);
    } catch (e) {
      setAltMessage({ message: 'Oh Quack! Something went wrong!' });
    }
  };

  return (
    <AdminFormWrapper>
      <div className="flex flex-col h-full space-y-2 relative">
        <div className="mb-2">
          <div className="flex justify-between pixel-font-thin">
            <div className="flex-1 pixel-font text-base mb-1">TOZZI DUCKS</div>
            <div className="flex flex-1 space-x-2 items-center">
              <FormToggle
                label="ON"
                isSelected={tozziStatus === MintStatus.Enabled}
                onToggle={() => setTozziStatus(MintStatus.Enabled)}
              />
              <FormToggle
                label="OFF"
                isSelected={tozziStatus === MintStatus.Disabled}
                onToggle={() => setTozziStatus(MintStatus.Disabled)}
              />
              <FormToggle
                label="ALLOW"
                isSelected={tozziStatus === MintStatus.Allowance}
                onToggle={() => setTozziStatus(MintStatus.Allowance)}
              />
            </div>
          </div>
          <div className="flex justify-between pixel-font-thin mt-2">
            <div className="items-center flex flex-1 text-2xl">PRICE</div>
            <FormInput
              className="flex-1"
              value={tozziPrice ?? ''}
              overlay="ETH"
              onChange={(e) => { if (decimalRegex.test(e.currentTarget.value)) setTozziPrice(e.currentTarget.value); }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between pixel-font-thin">
            <div className="text-base pixel-font flex-1 mb-1">CUSTOM DUCKS</div>
            <div className="flex flex-1 space-x-2 items-center">
              <FormToggle
                label="Enabled"
                isSelected={customStatus === MintStatus.Enabled}
                onToggle={() => setCustomStatus(MintStatus.Enabled)}
              />
              <FormToggle
                label="Disabled"
                isSelected={customStatus === MintStatus.Disabled}
                onToggle={() => setCustomStatus(MintStatus.Disabled)}
              />
              <FormToggle
                label="Allowance"
                isSelected={customStatus === MintStatus.Allowance}
                onToggle={() => setCustomStatus(MintStatus.Allowance)}
              />
            </div>
          </div>
          <div className="flex justify-between pixel-font-thin mt-2">
            <div className="items-center flex-1 text-2xl">PRICE</div>
            <FormInput
              className="flex-1"
              value={customPrice ?? ''}
              overlay="ETH"
              onChange={(e) => { if (decimalRegex.test(e.currentTarget.value)) setCustomPrice(e.currentTarget.value); }}
            />
          </div>
          <div className="flex justify-between pixel-font-thin mt-2">
            <div className="items-center flex-1 text-2xl">MAX CUSTOM DUCKS</div>
            <FormInput
              className="flex-1"
              value={maxDucks ?? ''}
              onChange={(e) => { if (numberRegex.test(e.currentTarget.value)) setMaxDucks(e.currentTarget.value); }}
            />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 flex space-x-2">
          <FormButton label="Reset" onClick={resetForm} />
          <FormButton label="Submit" onClick={handleSubmission} />
        </div>
      </div>
    </AdminFormWrapper>
  );
};

export default SettingsForm;
