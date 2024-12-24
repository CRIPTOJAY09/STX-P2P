import { ethers } from 'ethers';
import { NETWORK_CONFIG } from '../config/blockchain';
import { encryptPrivateKey, decryptPrivateKey } from './encryption';
import type { WalletData, EncryptedWallet } from './types';

class WalletManager {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(NETWORK_CONFIG.rpcUrl);
  }

  async createWallet(): Promise<WalletData> {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  }

  async encryptWallet(wallet: WalletData): Promise<EncryptedWallet> {
    const encryptedKey = await encryptPrivateKey(wallet.privateKey);
    return {
      address: wallet.address,
      encryptedPrivateKey: encryptedKey,
    };
  }

  async decryptWallet(encryptedWallet: EncryptedWallet): Promise<WalletData> {
    const privateKey = await decryptPrivateKey(encryptedWallet.encryptedPrivateKey);
    return {
      address: encryptedWallet.address,
      privateKey,
    };
  }

  async getWalletBalance(address: string): Promise<string> {
    const contract = new ethers.Contract(
      NETWORK_CONFIG.tokens.USDT.address,
      NETWORK_CONFIG.tokens.USDT.abi,
      this.provider
    );

    const balance = await contract.balanceOf(address);
    return ethers.formatUnits(balance, NETWORK_CONFIG.tokens.USDT.decimals);
  }

  validateAddress(address: string): boolean {
    return ethers.isAddress(address);
  }
}

export const walletManager = new WalletManager();