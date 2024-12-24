import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/trade';

interface TradeSummaryProps {
  amount: number;
  pricePerUnit: number;
  totalPrice: number;
}

export default function TradeSummary({
  amount,
  pricePerUnit,
  totalPrice,
}: TradeSummaryProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">{t('trade.price')}:</span>
        <span>{formatCurrency(pricePerUnit)}/USDT</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400">{t('trade.receiving')}:</span>
        <span>{amount.toFixed(2)} USDT</span>
      </div>
      <div className="flex justify-between items-center font-medium">
        <span>{t('trade.total')}:</span>
        <span className="text-[#05fabd]">{formatCurrency(totalPrice)}</span>
      </div>
    </div>
  );
}