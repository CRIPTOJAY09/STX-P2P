import { ethers } from 'ethers';
import { NETWORK_CONFIG } from '../../config/blockchain';

export class WalletProvider {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(NETWORK_CONFIG.rpcUrl);
  }

  getProvider(): ethers.JsonRpcProvider {
    return this.provider;
  }

  getContract(address: string, abi: string[]): ethers.Contract {
    return new ethers.Contract(address, abi, this.provider);
  }
}

export const walletProvider = new WalletProvider();