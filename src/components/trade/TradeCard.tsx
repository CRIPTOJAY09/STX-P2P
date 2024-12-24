import React from 'react';
import { Star } from 'lucide-react';
import type { TradeOffer } from '../../types';

interface TradeCardProps {
  offer: TradeOffer;
  onSelect: (offerId: string) => void;
}

export default function TradeCard({ offer, onSelect }: TradeCardProps) {
  return (
    <div 
      className="bg-gray-800 rounded-[25px] p-6 mb-4 border border-gray-700 
                hover:border-[#05fabd] transition-colors"
      onClick={() => onSelect(offer.id)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{offer.cryptocurrency}/{offer.fiatCurrency}</h3>
          <p className="text-sm text-gray-400">Payment Method: STX PAY</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium">${offer.pricePerUnit.toFixed(2)}</p>
          <p className="text-sm text-[#05fabd]">
            {new Date(offer.expiresAt).toLocaleTimeString()}
          </p>
        </div>
      </div>
      
      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>Min: ${offer.minAmount}</span>
        <span>Max: ${offer.maxAmount}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span>{offer.sellerNickname}</span>
            <span className="text-sm text-gray-400">User: {offer.sellerId}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>98%</span>
            </div>
            <div className={`px-2 py-0.5 rounded text-xs ${
              offer.sellerStatus === 'Online' 
                ? 'bg-green-500/20 text-green-500' 
                : 'bg-red-500/20 text-red-500'
            }`}>
              {offer.sellerStatus === 'Online' ? 'ON' : 'OFF'}
            </div>
          </div>
        </div>
        <button 
          className="px-4 py-2 bg-[#05fabd] text-gray-900 rounded-full font-medium 
                   hover:bg-opacity-90 transition-opacity"
        >
          Trade
        </button>
      </div>
    </div>
  );
}