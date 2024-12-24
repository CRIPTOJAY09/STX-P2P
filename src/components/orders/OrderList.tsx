import React from 'react';
import { Eye, XCircle, AlertTriangle } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import { formatCurrency } from '../../utils/trade';
import type { Order } from '../../types/order';

interface OrderListProps {
  orders: Order[];
  onViewDetails: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
  onResolveDispute?: (orderId: string) => void;
}

export default function OrderList({
  orders,
  onViewDetails,
  onCancelOrder,
  onResolveDispute
}: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No orders found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Type</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Amount</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Price</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-800/50">
              <td className="px-4 py-3">
                <span className="capitalize">{order.type}</span>
              </td>
              <td className="px-4 py-3">
                {order.amount} {order.cryptocurrency}
              </td>
              <td className="px-4 py-3">
                {formatCurrency(order.price)}
              </td>
              <td className="px-4 py-3">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onViewDetails(order.id)}
                    className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  {order.status === 'active' && (
                    <button
                      onClick={() => onCancelOrder(order.id)}
                      className="p-1 hover:bg-gray-700 rounded-lg transition-colors text-red-500"
                      title="Cancel Order"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                  
                  {order.status === 'disputed' && onResolveDispute && (
                    <button
                      onClick={() => onResolveDispute(order.id)}
                      className="p-1 hover:bg-gray-700 rounded-lg transition-colors text-yellow-500"
                      title="Resolve Dispute"
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}