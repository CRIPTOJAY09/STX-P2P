import { ethers } from 'ethers';
import { walletProvider } from './provider';
import { NETWORK_CONFIG } from '../../config/blockchain';
import type { TransactionResult } from './types';

const PLATFORM_FEE = 0.0002; // 0.02%
const PLATFORM_WALLET = '0x1234567890123456789012345678901234567890'; // Replace with actual platform wallet

export class TransactionService {
  private contract: ethers.Contract;

  constructor() {
    this.contract = walletProvider.getContract(
      NETWORK_CONFIG.tokens.USDT.address,
      NETWORK_CONFIG.tokens.USDT.abi
    );
  }

  calculateFee(amount: string): string {
    const parsedAmount = ethers.parseUnits(amount, NETWORK_CONFIG.tokens.USDT.decimals);
    const fee = (parsedAmount * BigInt(Math.floor(PLATFORM_FEE * 10000))) / BigInt(10000);
    return ethers.formatUnits(fee, NETWORK_CONFIG.tokens.USDT.decimals);
  }

  async withdraw(
    fromWallet: ethers.Wallet,
    toAddress: string,
    amount: string
  ): Promise<TransactionResult> {
    try {
      const fee = this.calculateFee(amount);
      const withdrawalAmount = ethers.parseUnits(amount, NETWORK_CONFIG.tokens.USDT.decimals);
      const feeAmount = ethers.parseUnits(fee, NETWORK_CONFIG.tokens.USDT.decimals);

      // Send fee to platform wallet
      const feeTx = await this.contract.connect(fromWallet).transfer(
        PLATFORM_WALLET,
        feeAmount
      );
      await feeTx.wait();

      // Send main amount to recipient
      const withdrawalTx = await this.contract.connect(fromWallet).transfer(
        toAddress,
        withdrawalAmount
      );
      await withdrawalTx.wait();

      return {
        success: true,
        txHash: withdrawalTx.hash
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Withdrawal failed'
      };
    }
  }
}

export const transactionService = new TransactionService();