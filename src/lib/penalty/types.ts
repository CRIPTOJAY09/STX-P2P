export interface PenaltyState {
  canceledOrders: number;
  blockedUntil?: Date;
}

export interface PenaltyConfig {
  maxCancellations: number;
  blockDurationHours: number;
}

export interface PenaltyResult {
  success: boolean;
  blocked: boolean;
  blockedUntil?: Date;
  error?: string;
}