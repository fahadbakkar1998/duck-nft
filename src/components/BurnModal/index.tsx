import { FC, useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';
import { useQueryClient } from 'react-query';
import { Html } from '@react-three/drei';
import { useContractFunction } from '@usedapp/core';
import useMachineStore from '../../store';
import { minViewLength } from '../../utils/constants';
import { contract } from '../../utils/functions';
import './index.scss';

const BurnModal: FC = (props: any) => {
  const {
    currentAdminDuckId,
    setProcessing,
    setTransactionStatus,
  } = useMachineStore();
  const queryClient = useQueryClient();
  const { send, state } = useContractFunction(contract, 'burnRenegadeDuck');
  const { onCloseModal } = props;

  const { viewport } = useThree();
  const min = viewport.width;
  const reasonRef = useRef<any>(null);

  useEffect(() => {
    const { status } = state;
    if (status === 'Mining') {
      setProcessing(true);
      setTransactionStatus('processing...');
    }
    if (status === 'Success') {
      setTransactionStatus('None');
      setProcessing(false);
      onCloseModal();
      queryClient.invalidateQueries();
      // TODO fN to set the setCurrentAdminDuckId
    }
  }, [onCloseModal, queryClient, setProcessing, setTransactionStatus, state]);

  const handleBurnRenegadeDuck = () => {
    const canBurn = currentAdminDuckId && reasonRef.current.value;
    if (canBurn) {
      const reason = reasonRef.current.value;
      send(currentAdminDuckId, reason);
    } else {
      reasonRef.current.focus();
    }
  };

  return (
    <Html
      scale={[
        (0.3 * min) / minViewLength,
        (0.2 * min) / minViewLength,
        (1 * min) / minViewLength,
      ]}
      position={[0, 0, 0.2]}
      rotation={[0.0, 0.0, 0.0]}
      transform
    >
      {props.openModal && (
        <div className="BurnModal">
          <div className="_close" onClick={props.onCloseModal} />
          <div className="_container">
            <textarea className="_reason" ref={reasonRef} rows={5} />
            <div
              className="_btn-burn"
              onClick={handleBurnRenegadeDuck}
            >
              Burn
            </div>
          </div>
        </div>
      )}
    </Html>
  );
};

export default BurnModal;
