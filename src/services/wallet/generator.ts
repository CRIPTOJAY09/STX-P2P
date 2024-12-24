import { ethers } from 'ethers';
import type { WalletCredentials } from './types';

export class WalletGenerator {
  async generateWallet(): Promise<WalletCredentials> {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey
    };
  }

  validateAddress(address: string): boolean {
    return ethers.isAddress(address);
  }
}

export const walletGenerator = new WalletGenerator();