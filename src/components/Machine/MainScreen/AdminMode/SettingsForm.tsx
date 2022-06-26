import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useContractFunction } from '@usedapp/core';
import { utils } from 'ethers';
import { useQueryClient } from 'react-query';
import { MintStatus } from '../../../../types/types';
import FormToggle from './common/FormToggle';
import FormInput from './common/FormInput';
import FormButton from './common/FormButton';
import { useMachineContract } from '../../../../hooks/machine';
import { useMachineState } from '../../../../state/hooks';
import useMachineStore from '../../../../store';
import AdminFormWrapper from './AdminFormWrapper';
import { numberRegex, decimalRegex } from '../../../../utils/constants';

const SettingsForm = () => {
  const queryClient = useQueryClient();
  const { data: machineState, isLoading } = useMachineState();
  const [tozziStatus, setTozziStatus] = useState<MintStatus|undefined>();
  const [customStatus, setCustomStatus] = useState<MintStatus|undefined>();
  const [tozziPrice, setTozziPrice] = useState<string>();
  const [customPrice, setCustomPrice] = useState<string>();
  const [maxDucks, setMaxDucks] = useState<string>();
  const contract = useMachineContract();
  const { send, state } = useContractFunction(
    contract,
    'setMachineConfig',
    { transactionName: 'Update Config' },
  );

  const {
    setAltMessage,
    setMachineMood,
    isLocked,
    setIsLocked,
  } = useMachineStore();

  useEffect(() => {
    if (state?.status === 'Mining') {
      setAltMessage('Update Processing...');
      setIsLocked(true);
      setMachineMood('happy');
    } else if (state?.status === 'Success') {
      setAltMessage('Settings Updated!');
      setMachineMood(undefined);
      setIsLocked(false);
      queryClient.invalidateQueries('machineState');
    } else if (state?.status === 'PendingSignature') {
      setAltMessage('Signature Pending...');
    } else if (state?.status === 'Exception') {
      const denied = 'MetaMask Tx Signature: User denied transaction signature.';
      if (state?.errorMessage === denied) {
        setAltMessage('Well, nevermind then...');
      } else {
        setAltMessage('Oh Quack! something went wrong!');
      }
      setMachineMood('sad');
      setIsLocked(false);
      setTimeout(() => setMachineMood(undefined), 500);
    }
  }, [state.status]);

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
    send([
      utils.parseEther(tozziPrice ?? ''),
      utils.parseEther(customPrice ?? ''),
      maxDucks,
      tozziStatus,
      customStatus,
    ]);
  };

  return (
    <AdminFormWrapper>
      <div className="flex flex-col h-full space-y-2 relative">
        <div>
          <div>TOZZI DUCKS</div>
          <div className="flex justify-between pixel-font-thin">
            <div className="items-center flex text-2xl">Minting</div>
            <div className="flex w-3/5 space-x-2 items-center">
              <FormToggle
                label="Enabled"
                isSelected={tozziStatus === MintStatus.Enabled}
                onToggle={() => setTozziStatus(MintStatus.Enabled)}
              />
              <FormToggle
                label="Disabled"
                isSelected={tozziStatus === MintStatus.Disabled}
                onToggle={() => setTozziStatus(MintStatus.Disabled)}
              />
              <FormToggle
                label="Allowance"
                isSelected={tozziStatus === MintStatus.Allowance}
                onToggle={() => setTozziStatus(MintStatus.Allowance)}
              />
            </div>
          </div>
          <div className="flex justify-between pixel-font-thin mt-2">
            <div className="items-center flex text-2xl">Price</div>
            <FormInput
              className="w-3/5"
              value={tozziPrice ?? ''}
              overlay="ETH"
              onChange={(e) => { if (decimalRegex.test(e.currentTarget.value)) setTozziPrice(e.currentTarget.value); }}
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
            <div className="items-center flex text-2xl">Price</div>
            <FormInput
              className="w-3/5"
              value={customPrice ?? ''}
              overlay="ETH"
              onChange={(e) => { if (decimalRegex.test(e.currentTarget.value)) setCustomPrice(e.currentTarget.value); }}
            />
          </div>
          <div className="flex justify-between pixel-font-thin mt-2">
            <div className="items-center flex text-2xl">Max Ducks</div>
            <FormInput
              className="w-3/5"
              value={maxDucks ?? ''}
              onChange={(e) => { if (numberRegex.test(e.currentTarget.value)) setMaxDucks(e.currentTarget.value); }}
            />
          </div>
        </div>
        <div className="absolute -bottom-1 right-0 flex space-x-2">
          <FormButton label="Reset" onClick={resetForm} />
          <FormButton label="Submit" onClick={handleSubmission} />
        </div>
      </div>
    </AdminFormWrapper>
  );
};

export default SettingsForm;
