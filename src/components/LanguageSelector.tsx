import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../i18n/config';
import { useLanguage } from '../hooks/useLanguage';
import type { Language } from '../i18n/types';

export default function LanguageSelector() {
  const { t } = useTranslation();
  const { currentLanguage, setLanguage } = useLanguage();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as Language);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5 text-gray-400" />
      <select
        value={currentLanguage}
        onChange={handleChange}
        className="bg-gray-800 border border-gray-700 rounded-lg py-1 px-2 text-sm 
                 text-white focus:outline-none focus:ring-2 focus:ring-[#05fabd]"
      >
        {SUPPORTED_LANGUAGES.map(({ code, name }) => (
          <option key={code} value={code}>
            {t(`languages.${code}`, name)}
          </option>
        ))}
      </select>
    </div>
  );
}