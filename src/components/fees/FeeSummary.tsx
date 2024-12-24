import React from 'react';
import { useTranslation } from 'react-i18next';
import type { FeeCalculation } from '../../lib/fees/types';

interface FeeSummaryProps {
  calculation: FeeCalculation;
  type: 'trade' | 'withdrawal';
}

export default function FeeSummary({ calculation, type }: FeeSummaryProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{t('fees.amount')}:</span>
        <span>{calculation.amount} USDT</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{t('fees.fee')} (0.02%):</span>
        <span>{calculation.fee} USDT</span>
      </div>
      <div className="flex justify-between font-medium">
        <span>{type === 'withdrawal' ? t('fees.receiving') : t('fees.total')}:</span>
        <span className="text-[#05fabd]">{calculation.total} USDT</span>
      </div>
    </div>
  );
}