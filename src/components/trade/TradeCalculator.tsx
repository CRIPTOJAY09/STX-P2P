import React from 'react';
import { useTranslation } from 'react-i18next';

interface TradeCalculatorProps {
  pricePerUnit: number;
  minAmount: number;
  maxAmount: number;
  amount: number;
  onAmountChange: (amount: number) => void;
}

export default function TradeCalculator({
  pricePerUnit,
  minAmount,
  maxAmount,
  amount,
  onAmountChange,
}: TradeCalculatorProps) {
  const { t } = useTranslation();
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) return;
    onAmountChange(Math.min(Math.max(value, minAmount), maxAmount));
  };

  const totalPrice = amount * pricePerUnit;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-400 mb-1">
          {t('trade.amount')}
        </label>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          min={minAmount}
          max={maxAmount}
          step="0.01"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
        />
        <div className="flex justify-between text-sm text-gray-400 mt-1">
          <span>{t('trade.min')}: {minAmount} USDT</span>
          <span>{t('trade.max')}: {maxAmount} USDT</span>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">{t('trade.price')}:</span>
          <span>${pricePerUnit.toFixed(2)}/USDT</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>{t('trade.total')}:</span>
          <span className="text-[#05fabd]">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}