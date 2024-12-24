import React, { useEffect, useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useDepositMonitor } from '../hooks/useDepositMonitor';

interface WalletBalanceProps {
  address: string;
}

export default function WalletBalance({ address }: WalletBalanceProps) {
  const { getUSDTBalance, isLoading, error } = useWallet();
  const [balance, setBalance] = useState<string>('0');

  useDepositMonitor(
    address,
    async (from, amount) => {
      console.log(`Received ${amount} USDT from ${from}`);
      // Refresh balance after deposit
      const newBalance = await getUSDTBalance(address);
      setBalance(newBalance);
    },
    (error) => {
      console.error('Deposit monitoring error:', error);
    }
  );

  useEffect(() => {
    const fetchBalance = async () => {
      const usdtBalance = await getUSDTBalance(address);
      setBalance(usdtBalance);
    };

    fetchBalance();
  }, [address, getUSDTBalance]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-medium mb-2">USDT Balance</h3>
      <div className="text-2xl font-bold text-[#05fabd]">
        {isLoading ? 'Loading...' : `${balance} USDT`}
      </div>
      <div className="text-sm text-gray-400 mt-1">
        {address.slice(0, 6)}...{address.slice(-4)}
      </div>
    </div>
  );
}