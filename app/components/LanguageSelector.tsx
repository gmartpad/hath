import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as Flags from 'country-flag-icons/react/3x2'
import { SupportedLanguage } from '@/utils/languageUtils';

const languages = [
  { code: 'en-GB', name: 'English (UK)', flag: Flags.GB },
  { code: 'en-US', name: 'English (US)', flag: Flags.US },
  { code: 'zh', name: '中文', flag: Flags.CN },
  { code: 'hi', name: 'हिन्दी', flag: Flags.IN },
  { code: 'es', name: 'Español', flag: Flags.ES },
  { code: 'ar', name: 'العربية', flag: Flags.SA },
  { code: 'fr', name: 'Français', flag: Flags.FR },
  { code: 'bn', name: 'বাংলা', flag: Flags.BD },
  { code: 'ru', name: 'Русский', flag: Flags.RU },
  { code: 'pt', name: 'Português (PT)', flag: Flags.PT },
  { code: 'pt-BR', name: 'Português (BR)', flag: Flags.BR },
  { code: 'id', name: 'Bahasa Indonesia', flag: Flags.ID },
];

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <Select value={currentLanguage} onValueChange={(value: SupportedLanguage) => onLanguageChange(value as SupportedLanguage)}>
      <SelectTrigger className="w-[80px] sm:w-[100px]">
        <SelectValue>
          {React.createElement(languages.find(lang => lang.code === currentLanguage)?.flag || Flags.US, { className:"w-6 h-4 object-contain" })}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center">
              {React.createElement(lang.flag, { className: "w-6 h-4 object-contain mr-2" })}
              <span className="flex-grow text-sm sm:text-base">{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;

