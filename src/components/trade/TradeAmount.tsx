import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/trade';

interface TradeAmountProps {
  amount: number;
  minAmount: number;
  maxAmount: number;
  onAmountChange: (amount: number) => void;
  error?: string;
}

export default function TradeAmount({
  amount,
  minAmount,
  maxAmount,
  onAmountChange,
  error,
}: TradeAmountProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-400">
        {t('trade.amount')}
      </label>
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(Number(e.target.value))}
        min={minAmount}
        max={maxAmount}
        step="0.01"
        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
      />
      <div className="flex justify-between text-sm text-gray-400">
        <span>{t('trade.min')}: {formatCurrency(minAmount)}</span>
        <span>{t('trade.max')}: {formatCurrency(maxAmount)}</span>
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}