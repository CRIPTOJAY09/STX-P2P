export type KYCStatus = 'pending' | 'verified' | 'rejected';
export type KYCLevel = 'basic' | 'intermediate' | 'advanced';

export interface KYCData {
  status: KYCStatus;
  level: KYCLevel;
  submittedAt?: Date;
  verifiedAt?: Date;
  rejectionReason?: string;
  documents: {
    idCard?: string;
    proofOfAddress?: string;
    selfie?: string;
  };
}

export interface AuthUser {
  id: string;
  email: string;
  kycStatus: KYCStatus;
  kycLevel: KYCLevel;
  isEmailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
}