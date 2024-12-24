import { PenaltyState, PenaltyConfig, PenaltyResult } from './types';

export class PenaltyManager {
  private config: PenaltyConfig;
  private userPenalties: Map<string, PenaltyState>;

  constructor(config?: Partial<PenaltyConfig>) {
    this.config = {
      maxCancellations: 3,
      blockDurationHours: 6,
      ...config
    };
    this.userPenalties = new Map();
  }

  private getUserState(userId: string): PenaltyState {
    return (
      this.userPenalties.get(userId) || 
      { canceledOrders: 0 }
    );
  }

  private updateUserState(userId: string, state: PenaltyState): void {
    this.userPenalties.set(userId, state);
  }

  private shouldBlock(canceledOrders: number): boolean {
    return canceledOrders >= this.config.maxCancellations;
  }

  private calculateBlockExpiry(): Date {
    return new Date(
      Date.now() + this.config.blockDurationHours * 60 * 60 * 1000
    );
  }

  isBlocked(userId: string): boolean {
    const state = this.getUserState(userId);
    if (!state.blockedUntil) return false;
    return state.blockedUntil > new Date();
  }

  recordCancellation(userId: string): PenaltyResult {
    if (this.isBlocked(userId)) {
      return {
        success: false,
        blocked: true,
        error: 'User is currently blocked',
        blockedUntil: this.getUserState(userId).blockedUntil
      };
    }

    const state = this.getUserState(userId);
    const newCancelCount = state.canceledOrders + 1;

    if (this.shouldBlock(newCancelCount)) {
      const blockedUntil = this.calculateBlockExpiry();
      this.updateUserState(userId, {
        canceledOrders: newCancelCount,
        blockedUntil
      });

      return {
        success: true,
        blocked: true,
        blockedUntil
      };
    }

    this.updateUserState(userId, {
      ...state,
      canceledOrders: newCancelCount
    });

    return {
      success: true,
      blocked: false
    };
  }

  resetPenalties(userId: string): void {
    this.updateUserState(userId, { canceledOrders: 0 });
  }

  getPenaltyState(userId: string): PenaltyState {
    return this.getUserState(userId);
  }
}