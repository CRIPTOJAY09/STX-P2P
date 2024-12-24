import React from 'react';
import type { Currency, FiatCurrency } from '../types';

interface CurrencyFilterProps {
  haveCurrency: Currency | FiatCurrency;
  wantCurrency: Currency | FiatCurrency;
  onHaveChange: (currency: Currency | FiatCurrency) => void;
  onWantChange: (currency: Currency | FiatCurrency) => void;
}

export default function CurrencyFilter({
  haveCurrency,
  wantCurrency,
  onHaveChange,
  onWantChange,
}: CurrencyFilterProps) {
  const currencies: (Currency | FiatCurrency)[] = ['USDT', 'STX', 'USD', 'EUR'];

  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1">
        <label className="block text-sm text-gray-400 mb-2">I Have</label>
        <select
          value={haveCurrency}
          onChange={(e) => onHaveChange(e.target.value as Currency | FiatCurrency)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex-1">
        <label className="block text-sm text-gray-400 mb-2">I Want</label>
        <select
          value={wantCurrency}
          onChange={(e) => onWantChange(e.target.value as Currency | FiatCurrency)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}