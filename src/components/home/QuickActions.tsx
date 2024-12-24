import React from 'react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface QuickActionsProps {
  onDeposit: () => void;
  onWithdraw: () => void;
}

export default function QuickActions({ onDeposit, onWithdraw }: QuickActionsProps) {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={onDeposit}
        className="flex-1 flex items-center justify-center gap-2 bg-[#05fabd] text-gray-900 
                 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-opacity"
      >
        <ArrowDownCircle className="w-5 h-5" />
        Deposit
      </button>
      <button
        onClick={onWithdraw}
        className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white 
                 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
      >
        <ArrowUpCircle className="w-5 h-5" />
        Withdraw
      </button>
    </div>
  );
}