import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslations } from '../../hooks/useTranslations';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { theme: themeText } = useTranslations();
  
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 bg-gray-700 rounded-lg p-2 hover:bg-gray-600 
                transition-colors"
    >
      {theme === 'dark' ? (
        <Moon className="w-5 h-5 text-[#05fabd]" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
      <span>{theme === 'dark' ? themeText.dark : themeText.light}</span>
    </button>
  );
}