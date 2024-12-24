import React, { useState } from 'react';
import { KeyRound, Fingerprint } from 'lucide-react';

export default function SecuritySettings() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password changed');
    setShowPasswordForm(false);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-medium mb-6">Security Settings</h2>

      <div className="space-y-6">
        <div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="flex items-center gap-2 w-full bg-gray-700 text-white py-3 px-4 
                     rounded-lg hover:bg-gray-600 transition-colors"
          >
            <KeyRound className="w-5 h-5" />
            Change Password
          </button>

          {showPasswordForm && (
            <form onSubmit={handlePasswordChange} className="mt-4 space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
              />
              <button
                type="submit"
                className="w-full bg-[#05fabd] text-gray-900 py-2 rounded-lg font-medium 
                         hover:bg-opacity-90"
              >
                Update Password
              </button>
            </form>
          )}
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5" />
            <span>Biometric Authentication</span>
          </div>
          <button
            onClick={() => setBiometricEnabled(!biometricEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative
                      ${biometricEnabled ? 'bg-[#05fabd]' : 'bg-gray-600'}`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full transition-transform
                         bg-white ${biometricEnabled ? 'right-1' : 'left-1'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}