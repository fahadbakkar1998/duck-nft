import { useCallback, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { TransactionStatus } from '@usedapp/core';
import useMachineStore from '../store';
import { getCustomErrorText } from '../utils/helpers';
import { TxMessages } from '../types/types';

export const useTxNotifier = (
  messages: TxMessages,
  txStatus: TransactionStatus,
) => {
  const { setAltMessage, setIsLocked, setMachineMood } = useMachineStore();
  const queryClient = useQueryClient();

  const handleOnSigning = useCallback(() => {
    const message = messages.signing || 'Signature Pending...';
    setAltMessage({ message });
  }, []);

  const handleOnMining = useCallback((tx: any) => {
    const message = messages.mining || 'Processing Transaction';
    setIsLocked(true);
    setAltMessage({ message, txHash: tx?.hash });
    setMachineMood('happy');
  }, [setAltMessage]);

  const handleOnSuccess = useCallback((tx: any) => {
    const message = messages.success || 'Success!';
    setIsLocked(false);
    queryClient.invalidateQueries();
    setAltMessage({ message, txHash: tx?.hash });
    setMachineMood(undefined);
  }, [queryClient]);

  const handleOnException = useCallback(() => {
    const { errorMessage } = txStatus;
    const message = getCustomErrorText(errorMessage);
    setAltMessage({ message });
    setMachineMood('sad');
    setTimeout(() => { setMachineMood(undefined); }, 200);
    setIsLocked(false);
  }, [setAltMessage]);

  useEffect(() => {
    const { status } = txStatus;
    if (status === 'PendingSignature') handleOnSigning();
    if (status === 'Mining') handleOnMining(txStatus.transaction);
    if (status === 'Success') handleOnSuccess(txStatus.transaction);
    if (status === 'Exception') handleOnException();
  }, [txStatus, handleOnMining, handleOnSuccess, handleOnException]);
};
