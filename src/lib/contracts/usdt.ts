import { ethers } from 'ethers';
import { TOKENS, USDT_ABI } from '../../config/blockchain';

export class USDTContract {
  private contract: ethers.Contract;

  constructor(provider: ethers.Provider) {
    this.contract = new ethers.Contract(
      TOKENS.USDT.address,
      USDT_ABI,
      provider
    );
  }

  async getBalance(address: string): Promise<string> {
    const balance = await this.contract.balanceOf(address);
    return ethers.formatUnits(balance, TOKENS.USDT.decimals);
  }

  onTransfer(
    to: string,
    callback: (from: string, amount: string) => void
  ): ethers.Contract {
    const filter = this.contract.filters.Transfer(null, to, null);
    
    this.contract.on(filter, (from: string, recipient: string, amount: bigint) => {
      if (recipient.toLowerCase() === to.toLowerCase()) {
        const formattedAmount = ethers.formatUnits(amount, TOKENS.USDT.decimals);
        callback(from, formattedAmount);
      }
    });

    return this.contract;
  }
}