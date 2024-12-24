import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { walletManager } from '../lib/wallet/walletManager';
import type { WalletData, EncryptedWallet } from '../lib/wallet/types';

export function useWalletManager() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateWallet = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const wallet = await walletManager.createWallet();
      const encrypted = walletManager.encryptWallet(wallet);
      return encrypted;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create wallet');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getBalance = useCallback(async (address: string) => {
    setIsLoading(true);
    setError(null);
    try {
      return await walletManager.getWalletBalance(address);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get balance');
      return '0';
    } finally {
      setIsLoading(false);
    }
  }, []);

  const validateAddress = useCallback((address: string) => {
    return ethers.isAddress(address);
  }, []);

  return {
    generateWallet,
    getBalance,
    validateAddress,
    isLoading,
    error,
  };
}