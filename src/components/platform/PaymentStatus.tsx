import React from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

interface PaymentStatusProps {
  status: 'pending' | 'completed' | 'failed';
  onRetry?: () => void;
  onReturn: () => void;
}

export default function PaymentStatus({
  status,
  onRetry,
  onReturn
}: PaymentStatusProps) {
  const getStatusContent = () => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircle className="w-12 h-12 text-green-500" />,
          title: 'Payment Completed',
          description: 'Your payment has been processed successfully'
        };
      case 'failed':
        return {
          icon: <XCircle className="w-12 h-12 text-red-500" />,
          title: 'Payment Failed',
          description: 'There was an error processing your payment'
        };
      default:
        return {
          icon: <Loader className="w-12 h-12 text-[#05fabd] animate-spin" />,
          title: 'Processing Payment',
          description: 'Please wait while we process your payment'
        };
    }
  };

  const content = getStatusContent();

  return (
    <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-md p-6 text-center">
        <div className="flex justify-center mb-4">
          {content.icon}
        </div>
        <h2 className="text-xl font-medium mb-2">{content.title}</h2>
        <p className="text-gray-400 mb-6">{content.description}</p>

        <div className="space-y-3">
          {status === 'failed' && onRetry && (
            <button
              onClick={onRetry}
              className="w-full bg-[#05fabd] text-gray-900 py-3 rounded-lg font-medium 
                       hover:bg-opacity-90 transition-opacity"
            >
              Retry Payment
            </button>
          )}

          {status !== 'pending' && (
            <button
              onClick={onReturn}
              className="w-full bg-gray-700 text-white py-3 rounded-lg font-medium 
                       hover:bg-gray-600 transition-colors"
            >
              {status === 'completed' ? 'Return to STX P2P' : 'Cancel Payment'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}