import { ethers } from 'ethers';
import { NETWORK_CONFIG } from '../config/blockchain';

export class WalletService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(NETWORK_CONFIG.rpcUrl);
  }

  async generateWallet(): Promise<{ address: string; privateKey: string }> {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  }

  async getBalance(address: string): Promise<string> {
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

export const walletService = new WalletService();