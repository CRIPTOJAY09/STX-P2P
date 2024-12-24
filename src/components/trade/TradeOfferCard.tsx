import React from 'react';
import { Star } from 'lucide-react';
import type { TradeOffer } from '../../types';

interface TradeOfferCardProps {
  offer: TradeOffer;
  onSelect: (offerId: string) => void;
}

export default function TradeOfferCard({ offer, onSelect }: TradeOfferCardProps) {
  const isOnline = offer.sellerStatus === 'Online';
  
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#05fabd] 
                  transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">
            {offer.cryptocurrency}/{offer.fiatCurrency}
          </h3>
          <p className="text-sm text-gray-400">
            Payment Method: {offer.paymentMethod}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium">
            ${offer.pricePerUnit.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>Min: ${offer.minAmount}</span>
        <span>Max: ${offer.maxAmount}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">{offer.sellerNickname}</span>
            <span className="text-sm text-gray-400">
              (User: {offer.sellerId})
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">98% positive</span>
            </div>
            
            <div className={`px-2 py-0.5 rounded text-xs ${
              isOnline 
                ? 'bg-green-500/20 text-green-500' 
                : 'bg-red-500/20 text-red-500'
            }`}>
              {isOnline ? 'ON' : 'OFF'}
            </div>
          </div>
        </div>

        <button
          onClick={() => onSelect(offer.id)}
          className="px-6 py-2 bg-[#05fabd] text-gray-900 rounded-full font-medium 
                   hover:bg-opacity-90 transition-opacity"
        >
          Trade
        </button>
      </div>
    </div>
  );
}