import { ethers } from 'ethers';
import { walletProvider } from './provider';
import { NETWORK_CONFIG } from '../../config/blockchain';
import { fetchUSDTPrice } from '../api/binance';
import type { WalletBalance } from './types';

export class BalanceService {
  private contract: ethers.Contract;

  constructor() {
    this.contract = walletProvider.getContract(
      NETWORK_CONFIG.tokens.USDT.address,
      NETWORK_CONFIG.tokens.USDT.abi
    );
  }

  async getBalance(address: string): Promise<WalletBalance> {
    const balanceWei = await this.contract.balanceOf(address);
    const usdtBalance = ethers.formatUnits(balanceWei, NETWORK_CONFIG.tokens.USDT.decimals);
    const rates = await fetchUSDTPrice();

    return {
      usdt: usdtBalance,
      usd: (parseFloat(usdtBalance) * rates.usd).toFixed(2),
      eur: (parseFloat(usdtBalance) * rates.eur).toFixed(2)
    };
  }
}

export const balanceService = new BalanceService();