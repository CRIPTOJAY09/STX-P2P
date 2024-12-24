import { useState, useEffect, useCallback } from 'react';
import { binanceClient } from '../lib/api/binanceClient';
import type { ExchangeRates } from '../lib/api/types';

export function useExchangeRates(refreshInterval = 60000) {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    try {
      const newRates = await binanceClient.getRates();
      setRates(newRates);
      setError(null);
    } catch (err) {
      setError('Unable to update exchange rates');
      console.error('Exchange rate update failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    let intervalId: number;

    async function initializeRates() {
      if (!mounted) return;
      await fetchRates();
      
      if (mounted) {
        intervalId = window.setInterval(fetchRates, refreshInterval);
      }
    }

    initializeRates();

    return () => {
      mounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [fetchRates, refreshInterval]);

  return { rates, isLoading, error };
}