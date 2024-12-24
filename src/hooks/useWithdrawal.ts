import { useState } from 'react';
import { ethers } from 'ethers';
import { WithdrawalManager } from '../lib/contracts/withdrawalManager';
import { walletManager } from '../lib/wallet';

const withdrawalManager = new WithdrawalManager();

interface WithdrawalState {
  isLoading: boolean;
  error: string | null;
  txHash: string | null;
}

export function useWithdrawal() {
  const [state, setState] = useState<WithdrawalState>({
    isLoading: false,
    error: null,
    txHash: null,
  });

  const withdraw = async (
    encryptedWallet: { address: string; encryptedPrivateKey: string },
    toAddress: string,
    amount: string
  ) => {
    setState({ isLoading: true, error: null, txHash: null });

    try {
      // Validate the withdrawal first
      const validation = await withdrawalManager.validateWithdrawal(
        encryptedWallet.address,
        amount
      );

      if (!validation.isValid) {
        setState({
          isLoading: false,
          error: validation.error || 'Invalid withdrawal',
          txHash: null,
        });
        return;
      }

      // Decrypt wallet and create signer
      const wallet = walletManager.decryptWallet(encryptedWallet);
      const signer = new ethers.Wallet(wallet.privateKey);

      // Process the withdrawal
      const result = await withdrawalManager.processWithdrawal(
        signer,
        toAddress,
        amount
      );

      if (!result.success) {
        setState({
          isLoading: false,
          error: result.error || 'Withdrawal failed',
          txHash: null,
        });
        return;
      }

      setState({
        isLoading: false,
        error: null,
        txHash: result.txHash || null,
      });
    } catch (err) {
      setState({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Unknown error',
        txHash: null,
      });
    }
  };

  const calculateFee = (amount: string): string => {
    return withdrawalManager.calculateFee(amount);
  };

  return {
    withdraw,
    calculateFee,
    ...state,
  };
}