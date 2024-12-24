import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import type { EscrowData } from '../../lib/escrow/types';

interface EscrowStatusProps {
  escrow: EscrowData;
  onRelease?: () => void;
  onRefund?: () => void;
}

export default function EscrowStatus({ escrow, onRelease, onRefund }: EscrowStatusProps) {
  const { t } = useTranslation();

  const statusIcon = {
    locked: <Clock className="w-5 h-5 text-yellow-500" />,
    released: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    refunded: <XCircle className="w-5 h-5 text-red-500" />,
    expired: <XCircle className="w-5 h-5 text-gray-500" />,
  }[escrow.status];

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        {statusIcon}
        <span className="font-medium capitalize">{escrow.status}</span>
      </div>

      <div className="space-y-2 text-sm text-gray-400">
        <div className="flex justify-between">
          <span>{t('escrow.amount')}:</span>
          <span>{escrow.amount} USDT</span>
        </div>
        <div className="flex justify-between">
          <span>{t('escrow.expires')}:</span>
          <span>{new Date(escrow.expiresAt).toLocaleString()}</span>
        </div>
      </div>

      {escrow.status === 'locked' && (
        <div className="flex gap-2 mt-4">
          {onRelease && (
            <button
              onClick={onRelease}
              className="flex-1 bg-green-500 text-white py-2 rounded-lg 
                       hover:bg-opacity-90 transition-opacity"
            >
              {t('escrow.release')}
            </button>
          )}
          {onRefund && (
            <button
              onClick={onRefund}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg 
                       hover:bg-opacity-90 transition-opacity"
            >
              {t('escrow.refund')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}