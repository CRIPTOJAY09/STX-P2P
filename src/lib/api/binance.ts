import { API_CONFIG, FALLBACK_RATES } from './config';
import type { BinancePrice, ExchangeRates } from './types';

async function fetchWithTimeout(url: string, timeout: number): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function fetchPrice(symbol: string): Promise<number> {
  const url = `${API_CONFIG.baseURL}/ticker/price?symbol=${symbol}`;
  
  try {
    const response = await fetchWithTimeout(url, API_CONFIG.timeout);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: BinancePrice = await response.json();
    return parseFloat(data.price);
  } catch (error) {
    console.warn(`Failed to fetch ${symbol} price:`, error);
    throw error;
  }
}

export async function fetchUSDTPrice(): Promise<ExchangeRates> {
  let attempts = 0;
  
  while (attempts < API_CONFIG.retryAttempts) {
    try {
      const [usdPrice, eurPrice] = await Promise.all([
        fetchPrice('USDTUSDT'),
        fetchPrice('USDTEUR')
      ]);

      return {
        usd: usdPrice,
        eur: eurPrice
      };
    } catch (error) {
      attempts++;
      if (attempts === API_CONFIG.retryAttempts) {
        console.error('Failed to fetch USDT prices after multiple attempts:', error);
        return FALLBACK_RATES;
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
    }
  }

  return FALLBACK_RATES;
}