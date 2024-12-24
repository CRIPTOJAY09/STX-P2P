import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { NETWORK_CONFIG } from '../config/blockchain';
import { EscrowManager } from '../lib/escrow/escrowManager';
import { walletManager } from '../lib/wallet';
import type { EscrowData } from '../lib/escrow/types';

const provider = new ethers.JsonRpcProvider(NETWORK_CONFIG.rpcUrl);
const escrowManager = new EscrowManager(provider);

interface EscrowState {
  isLoading: boolean;
  error: string | null;
  escrow: EscrowData | null;
}

export function useEscrow() {
  const [state, setState] = useState<EscrowState>({
    isLoading: false,
    error: null,
    escrow: null,
  });

  const createEscrow = useCallback(async (
    tradeId: string,
    buyerWallet: { address: string; encryptedPrivateKey: string },
    sellerAddress: string,
    amount: string
  ) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const escrow = await escrowManager.createEscrow(
        tradeId,
        buyerWallet.address,
        sellerAddress,
        amount
      );

      if (!escrow) {
        setState({
          isLoading: false,
          error: 'Failed to create escrow',
          escrow: null,
        });
        return null;
      }

      setState({
        isLoading: false,
        error: null,
        escrow,
      });

      return escrow;
    } catch (err) {
      setState({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Unknown error',
        escrow: null,
      });
      return null;
    }
  }, []);

  const releaseEscrow = useCallback(async (
    escrowId: string,
    signerWallet: { address: string; encryptedPrivateKey: string }
  ) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const wallet = walletManager.decryptWallet(signerWallet);
      const signer = new ethers.Wallet(wallet.privateKey, provider);

      const result = await escrowManager.releaseEscrow(escrowId, signer);
      if (!result.success) {
        throw new Error(result.error);
      }

      const updatedEscrow = escrowManager.getEscrow(escrowId);
      setState({
        isLoading: false,
        error: null,
        escrow: updatedEscrow || null,
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to release escrow',
      }));
    }
  }, []);

  const refundEscrow = useCallback(async (
    escrowId: string,
    signerWallet: { address: string; encryptedPrivateKey: string }
  ) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const wallet = walletManager.decryptWallet(signerWallet);
      const signer = new ethers.Wallet(wallet.privateKey, provider);

      const result = await escrowManager.refundEscrow(escrowId, signer);
      if (!result.success) {
        throw new Error(result.error);
      }

      const updatedEscrow = escrowManager.getEscrow(escrowId);
      setState({
        isLoading: false,
        error: null,
        escrow: updatedEscrow || null,
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to refund escrow',
      }));
    }
  }, []);

  return {
    createEscrow,
    releaseEscrow,
    refundEscrow,
    ...state,
  };
}