import { ethers } from 'ethers';
import { NETWORK_CONFIG, TOKENS, USDT_ABI } from '../config/blockchain';
import { crypto } from './crypto';

export interface WalletData {
  address: string;
  privateKey: string;
}

export interface EncryptedWallet {
  address: string;
  encryptedPrivateKey: string;
}

class WalletManager {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(NETWORK_CONFIG.rpcUrl);
  }

  // Generate a new wallet
  async createWallet(): Promise<WalletData> {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  }

  // Encrypt wallet data for storage
  encryptWallet(wallet: WalletData): EncryptedWallet {
    return {
      address: wallet.address,
      encryptedPrivateKey: crypto.encrypt(wallet.privateKey),
    };
  }

  // Decrypt wallet data for usage
  decryptWallet(encryptedWallet: EncryptedWallet): WalletData {
    return {
      address: encryptedWallet.address,
      privateKey: crypto.decrypt(encryptedWallet.encryptedPrivateKey),
    };
  }

  // Get USDT balance for a wallet
  async getUSDTBalance(address: string): Promise<string> {
    const contract = new ethers.Contract(
      TOKENS.USDT.address,
      USDT_ABI,
      this.provider
    );

    const balance = await contract.balanceOf(address);
    return ethers.formatUnits(balance, TOKENS.USDT.decimals);
  }

  // Get native token (BNB) balance
  async getNativeBalance(address: string): Promise<string> {
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }
}

export const walletManager = new WalletManager();