import { API_CONFIG, FALLBACK_RATES } from './config';
import { Cache } from './cache';
import { RateLimiter } from './rateLimiter';
import type { ExchangeRates } from './types';

class BinanceClient {
  private cache: Cache<ExchangeRates>;
  private rateLimiter: RateLimiter;
  private lastSuccessfulRates: ExchangeRates | null = null;

  constructor() {
    this.cache = new Cache<ExchangeRates>(30); // 30 seconds TTL
    this.rateLimiter = new RateLimiter(10, 60000); // 10 requests per minute
  }

  private async fetchWithRetry(url: string): Promise<Response> {
    await this.rateLimiter.acquire();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async getRates(): Promise<ExchangeRates> {
    const cachedRates = this.cache.get('rates');
    if (cachedRates) return cachedRates;

    let attempts = 0;
    const maxAttempts = API_CONFIG.retryAttempts;

    while (attempts < maxAttempts) {
      try {
        const [usdResponse, eurResponse] = await Promise.all([
          this.fetchWithRetry(`${API_CONFIG.baseURL}/ticker/price?symbol=USDTUSDT`),
          this.fetchWithRetry(`${API_CONFIG.baseURL}/ticker/price?symbol=USDTEUR`)
        ]);

        const [usdData, eurData] = await Promise.all([
          usdResponse.json(),
          eurResponse.json()
        ]);

        const rates: ExchangeRates = {
          usd: parseFloat(usdData.price),
          eur: parseFloat(eurData.price)
        };

        // Validate rates
        if (isNaN(rates.usd) || isNaN(rates.eur)) {
          throw new Error('Invalid rate values received');
        }

        this.cache.set('rates', rates);
        this.lastSuccessfulRates = rates;
        return rates;

      } catch (error) {
        attempts++;
        console.warn(`Attempt ${attempts}/${maxAttempts} failed:`, error);
        
        if (attempts === maxAttempts) {
          console.error('All retry attempts failed');
          // Return last successful rates if available, otherwise fallback
          return this.lastSuccessfulRates || FALLBACK_RATES;
        }

        // Exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, Math.min(1000 * Math.pow(2, attempts), 10000))
        );
      }
    }

    return FALLBACK_RATES;
  }
}

export const binanceClient = new BinanceClient();