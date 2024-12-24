import React from 'react';
import { useTranslation } from 'react-i18next';
import type { PaymentMethod } from '../../types/trade';

interface PaymentMethodSelectProps {
  availableMethods: PaymentMethod[];
  selectedMethod: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  error?: string;
}

export default function PaymentMethodSelect({
  availableMethods,
  selectedMethod,
  onSelect,
  error,
}: PaymentMethodSelectProps) {
  const { t } = useTranslation();

  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">
        {t('trade.paymentMethod')}
      </label>
      <select
        value={selectedMethod || ''}
        onChange={(e) => onSelect(e.target.value as PaymentMethod)}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
      >
        <option value="">{t('trade.selectPayment')}</option>
        {availableMethods.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}