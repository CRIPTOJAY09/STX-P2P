import React from 'react';
import { Filter } from 'lucide-react';
import type { OrderFilters as FilterType, OrderStatus, OrderType } from '../../types/order';

interface OrderFiltersProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
}

export default function OrderFilters({ filters, onChange }: OrderFiltersProps) {
  const handleStatusChange = (status: OrderStatus | '') => {
    onChange({
      ...filters,
      status: status || undefined
    });
  };

  const handleTypeChange = (type: OrderType | '') => {
    onChange({
      ...filters,
      type: type || undefined
    });
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <div className="relative">
        <select
          value={filters.status || ''}
          onChange={(e) => handleStatusChange(e.target.value as OrderStatus | '')}
          className="appearance-none bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 
                   text-white focus:ring-2 focus:ring-[#05fabd]"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="disputed">Disputed</option>
        </select>
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      <div className="relative">
        <select
          value={filters.type || ''}
          onChange={(e) => handleTypeChange(e.target.value as OrderType | '')}
          className="appearance-none bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 
                   text-white focus:ring-2 focus:ring-[#05fabd]"
        >
          <option value="">All Types</option>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
    </div>
  );
}