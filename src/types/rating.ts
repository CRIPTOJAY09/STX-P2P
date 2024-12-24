export type RatingValue = 'good' | 'neutral' | 'bad';

export interface Rating {
  id: string;
  tradeId: string;
  fromAddress: string;
  toAddress: string;
  value: RatingValue;
  comment?: string;
  createdAt: Date;
}

export interface UserRating {
  totalRatings: number;
  goodRatings: number;
  neutralRatings: number;
  badRatings: number;
  reputationScore: number;
}