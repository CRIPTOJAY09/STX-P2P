import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import QRCode from '../ui/QRCode';

interface DepositAddressProps {
  address: string;
  onClose: () => void;
}

export default function DepositAddress({ address, onClose }: DepositAddressProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-medium mb-4">Deposit USDT</h2>
      
      <div className="flex flex-col items-center mb-6">
        <QRCode value={address} size={200} />
        <p className="text-sm text-gray-400 mt-4">
          Scan QR code or copy address below
        </p>
      </div>

      <div className="bg-gray-700 rounded-lg p-3 mb-6">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-mono break-all">{address}</p>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-sm text-yellow-500">
            Only send USDT (BEP20) to this address. Other tokens may be lost.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl border border-gray-600 font-medium 
                   hover:bg-gray-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}