import React from 'react';
import type { OrderStatus } from '../../types/order';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500';
      case 'cancelled':
        return 'bg-gray-500/10 text-gray-500';
      case 'disputed':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyles()}`}>
      {status}
    </span>
  );
}