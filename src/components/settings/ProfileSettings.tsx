import React, { useState } from 'react';
import { User, Mail, Save } from 'lucide-react';
import type { UserProfile } from '../../types/user';

interface ProfileSettingsProps {
  profile: UserProfile;
}

export default function ProfileSettings({ profile }: ProfileSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-medium mb-6">Profile Information</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-400" />
            {isEditing ? (
              <input
                type="text"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 w-full"
              />
            ) : (
              <span>{profile.username}</span>
            )}
          </div>
          <p className="text-sm text-gray-400 ml-7">User ID: {profile.userId}</p>
        </div>

        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-gray-400" />
          {isEditing ? (
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 w-full"
            />
          ) : (
            <span>{profile.email}</span>
          )}
        </div>

        <div className="pt-4">
          {isEditing ? (
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full bg-[#05fabd] 
                       text-gray-900 py-2 rounded-lg font-medium hover:bg-opacity-90"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full bg-gray-700 text-white py-2 rounded-lg font-medium 
                       hover:bg-gray-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}