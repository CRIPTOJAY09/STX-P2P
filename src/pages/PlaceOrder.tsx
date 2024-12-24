import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { OrderData } from '../components/trade/CreateOrderForm';

export default function PlaceOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as OrderData;

  if (!order) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No order data found</p>
        <button
          onClick={() => navigate('/trade')}
          className="mt-4 px-4 py-2 bg-[#05fabd] text-gray-900 rounded-lg"
        >
          Return to Trade
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/trade')}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-[#05fabd]">Order Summary</h1>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Type</span>
          <span className="font-medium capitalize">{order.type}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Amount</span>
          <span className="font-medium">{order.amount} USDT</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Price per Unit</span>
          <span className="font-medium">${order.price}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total</span>
          <span className="font-medium text-[#05fabd]">
            ${(order.amount * order.price).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}