import { useEffect, useCallback } from 'react';
import { DepositMonitor } from '../lib/deposit/monitor';

const depositMonitor = new DepositMonitor();

export function useDepositMonitor(
  address: string | undefined,
  onDeposit: (from: string, amount: string) => void,
  onError: (error: Error) => void
) {
  useEffect(() => {
    if (!address) return;

    depositMonitor.monitorAddress(address, onDeposit, onError);

    return () => {
      depositMonitor.stopMonitoring(address);
    };
  }, [address, onDeposit, onError]);

  const stopMonitoring = useCallback(() => {
    if (address) {
      depositMonitor.stopMonitoring(address);
    }
  }, [address]);

  return { stopMonitoring };
}