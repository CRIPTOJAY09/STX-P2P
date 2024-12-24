import { ethers } from 'ethers';
import { FEE_CONFIG, STX_FEE_WALLET } from './config';
import type { FeeCalculation, FeeValidation, FeeTransferResult } from './types';
import { USDTContract } from '../contracts/usdt';
import { NETWORK_CONFIG } from '../../config/blockchain';

export class FeeManager {
  private provider: ethers.JsonRpcProvider;
  private usdtContract: USDTContract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(NETWORK_CONFIG.rpcUrl);
    this.usdtContract = new USDTContract(this.provider);
  }

  calculateTradeFee(amount: string): FeeCalculation {
    const parsedAmount = ethers.parseUnits(amount, 18);
    const feeAmount = (parsedAmount * BigInt(Math.floor(FEE_CONFIG.tradeFeePercentage * 10000))) / BigInt(10000);
    const total = parsedAmount + feeAmount;

    return {
      amount: ethers.formatUnits(parsedAmount, 18),
      fee: ethers.formatUnits(feeAmount, 18),
      total: ethers.formatUnits(total, 18),
    };
  }

  calculateWithdrawalFee(amount: string): FeeCalculation {
    const parsedAmount = ethers.parseUnits(amount, 18);
    const feeAmount = (parsedAmount * BigInt(Math.floor(FEE_CONFIG.withdrawalFeePercentage * 10000))) / BigInt(10000);
    const total = parsedAmount - feeAmount; // Fee is deducted from withdrawal amount

    return {
      amount: ethers.formatUnits(parsedAmount, 18),
      fee: ethers.formatUnits(feeAmount, 18),
      total: ethers.formatUnits(total, 18),
    };
  }

  async validateFeePayment(
    fromAddress: string,
    amount: string
  ): Promise<FeeValidation> {
    try {
      const balance = await this.usdtContract.getBalance(fromAddress);
      const { total } = this.calculateTradeFee(amount);
      const requiredAmount = ethers.parseUnits(total, 18);
      const availableBalance = ethers.parseUnits(balance, 18);

      if (requiredAmount > availableBalance) {
        return {
          isValid: false,
          error: 'Insufficient balance to cover amount plus fees',
        };
      }

      return { isValid: true };
    } catch (err) {
      return {
        isValid: false,
        error: 'Failed to validate fee payment',
      };
    }
  }

  async transferFee(
    fromWallet: ethers.Wallet,
    amount: string
  ): Promise<FeeTransferResult> {
    try {
      const { fee } = this.calculateTradeFee(amount);
      const feeAmount = ethers.parseUnits(fee, 18);

      const tx = await this.usdtContract.contract.connect(fromWallet).transfer(
        STX_FEE_WALLET,
        feeAmount
      );
      await tx.wait();

      return {
        success: true,
        txHash: tx.hash,
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to transfer fee',
      };
    }
  }
}