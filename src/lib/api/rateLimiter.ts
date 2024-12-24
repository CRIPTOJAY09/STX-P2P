export class RateLimiter {
  private timestamps: number[] = [];
  private readonly limit: number;
  private readonly interval: number;

  constructor(limit: number, intervalMs: number) {
    this.limit = limit;
    this.interval = intervalMs;
  }

  async acquire(): Promise<void> {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < this.interval);

    if (this.timestamps.length >= this.limit) {
      const oldestTimestamp = this.timestamps[0];
      const waitTime = this.interval - (now - oldestTimestamp);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    this.timestamps.push(now);
  }
}