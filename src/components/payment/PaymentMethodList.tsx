import React from 'react';
import { Clock } from 'lucide-react';
import type { PaymentMethod } from '../../types/payment';

interface PaymentMethodListProps {
  methods: PaymentMethod[];
  onSelect: (methodId: string) => void;
  selectedId?: string;
}

export default function PaymentMethodList({
  methods,
  onSelect,
  selectedId
}: PaymentMethodListProps) {
  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <button
          key={method.id}
          onClick={() => method.status === 'active' && onSelect(method.id)}
          disabled={method.status !== 'active'}
          className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-colors
                    ${selectedId === method.id
                      ? 'border-[#05fabd] bg-[#05fabd]/10'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    } ${method.status !== 'active' && 'opacity-50 cursor-not-allowed'}`}
        >
          <img
            src={method.icon}
            alt={method.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2">
              <span className="font-medium">{method.name}</span>
              {method.status === 'coming_soon' && (
                <span className="px-2 py-0.5 text-xs bg-blue-500/10 text-blue-500 rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400">{method.description}</p>
          </div>

          <div className="text-right text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{method.processingTime}</span>
            </div>
            <div>Fee: {method.fee}%</div>
          </div>
        </button>
      ))}
    </div>
  );
}