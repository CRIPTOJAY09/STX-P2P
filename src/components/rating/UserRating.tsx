import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import type { UserRating } from '../../types/rating';

interface UserRatingProps {
  rating: UserRating;
}

export default function UserRating({ rating }: UserRatingProps) {
  const percentage = Math.round((rating.goodRatings / rating.totalRatings) * 100);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-4 h-4 text-[#05fabd]" />
        <span className="text-sm">{percentage}%</span>
      </div>
      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#05fabd] transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-sm text-gray-400">
        {rating.totalRatings} ratings
      </div>
    </div>
  );
}