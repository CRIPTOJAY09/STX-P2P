import React, { useState } from 'react';
import { Copy, Check, X } from 'lucide-react';
import QRCode from 'qrcode.react';

interface DepositModalProps {
  address: string;
  onClose: () => void;
}

export default function DepositModal({ address, onClose }: DepositModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-medium">Deposit USDT</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-white p-4 rounded-lg">
              <QRCode value={address} size={200} />
            </div>
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

          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
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
    </div>
  );
}