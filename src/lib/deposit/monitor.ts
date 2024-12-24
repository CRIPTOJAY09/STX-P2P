import { ethers } from 'ethers';
import { USDTContract } from '../contracts/usdt';
import { NETWORK_CONFIG } from '../../config/blockchain';

export class DepositMonitor {
  private provider: ethers.JsonRpcProvider;
  private usdtContract: USDTContract;
  private listeners: Map<string, ethers.Contract>;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(NETWORK_CONFIG.rpcUrl);
    this.usdtContract = new USDTContract(this.provider);
    this.listeners = new Map();
  }

  monitorAddress(
    address: string,
    onDeposit: (from: string, amount: string) => void,
    onError: (error: Error) => void
  ): void {
    try {
      // Remove existing listener if any
      this.stopMonitoring(address);

      // Start new listener
      const contract = this.usdtContract.onTransfer(address, (from, amount) => {
        try {
          onDeposit(from, amount);
        } catch (err) {
          onError(err instanceof Error ? err : new Error('Unknown error in deposit callback'));
        }
      });

      this.listeners.set(address, contract);
    } catch (err) {
      onError(err instanceof Error ? err : new Error('Failed to start deposit monitoring'));
    }
  }

  stopMonitoring(address: string): void {
    const listener = this.listeners.get(address);
    if (listener) {
      listener.removeAllListeners();
      this.listeners.delete(address);
    }
  }

  stopAll(): void {
    for (const address of this.listeners.keys()) {
      this.stopMonitoring(address);
    }
  }
}