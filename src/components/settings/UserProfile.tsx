import React from 'react';
import { User, Pencil } from 'lucide-react';

interface UserProfileProps {
  username: string;
  userId: string;
  email: string;
  onEdit: () => void;
}

export default function UserProfile({
  username,
  userId,
  email,
  onEdit,
}: UserProfileProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Profile Information</h2>
        <button
          onClick={onEdit}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 
                   transition-colors text-[#05fabd]"
        >
          <Pencil className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-gray-400" />
          <div>
            <p className="font-medium">{username}</p>
            <p className="text-sm text-gray-400">User ID: {userId}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-700">
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <p className="font-medium">{email}</p>
        </div>
      </div>
    </div>
  );
}