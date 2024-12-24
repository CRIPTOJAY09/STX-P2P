import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateTotal, validateTradeAmount } from '../../utils/trade';
import type { TradeOrder, PaymentMethod } from '../../types/trade';
import SellerInfo from './SellerInfo';
import TradeAmount from './TradeAmount';
import TradeSummary from './TradeSummary';
import PaymentMethodSelect from './PaymentMethodSelect';

interface TradeOrderCardProps {
  order: TradeOrder;
  onTrade: (orderId: string, amount: number, paymentMethod: PaymentMethod) => void;
}

export default function TradeOrderCard({ order, onTrade }: TradeOrderCardProps) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(order.minAmount);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
    setAmountError(validateTradeAmount(newAmount, order.minAmount, order.maxAmount));
  };

  const handleTrade = () => {
    if (!selectedPaymentMethod) {
      setPaymentError(t('trade.errors.selectPayment'));
      return;
    }
    if (amountError) return;
    
    setPaymentError(null);
    onTrade(order.id, amount, selectedPaymentMethod);
  };

  const totalPrice = calculateTotal(amount, order.pricePerUnit);

  return (
    <div className="bg-gray-800 rounded-[25px] p-6 border border-gray-700 hover:border-[#05fabd] transition-colors">
      <SellerInfo seller={order.seller} />
      
      <div className="my-6 space-y-6">
        <TradeAmount
          amount={amount}
          minAmount={order.minAmount}
          maxAmount={order.maxAmount}
          onAmountChange={handleAmountChange}
          error={amountError || undefined}
        />

        <TradeSummary
          amount={amount}
          pricePerUnit={order.pricePerUnit}
          totalPrice={totalPrice}
        />

        <PaymentMethodSelect
          availableMethods={order.paymentMethods}
          selectedMethod={selectedPaymentMethod}
          onSelect={setSelectedPaymentMethod}
          error={paymentError || undefined}
        />
      </div>

      <button
        onClick={handleTrade}
        disabled={!!amountError || !selectedPaymentMethod}
        className="w-full bg-[#05fabd] text-gray-900 py-3 rounded-full font-medium 
                 hover:bg-opacity-90 transition-opacity disabled:opacity-50 
                 disabled:cursor-not-allowed"
      >
        {t('trade.confirmButton', {
          action: 'Buy',
          to: 'USDT',
          from: selectedPaymentMethod || 'USD',
        })}
      </button>
    </div>
  );
}