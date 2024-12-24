import React from 'react';
import { formatCurrency } from '../../utils/trade';

interface OrderCalculationProps {
  total: number;
  fee: number;
  totalAfterFee: number;
}

export default function OrderCalculation({
  total,
  fee,
  totalAfterFee
}: OrderCalculationProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Total Before Fee:</span>
        <span>{formatCurrency(total)}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Fee (0.02%):</span>
        <span>{formatCurrency(fee)}</span>
      </div>
      
      <div className="flex justify-between items-center font-medium">
        <span>Total After Fee:</span>
        <span className="text-[#05fabd]">{formatCurrency(totalAfterFee)}</span>
      </div>
    </div>
  );
}