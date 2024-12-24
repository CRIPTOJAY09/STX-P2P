import React from 'react';
import { Clock, Star, CheckCircle2 } from 'lucide-react';
import type { SellerProfile } from '../../types/trade';

interface SellerInfoProps {
  seller: SellerProfile;
}

export default function SellerInfo({ seller }: SellerInfoProps) {
  const statusColor = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-yellow-500',
  }[seller.status];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${statusColor}`} />
        <span className="font-medium">{seller.nickname}</span>
      </div>
      
      <div className="flex gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          <span>{seller.rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>~{seller.responseTimeMinutes}m</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" />
          <span>{seller.completedTrades} trades</span>
        </div>
      </div>
    </div>
  );
}