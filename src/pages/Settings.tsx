import React from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../components/common/Banner';
import LanguageSelector from '../components/LanguageSelector';
import NotificationSettings from '../components/settings/NotificationSettings';
import ThemeToggle from '../components/settings/ThemeToggle';
import UserProfile from '../components/settings/UserProfile';

export default function Settings() {
  const { t } = useTranslation();

  return (
    <div className="pb-20">
      <h1 className="text-2xl font-bold mb-6 text-[#05fabd] text-center">
        {t('settings.title')}
      </h1>

      <Banner />

      <div className="space-y-6">
        <UserProfile
          username="CryptoTrader"
          userId="STX000001"
          email="trader@example.com"
          onEdit={() => {}}
        />

        <div className="bg-gray-800 dark:bg-gray-800/50 rounded-xl p-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">{t('settings.appearance')}</h2>
            <ThemeToggle />
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4">{t('settings.language')}</h2>
            <LanguageSelector />
          </div>
        </div>

        <div className="bg-gray-800 dark:bg-gray-800/50 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">{t('settings.notifications')}</h2>
          <NotificationSettings />
        </div>
      </div>
    </div>
  );
}