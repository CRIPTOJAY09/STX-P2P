import React from 'react';
import TradeOfferCard from './TradeOfferCard';
import type { TradeOffer } from '../../types';

interface TradeOfferListProps {
  offers: TradeOffer[];
  onSelect: (offerId: string) => void;
}

export default function TradeOfferList({ offers, onSelect }: TradeOfferListProps) {
  if (offers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No trade offers available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {offers.map((offer) => (
        <TradeOfferCard
          key={offer.id}
          offer={offer}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}