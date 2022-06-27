import { ChainId } from '@usedapp/core';
import { FC } from 'react';
import { AltMessage } from '../../../types/types';

const CHAIN_ID = process.env.REACT_PUBLIC_ENV === 'production' ? ChainId.Mainnet : ChainId.Rinkeby;
const etherscanUrl = CHAIN_ID === 1 ? 'etherscan.io' : 'rinkeby.etherscan.io';

const TxNotification: FC<AltMessage> = ({ message, txHash }) => {
  const url = `https://${etherscanUrl}/tx/${txHash}`;
  return (
    <div className="uppercase">
      {message}
      {!!txHash && (
        <>
          {' ... '}
          <a className="hover:underline text-orange-300 hover:text-orange-500 transition" href={url} target="_blank" rel="noreferrer">
            Check TX
          </a>
        </>
      )}
    </div>
  );
};

export default TxNotification;
