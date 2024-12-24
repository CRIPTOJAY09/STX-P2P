import React from 'react';
import { DollarSign } from 'lucide-react';

interface Balance {
  currency: string;
  amount: string;
  symbol?: string;
  flag?: string;
}

interface WalletBalanceProps {
  balances: Balance[];
}

export default function WalletBalance({ balances }: WalletBalanceProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-medium mb-4">Wallet Balance</h2>
      
      <div className="space-y-4">
        {balances.map(({ currency, amount, symbol, flag }) => (
          <div
            key={currency}
            className="flex items-center justify-between p-3 rounded-lg 
                     bg-gray-700/50 hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              {flag ? (
                <img
                  src={flag}
                  alt={`${currency} flag`}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#05fabd] flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-gray-900" />
                </div>
              )}
              <div>
                <p className="font-medium">{currency}</p>
                <p className="text-sm text-gray-400">Available</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{amount}</p>
              {symbol && (
                <p className="text-sm text-gray-400">{symbol}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}