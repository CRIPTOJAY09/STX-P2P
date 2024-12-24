import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { PenaltyState } from '../../lib/penalty/types';

interface PenaltyBannerProps {
  penaltyState: PenaltyState;
}

export default function PenaltyBanner({ penaltyState }: PenaltyBannerProps) {
  const { t } = useTranslation();
  
  if (!penaltyState.blockedUntil) return null;
  
  const isBlocked = penaltyState.blockedUntil > new Date();
  if (!isBlocked) return null;

  const timeLeft = formatDistanceToNow(penaltyState.blockedUntil, { addSuffix: true });

  return (
    <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 text-red-500">
        <AlertTriangle className="w-5 h-5" />
        <span className="font-medium">
          {t('penalty.blocked', { timeLeft })}
        </span>
      </div>
      <p className="text-sm text-red-400 mt-1">
        {t('penalty.explanation')}
      </p>
    </div>
  );
}