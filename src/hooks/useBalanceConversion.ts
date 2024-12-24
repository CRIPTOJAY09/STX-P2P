import { useState, useEffect } from 'react';
import { fetchUSDTPrice } from '../lib/api/binance';

interface ConvertedBalances {
  usd: string;
  eur: string;
  isLoading: boolean;
  error: string | null;
}

export function useBalanceConversion(usdtBalance: number): ConvertedBalances {
  const [convertedBalances, setConvertedBalances] = useState<ConvertedBalances>({
    usd: '0.00',
    eur: '0.00',
    isLoading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    async function updateBalances() {
      try {
        const prices = await fetchUSDTPrice();
        
        if (!mounted) return;

        setConvertedBalances({
          usd: (usdtBalance * prices.usd).toFixed(2),
          eur: (usdtBalance * prices.eur).toFixed(2),
          isLoading: false,
          error: null
        });
      } catch (error) {
        if (!mounted) return;
        
        setConvertedBalances(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to fetch current rates'
        }));
      }
    }

    updateBalances();
    const interval = setInterval(updateBalances, 60000); // Update every minute

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [usdtBalance]);

  return convertedBalances;
}