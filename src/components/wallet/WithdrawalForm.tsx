import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { walletService } from '../../services/wallet';

interface WithdrawalFormProps {
  maxAmount: string;
  onClose: () => void;
  onWithdraw: (amount: string, address: string) => Promise<void>;
}

export default function WithdrawalForm({ maxAmount, onClose, onWithdraw }: WithdrawalFormProps) {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!amount || !address) {
      setError('Please fill in all fields');
      return;
    }

    if (!walletService.validateAddress(address)) {
      setError('Invalid wallet address');
      return;
    }

    if (parseFloat(amount) > parseFloat(maxAmount)) {
      setError('Insufficient balance');
      return;
    }

    setIsSubmitting(true);
    try {
      await onWithdraw(amount, address);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Withdrawal failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-medium mb-4">Withdraw USDT</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Amount (USDT)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0"
            max={maxAmount}
            step="0.01"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 
                     text-white placeholder-gray-400"
            disabled={isSubmitting}
          />
          <p className="text-sm text-gray-400 mt-1">
            Available: {maxAmount} USDT
          </p>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Recipient Address (BEP20)
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 
                     text-white placeholder-gray-400"
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-600 font-medium 
                     hover:bg-gray-700 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#05fabd] text-gray-900 py-3 rounded-xl font-medium 
                     hover:bg-opacity-90 transition-opacity disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Withdraw'}
          </button>
        </div>
      </form>
    </div>
  );
}