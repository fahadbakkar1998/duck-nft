import { ChainId, Config, DAppProvider } from '@usedapp/core';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import useMachineStore from './store';

const CHAIN_ID = process.env.REACT_PUBLIC_ENV === 'production' ? ChainId.Mainnet : ChainId.Rinkeby;
const CHAIN_NAME = CHAIN_ID === 1 ? 'mainnet' : 'rinkeby';
const { REACT_APP_INFURA_API_KEY } = process.env;

const config: Config = {
  readOnlyChainId: CHAIN_ID,
  readOnlyUrls: {
    [CHAIN_ID]: `https://${CHAIN_NAME}.infura.io/v3/${REACT_APP_INFURA_API_KEY}`,
  },
  autoConnect: false,
};

const Providers: React.FC = ({ children }) => {
  const { queryClient } = useMachineStore((state) => state);
  return (
    <DAppProvider config={config}>
      <QueryClientProvider client={queryClient} contextSharing>
        {children}
      </QueryClientProvider>
    </DAppProvider>
  );
};

export default Providers;
