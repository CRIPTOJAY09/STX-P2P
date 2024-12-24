import { ethers } from 'ethers';
import { TOKENS } from '../../config/blockchain';
import { USDTContract } from '../contracts/usdt';
import type { EscrowData, EscrowValidation } from './types';

export class EscrowManager {
  private usdtContract: USDTContract;
  private escrowData: Map<string, EscrowData>;

  constructor(provider: ethers.Provider) {
    this.usdtContract = new USDTContract(provider);
    this.escrowData = new Map();
  }

  async validateAndLock(
    escrowId: string,
    buyerAddress: string,
    amount: string
  ): Promise<EscrowValidation> {
    try {
      const balance = await this.usdtContract.getBalance(buyerAddress);
      const requiredAmount = ethers.parseUnits(amount, TOKENS.USDT.decimals);
      const availableBalance = ethers.parseUnits(balance, TOKENS.USDT.decimals);

      if (requiredAmount > availableBalance) {
        return {
          isValid: false,
          error: 'Insufficient balance for escrow',
        };
      }

      return { isValid: true };
    } catch (err) {
      return {
        isValid: false,
        error: 'Failed to validate escrow balance',
      };
    }
  }

  async createEscrow(
    tradeId: string,
    buyerAddress: string,
    sellerAddress: string,
    amount: string
  ): Promise<EscrowData | null> {
    const escrowId = ethers.id(Date.now().toString());
    
    const validation = await this.validateAndLock(escrowId, buyerAddress, amount);
    if (!validation.isValid) {
      return null;
    }

    const escrow: EscrowData = {
      id: escrowId,
      tradeId,
      buyerAddress,
      sellerAddress,
      amount,
      status: 'locked',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };

    this.escrowData.set(escrowId, escrow);
    return escrow;
  }

  async releaseEscrow(
    escrowId: string,
    signer: ethers.Wallet
  ): Promise<{ success: boolean; error?: string }> {
    const escrow = this.escrowData.get(escrowId);
    if (!escrow || escrow.status !== 'locked') {
      return { success: false, error: 'Invalid escrow or status' };
    }

    try {
      const tx = await this.usdtContract.contract.connect(signer).transfer(
        escrow.sellerAddress,
        ethers.parseUnits(escrow.amount, TOKENS.USDT.decimals)
      );
      await tx.wait();

      escrow.status = 'released';
      this.escrowData.set(escrowId, escrow);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to release escrow',
      };
    }
  }

  async refundEscrow(
    escrowId: string,
    signer: ethers.Wallet
  ): Promise<{ success: boolean; error?: string }> {
    const escrow = this.escrowData.get(escrowId);
    if (!escrow || escrow.status !== 'locked') {
      return { success: false, error: 'Invalid escrow or status' };
    }

    try {
      const tx = await this.usdtContract.contract.connect(signer).transfer(
        escrow.buyerAddress,
        ethers.parseUnits(escrow.amount, TOKENS.USDT.decimals)
      );
      await tx.wait();

      escrow.status = 'refunded';
      this.escrowData.set(escrowId, escrow);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to refund escrow',
      };
    }
  }

  getEscrow(escrowId: string): EscrowData | undefined {
    return this.escrowData.get(escrowId);
  }

  checkExpiredEscrows(): string[] {
    const now = new Date();
    const expiredIds: string[] = [];

    this.escrowData.forEach((escrow, id) => {
      if (escrow.status === 'locked' && escrow.expiresAt < now) {
        escrow.status = 'expired';
        this.escrowData.set(id, escrow);
        expiredIds.push(id);
      }
    });

    return expiredIds;
  }
}