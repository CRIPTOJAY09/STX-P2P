import React from 'react';
import { Clock, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import type { Transaction } from '../../types/transaction';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'failed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowDownCircle className="w-5 h-5 text-green-500" />;
      case 'withdrawal': return <ArrowUpCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden">
      <h2 className="p-4 font-medium border-b border-gray-700">
        Transaction History
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Type</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Amount</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-700/50">
                <td className="px-4 py-3 text-sm">
                  {tx.createdAt.toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(tx.type)}
                    <span className="capitalize">{tx.type}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-medium">
                  {tx.amount} USDT
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`capitalize ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}