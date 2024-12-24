import { useState, useCallback } from 'react';
import { FeeManager } from '../lib/fees/feeManager';
import type { FeeCalculation } from '../lib/fees/types';

const feeManager = new FeeManager();

interface FeeState {
  isLoading: boolean;
  error: string | null;
  calculation: FeeCalculation | null;
}

export function useFees() {
  const [state, setState] = useState<FeeState>({
    isLoading: false,
    error: null,
    calculation: null,
  });

  const calculateTradeFee = useCallback((amount: string) => {
    try {
      const calculation = feeManager.calculateTradeFee(amount);
      setState(prev => ({ ...prev, calculation, error: null }));
      return calculation;
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to calculate fee',
        calculation: null,
      }));
      return null;
    }
  }, []);

  const calculateWithdrawalFee = useCallback((amount: string) => {
    try {
      const calculation = feeManager.calculateWithdrawalFee(amount);
      setState(prev => ({ ...prev, calculation, error: null }));
      return calculation;
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to calculate fee',
        calculation: null,
      }));
      return null;
    }
  }, []);

  const validateAndTransferFee = useCallback(async (
    fromWallet: { address: string; privateKey: string },
    amount: string
  ) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const validation = await feeManager.validateFeePayment(
        fromWallet.address,
        amount
      );

      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      const result = await feeManager.transferFee(fromWallet, amount);
      if (!result.success) {
        throw new Error(result.error);
      }

      setState(prev => ({ ...prev, isLoading: false }));
      return result;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Fee transfer failed';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error,
      }));
      throw err;
    }
  }, []);

  return {
    calculateTradeFee,
    calculateWithdrawalFee,
    validateAndTransferFee,
    ...state,
  };
}