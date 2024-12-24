import React from 'react';
import { useBalanceConversion } from '../../hooks/useBalanceConversion';
import { CURRENCY_SYMBOLS } from '../../lib/config/constants';

interface WalletHeaderProps {
  usdtBalance: string;
}

export default function WalletHeader({ usdtBalance }: WalletHeaderProps) {
  const { usd, eur } = useBalanceConversion(parseFloat(usdtBalance));

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">Wallet Balance</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">USDT</p>
          <p className="text-xl font-bold">{parseFloat(usdtBalance).toFixed(2)}</p>
        </div>
        
        <div className="p-4 bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">USD</p>
          <p className="text-xl font-bold">{CURRENCY_SYMBOLS.USD}{usd}</p>
        </div>
        
        <div className="p-4 bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">EUR</p>
          <p className="text-xl font-bold">{CURRENCY_SYMBOLS.EUR}{eur}</p>
        </div>
      </div>
    </div>
  );
}