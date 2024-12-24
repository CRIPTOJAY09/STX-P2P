import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface NotificationSetting {
  id: string;
  label: string;
  enabled: boolean;
}

export default function NotificationSettings() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<NotificationSetting[]>([
    { id: 'orders', label: t('notifications.orders'), enabled: true },
    { id: 'trades', label: t('notifications.trades'), enabled: true },
    { id: 'deposits', label: t('notifications.deposits'), enabled: true },
    { id: 'withdrawals', label: t('notifications.withdrawals'), enabled: true },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  return (
    <div className="space-y-4">
      {settings.map(setting => (
        <div key={setting.id} className="flex items-center justify-between">
          <span>{setting.label}</span>
          <button
            onClick={() => toggleSetting(setting.id)}
            className={`w-12 h-6 rounded-full transition-colors relative
                      ${setting.enabled ? 'bg-[#05fabd]' : 'bg-gray-600'}`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full transition-transform
                         bg-white ${setting.enabled ? 'right-1' : 'left-1'}`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}