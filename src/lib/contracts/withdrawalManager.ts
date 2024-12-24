import { ethers } from 'ethers';
import { TOKENS, NETWORK_CONFIG } from '../../config/blockchain';
import { USDTContract } from './usdt';

const PLATFORM_FEE = 0.0002; // 0.02%
const STX_WALLET = process.env.STX_MAIN_WALLET || '';

export class WithdrawalManager {
  private provider: ethers.JsonRpcProvider;
  private usdtContract: USDTContract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(NETWORK_CONFIG.rpcUrl);
    this.usdtContract = new USDTContract(this.provider);
  }

  calculateFee(amount: string): string {
    const parsedAmount = ethers.parseUnits(amount, TOKENS.USDT.decimals);
    const fee = (parsedAmount * BigInt(Math.floor(PLATFORM_FEE * 10000))) / BigInt(10000);
    return ethers.formatUnits(fee, TOKENS.USDT.decimals);
  }

  async validateWithdrawal(
    fromAddress: string,
    amount: string
  ): Promise<{ isValid: boolean; error?: string }> {
    try {
      const balance = await this.usdtContract.getBalance(fromAddress);
      const withdrawalAmount = ethers.parseUnits(amount, TOKENS.USDT.decimals);
      const currentBalance = ethers.parseUnits(balance, TOKENS.USDT.decimals);
      const fee = ethers.parseUnits(this.calculateFee(amount), TOKENS.USDT.decimals);
      const totalRequired = withdrawalAmount + fee;

      if (totalRequired > currentBalance) {
        return {
          isValid: false,
          error: 'Insufficient balance including fee',
        };
      }

      return { isValid: true };
    } catch (err) {
      return {
        isValid: false,
        error: 'Failed to validate withdrawal',
      };
    }
  }

  async processWithdrawal(
    fromWallet: ethers.Wallet,
    toAddress: string,
    amount: string
  ): Promise<{ success: boolean; txHash?: string; error?: string }> {
    try {
      const validation = await this.validateWithdrawal(fromWallet.address, amount);
      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }

      const fee = this.calculateFee(amount);
      const withdrawalAmount = ethers.parseUnits(amount, TOKENS.USDT.decimals);
      const feeAmount = ethers.parseUnits(fee, TOKENS.USDT.decimals);

      // Send fee to platform wallet
      const feeTx = await this.usdtContract.contract.connect(fromWallet).transfer(
        STX_WALLET,
        feeAmount
      );
      await feeTx.wait();

      // Send main amount to recipient
      const withdrawalTx = await this.usdtContract.contract.connect(fromWallet).transfer(
        toAddress,
        withdrawalAmount
      );
      await withdrawalTx.wait();

      return {
        success: true,
        txHash: withdrawalTx.hash,
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error during withdrawal',
      };
    }
  }
}