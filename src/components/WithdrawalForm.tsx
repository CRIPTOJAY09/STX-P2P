import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWithdrawal } from '../hooks/useWithdrawal';
import { ethers } from 'ethers';

interface WithdrawalFormProps {
  wallet: {
    address: string;
    encryptedPrivateKey: string;
  };
  balance: string;
}

export default function WithdrawalForm({ wallet, balance }: WithdrawalFormProps) {
  const { t } = useTranslation();
  const { withdraw, calculateFee, isLoading, error, txHash } = useWithdrawal();
  const [amount, setAmount] = useState('');
  const [toAddress, setToAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ethers.isAddress(toAddress)) {
      return; // Add validation error handling
    }
    await withdraw(wallet, toAddress, amount);
  };

  const fee = amount ? calculateFee(amount) : '0';
  const total = amount ? 
    (Number(amount) + Number(fee)).toFixed(6) : 
    '0';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-400 mb-1">
          {t('withdrawal.amount')}
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.000001"
          min="0"
          max={balance}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          {t('withdrawal.toAddress')}
        </label>
        <input
          type="text"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
          required
        />
      </div>

      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">{t('withdrawal.fee')} (0.02%):</span>
          <span>{fee} USDT</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>{t('withdrawal.total')}:</span>
          <span className="text-[#05fabd]">{total} USDT</span>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {txHash && (
        <div className="text-green-500 text-sm">
          {t('withdrawal.success')} (TX: {txHash.slice(0, 10)}...)
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !amount || !toAddress}
        className="w-full bg-[#05fabd] text-gray-900 py-3 rounded-full font-medium 
                 hover:bg-opacity-90 transition-opacity disabled:opacity-50 
                 disabled:cursor-not-allowed"
      >
        {isLoading ? t('withdrawal.processing') : t('withdrawal.submit')}
      </button>
    </form>
  );
}