import React from 'react';
import { ExternalLink } from 'lucide-react';

interface PlatformSwitchProps {
  platform: 'stx-p2p' | 'stx-pay';
  onSwitch: () => void;
}

export default function PlatformSwitch({ platform, onSwitch }: PlatformSwitchProps) {
  const buttonText = platform === 'stx-p2p' ? 'Go to STX PAY' : 'Back to STX P2P';
  const description = platform === 'stx-p2p'
    ? 'Complete your payment securely with STX PAY'
    : 'Return to STX P2P to complete your transaction';

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 max-w-sm w-[95%] 
                  bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium">{buttonText}</p>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <button
          onClick={onSwitch}
          className="flex items-center gap-2 px-4 py-2 bg-[#05fabd] text-gray-900 
                   rounded-lg font-medium hover:bg-opacity-90 transition-opacity"
        >
          <span>Switch</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}