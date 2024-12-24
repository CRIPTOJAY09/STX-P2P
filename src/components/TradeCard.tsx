import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow } from 'date-fns';
import type { TradeOffer } from '../types';

interface TradeCardProps {
  offer: TradeOffer;
  onSelect: (offerId: string) => void;
}

export default function TradeCard({ offer, onSelect }: TradeCardProps) {
  const { t } = useTranslation();
  const timeLeft = formatDistanceToNow(offer.expiresAt, { addSuffix: true });

  return (
    <div 
      className="bg-gray-800 rounded-[25px] p-6 mb-4 border border-gray-700 hover:border-[#05fabd] transition-colors"
      onClick={() => onSelect(offer.id)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{offer.cryptocurrency}/{offer.fiatCurrency}</h3>
          <p className="text-sm text-gray-400">{t('trade.via')} {offer.paymentMethod}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium">${offer.pricePerUnit.toFixed(2)}</p>
          <p className="text-sm text-[#05fabd]">{timeLeft}</p>
        </div>
      </div>
      
      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>{t('trade.min')}: ${offer.minAmount}</span>
        <span>{t('trade.max')}: ${offer.maxAmount}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm">{offer.sellerNickname}</span>
        </div>
        <button 
          className="px-4 py-2 bg-[#05fabd] text-gray-900 rounded-full font-medium hover:bg-opacity-90 transition-opacity"
        >
          {t('trade.trade')}
        </button>
      </div>
    </div>
  );
}