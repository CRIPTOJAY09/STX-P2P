import React from 'react';
import { useBalanceConversion } from '../../hooks/useBalanceConversion';
import { CURRENCY_SYMBOLS } from '../../lib/config/constants';
import { Loader } from 'lucide-react';

interface BalanceDisplayProps {
  usdtBalance: number;
}

export default function BalanceDisplay({ usdtBalance }: BalanceDisplayProps) {
  const { usd, eur, isLoading, error } = useBalanceConversion(usdtBalance);

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">Available Balance</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50">
          <div className="flex items-center gap-3">
            <img
              src="https://flagcdn.com/w80/us.png"
              alt="USD flag"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">USD</p>
              <p className="text-sm text-gray-400">US Dollar</p>
            </div>
          </div>
          <div className="text-right">
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : error ? (
              <span className="text-red-500">Error loading rate</span>
            ) : (
              <p className="font-bold text-lg">{CURRENCY_SYMBOLS.USD}{usd}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50">
          <div className="flex items-center gap-3">
            <img
              src="https://flagcdn.com/w80/eu.png"
              alt="EUR flag"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">EUR</p>
              <p className="text-sm text-gray-400">Euro</p>
            </div>
          </div>
          <div className="text-right">
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : error ? (
              <span className="text-red-500">Error loading rate</span>
            ) : (
              <p className="font-bold text-lg">{CURRENCY_SYMBOLS.EUR}{eur}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#05fabd] flex items-center justify-center">
              <span className="font-bold text-gray-900">T</span>
            </div>
            <div>
              <p className="font-medium">USDT</p>
              <p className="text-sm text-gray-400">Tether</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">{usdtBalance.toFixed(2)} {CURRENCY_SYMBOLS.USDT}</p>
          </div>
        </div>
      </div>
    </div>
  );
}