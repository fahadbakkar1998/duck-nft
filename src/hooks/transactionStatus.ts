import { useCallback, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { TransactionStatus } from '@usedapp/core';
import useMachineStore from '../store';
import { getCustomErrorText } from '../utils/helpers';

interface TxMessages {
  signing?: string;
  mining?: string;
  success?: string;
  exception?: string;
}

export const useTxNotifier = (messages: TxMessages, txStatus: TransactionStatus) => {
  const { setAltMessage, setIsLocked, setMachineMood } = useMachineStore();
  const queryClient = useQueryClient();

  const handleOnSigning = useCallback(() => {
    setAltMessage(messages.signing || 'Signature Pending...');
  }, []);

  const handleOnMining = useCallback(() => {
    setIsLocked(true);
    setAltMessage(messages.mining || 'Processing Transaction...');
    setMachineMood('happy');
  }, [setAltMessage]);

  const handleOnSuccess = useCallback(() => {
    setIsLocked(false);
    queryClient.invalidateQueries();
    setAltMessage(messages.success || 'Success!');
    setMachineMood(undefined);
  }, [queryClient]);

  const handleOnException = useCallback(() => {
    const { errorMessage } = txStatus;
    setAltMessage(getCustomErrorText(errorMessage));
    setMachineMood('sad');
    setTimeout(() => { setMachineMood(undefined); }, 200);
    setIsLocked(false);
  }, [setAltMessage]);

  useEffect(() => {
    const { status } = txStatus;
    if (status === 'PendingSignature') handleOnSigning();
    if (status === 'Mining') handleOnMining();
    if (status === 'Success') handleOnSuccess();
    if (status === 'Exception') handleOnException();
  }, [txStatus, handleOnMining, handleOnSuccess, handleOnException]);
};
