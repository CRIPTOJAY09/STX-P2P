import React, { useState } from 'react';
import { ThumbsUp, Minus, ThumbsDown, X } from 'lucide-react';
import type { RatingValue } from '../../types/rating';

interface RatingModalProps {
  tradeId: string;
  onSubmit: (rating: RatingValue, comment?: string) => void;
  onClose: () => void;
}

export default function RatingModal({ tradeId, onSubmit, onClose }: RatingModalProps) {
  const [rating, setRating] = useState<RatingValue | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    onSubmit(rating, comment || undefined);
  };

  const RatingButton = ({ value, icon, label }: {
    value: RatingValue;
    icon: React.ReactNode;
    label: string;
  }) => (
    <button
      type="button"
      onClick={() => setRating(value)}
      className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors
                ${rating === value ? 'bg-[#05fabd] text-gray-900' : 'bg-gray-700 hover:bg-gray-600'}`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-medium">Rate Your Experience</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <RatingButton
              value="good"
              icon={<ThumbsUp className="w-6 h-6" />}
              label="👍 Good"
            />
            <RatingButton
              value="neutral"
              icon={<Minus className="w-6 h-6" />}
              label="😐 Regular"
            />
            <RatingButton
              value="bad"
              icon={<ThumbsDown className="w-6 h-6" />}
              label="👎 Bad"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Additional Comments (Optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 
                       text-white resize-none h-24"
              placeholder="Share your experience..."
            />
          </div>

          <button
            type="submit"
            disabled={!rating}
            className="w-full bg-[#05fabd] text-gray-900 py-3 rounded-lg font-medium 
                     hover:bg-opacity-90 transition-opacity disabled:opacity-50 
                     disabled:cursor-not-allowed"
          >
            Submit Rating
          </button>
        </form>
      </div>
    </div>
  );
}