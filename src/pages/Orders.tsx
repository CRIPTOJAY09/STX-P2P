import React, { useState } from 'react';
import Banner from '../components/common/Banner';
import OrderList from '../components/orders/OrderList';
import OrderFilters from '../components/orders/OrderFilters';
import type { Order, OrderFilters as FilterType } from '../types/order';

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: '1',
    type: 'buy',
    cryptocurrency: 'USDT',
    fiatCurrency: 'USD',
    amount: 100,
    price: 1.05,
    total: 105,
    paymentMethod: 'STX PAY',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    type: 'sell',
    cryptocurrency: 'USDT',
    fiatCurrency: 'USD',
    amount: 50,
    price: 1.00,
    total: 50,
    paymentMethod: 'STX PAY',
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000)
  },
  {
    id: '3',
    type: 'buy',
    cryptocurrency: 'USDT',
    fiatCurrency: 'USD',
    amount: 20,
    price: 1.10,
    total: 22,
    paymentMethod: 'STX PAY',
    status: 'cancelled',
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000)
  },
  {
    id: '4',
    type: 'sell',
    cryptocurrency: 'USDT',
    fiatCurrency: 'USD',
    amount: 150,
    price: 0.95,
    total: 142.50,
    paymentMethod: 'STX PAY',
    status: 'disputed',
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 259200000)
  }
];

export default function Orders() {
  const [filters, setFilters] = useState<FilterType>({});

  const filteredOrders = mockOrders.filter(order => {
    if (filters.status && order.status !== filters.status) return false;
    if (filters.type && order.type !== filters.type) return false;
    return true;
  });

  const handleViewDetails = (orderId: string) => {
    console.log('View details:', orderId);
  };

  const handleCancelOrder = (orderId: string) => {
    console.log('Cancel order:', orderId);
  };

  const handleResolveDispute = (orderId: string) => {
    console.log('Resolve dispute:', orderId);
  };

  return (
    <div className="pb-20">
      <h1 className="text-2xl font-bold mb-6 text-[#05fabd] text-center">
        My Orders
      </h1>

      <Banner />

      <div className="space-y-6">
        <OrderFilters
          filters={filters}
          onChange={setFilters}
        />

        <div className="bg-gray-800/50 rounded-xl overflow-hidden">
          <OrderList
            orders={filteredOrders}
            onViewDetails={handleViewDetails}
            onCancelOrder={handleCancelOrder}
            onResolveDispute={handleResolveDispute}
          />
        </div>
      </div>
    </div>
  );
}