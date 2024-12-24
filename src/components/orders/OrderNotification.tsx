import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

type NotificationType = 'success' | 'warning' | 'error';

interface OrderNotificationProps {
  type: NotificationType;
  message: string;
  onClose: () => void;
}

export default function OrderNotification({
  type,
  message,
  onClose,
}: OrderNotificationProps) {
  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success': return 'bg-green-500/10 border-green-500/20 text-green-500';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500';
      case 'error': return 'bg-red-500/10 border-red-500/20 text-red-500';
    }
  };

  return (
    <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 max-w-sm w-[95%] 
                    p-4 rounded-xl border ${getStyles()} animate-slide-up`}>
      <div className="flex items-center gap-3">
        {getIcon()}
        <p className="flex-1">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}