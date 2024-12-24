import React from 'react';
import { Plus, X } from 'lucide-react';

interface CreateOrderButtonProps {
  isFormVisible: boolean;
  onClick: () => void;
}

export default function CreateOrderButton({ isFormVisible, onClick }: CreateOrderButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 bg-[#05fabd] text-gray-900 
                 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-opacity mb-6"
    >
      {isFormVisible ? (
        <>
          <X className="w-5 h-5" />
          Cancel Order
        </>
      ) : (
        <>
          <Plus className="w-5 h-5" />
          Create Order
        </>
      )}
    </button>
  );
}