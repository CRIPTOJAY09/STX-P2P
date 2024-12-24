import React from 'react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface WalletActionsProps {
  onDeposit: () => void;
  onWithdraw: () => void;
  disabled?: boolean;
}

export default function WalletActions({ onDeposit, onWithdraw, disabled }: WalletActionsProps) {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={onDeposit}
        disabled={disabled}
        className="flex-1 flex items-center justify-center gap-2 bg-[#05fabd] text-gray-900 
                 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-opacity
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowDownCircle className="w-5 h-5" />
        Deposit
      </button>
      <button
        onClick={onWithdraw}
        disabled={disabled}
        className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white 
                 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowUpCircle className="w-5 h-5" />
        Withdraw
      </button>
    </div>
  );
}