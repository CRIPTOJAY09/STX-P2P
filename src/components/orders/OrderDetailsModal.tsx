import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import type { Order } from '../../types/order';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-medium">Order Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Order ID</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Status</p>
              <p className="font-medium capitalize">{order.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Type</p>
              <p className="font-medium capitalize">{order.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Trading Pair</p>
              <p className="font-medium">{order.cryptocurrency}/{order.fiatCurrency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Amount</p>
              <p className="font-medium">{order.amount} {order.cryptocurrency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Price</p>
              <p className="font-medium">${order.price}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Total</p>
              <p className="font-medium">${order.total}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Payment Method</p>
              <p className="font-medium">{order.paymentMethod}</p>
            </div>
          </div>

          {order.txHash && (
            <div className="pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-1">Transaction Hash</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm truncate">{order.txHash}</p>
                <a
                  href={`https://bscscan.com/tx/${order.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 
                     transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}