import { mainnet, sepolia } from "viem/chains";
import { createConfig, http } from "wagmi";

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rabbyWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Other',
      wallets: [ metaMaskWallet, rabbyWallet ,walletConnectWallet],
    },
  ],
  {
    appName: 'BorrowFi',
    projectId: 'YOUR_PROJECT_ID',
  }
);

export const config = createConfig({
  connectors,
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
});
