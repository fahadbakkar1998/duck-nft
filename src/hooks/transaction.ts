import { useCallback, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import useSound from 'use-sound';
import { TransactionStatus } from '@usedapp/core';
import useMachineStore from '../store';
import { getCustomErrorText } from '../utils/helpers';
import { TxMessages } from '../types/types';
// @ts-ignore
import success from '../assets/audio/success.mp3';
// @ts-ignore
import mining from '../assets/audio/mining.mp3';
// @ts-ignore
import error from '../assets/audio/error.wav';

const miningAudio = new Audio(mining);
const successAudio = new Audio(success);
const errorAudio = new Audio(error);

export const useTxNotifier = (
  messages: TxMessages,
  txStatus: TransactionStatus,
  successCallback?: Function,
) => {
  const { setAltMessage, setIsLocked, setMachineMood } = useMachineStore();
  const queryClient = useQueryClient();
  const [playSuccess] = useSound(success);
  const handleOnSigning = useCallback(() => {
    const message = messages.signing || 'Signature Pending...';
    setAltMessage({ message });
  }, []);

  const handleOnMining = useCallback((tx: any) => {
    miningAudio.play();
    const message = messages.mining || 'Processing Transaction';
    setIsLocked(true);
    setAltMessage({ message, txHash: tx?.hash });
    setMachineMood('happy');
  }, [setAltMessage]);

  const handleOnSuccess = useCallback((tx: any) => {
    miningAudio.pause();
    miningAudio.currentTime = 0;
    successAudio.play();
    const message = messages.success || 'Success!';
    setIsLocked(false);
    queryClient.invalidateQueries();
    setAltMessage({ message, txHash: tx?.hash });
    setMachineMood(undefined);
    if (successCallback) successCallback();
  }, [queryClient]);

  const handleOnException = useCallback(() => {
    errorAudio.play();
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

    return () => {
      successAudio.remove();
      miningAudio.remove();
    };
  }, [txStatus, handleOnMining, handleOnSuccess, handleOnException]);
};
