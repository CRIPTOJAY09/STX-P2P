import React, { useState } from 'react';
import { calculateFee, calculateTotal } from '../../utils/trade';
import OrderCalculation from './OrderCalculation';

interface CreateOrderFormProps {
  onSubmit: (orderData: OrderData) => void;
}

export interface OrderData {
  type: 'buy' | 'sell';
  amount: number;
  price: number;
}

export default function CreateOrderForm({ onSubmit }: CreateOrderFormProps) {
  const [orderData, setOrderData] = useState<OrderData>({
    type: 'buy',
    amount: 0,
    price: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(orderData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: name === 'type' ? value : parseFloat(value) || 0
    }));
  };

  const total = calculateTotal(orderData.amount, orderData.price);
  const fee = calculateFee(total);
  const totalAfterFee = total - fee;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Order Type
          </label>
          <select
            name="type"
            value={orderData.type}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Amount (USDT)
          </label>
          <input
            type="number"
            name="amount"
            value={orderData.amount || ''}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Price per USDT
          </label>
          <input
            type="number"
            name="price"
            value={orderData.price || ''}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
            placeholder="0.00"
          />
        </div>
      </div>

      <OrderCalculation
        total={total}
        fee={fee}
        totalAfterFee={totalAfterFee}
      />

      <button
        type="submit"
        className="w-full bg-[#05fabd] text-gray-900 py-3 rounded-xl font-medium 
                 hover:bg-opacity-90 transition-opacity"
      >
        Place Order
      </button>
    </form>
  );
}