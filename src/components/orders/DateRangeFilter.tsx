import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateRangeFilterProps {
  dateRange: DateRange;
  onChange: (range: DateRange) => void;
}

export default function DateRangeFilter({ dateRange, onChange }: DateRangeFilterProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4 text-gray-400" />
      <input
        type="date"
        value={formatDate(dateRange.startDate)}
        onChange={(e) => onChange({
          ...dateRange,
          startDate: e.target.value ? new Date(e.target.value) : null
        })}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 
                 text-white focus:ring-2 focus:ring-[#05fabd]"
      />
      <span className="text-gray-400">to</span>
      <input
        type="date"
        value={formatDate(dateRange.endDate)}
        onChange={(e) => onChange({
          ...dateRange,
          endDate: e.target.value ? new Date(e.target.value) : null
        })}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 
                 text-white focus:ring-2 focus:ring-[#05fabd]"
      />
    </div>
  );
}