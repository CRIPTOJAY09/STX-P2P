import { useState, useCallback } from 'react';
import { PenaltyManager } from '../lib/penalty/penaltyManager';
import type { PenaltyState, PenaltyResult } from '../lib/penalty/types';

const penaltyManager = new PenaltyManager();

interface PenaltyHookState {
  isLoading: boolean;
  error: string | null;
  penaltyState: PenaltyState | null;
}

export function usePenalty(userId: string) {
  const [state, setState] = useState<PenaltyHookState>({
    isLoading: false,
    error: null,
    penaltyState: null,
  });

  const checkPenalties = useCallback(() => {
    const penaltyState = penaltyManager.getPenaltyState(userId);
    setState(prev => ({ ...prev, penaltyState }));
    return penaltyState;
  }, [userId]);

  const handleCancellation = useCallback(async (): Promise<PenaltyResult> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = penaltyManager.recordCancellation(userId);
      setState(prev => ({
        isLoading: false,
        error: null,
        penaltyState: penaltyManager.getPenaltyState(userId),
      }));
      return result;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to process cancellation';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error,
      }));
      return { success: false, blocked: false, error };
    }
  }, [userId]);

  const resetPenalties = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      penaltyManager.resetPenalties(userId);
      setState({
        isLoading: false,
        error: null,
        penaltyState: penaltyManager.getPenaltyState(userId),
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to reset penalties',
      }));
    }
  }, [userId]);

  return {
    handleCancellation,
    resetPenalties,
    checkPenalties,
    isBlocked: penaltyManager.isBlocked(userId),
    ...state,
  };
}